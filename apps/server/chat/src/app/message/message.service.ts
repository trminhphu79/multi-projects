import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SendMessageDto } from '@server/shared/dtos/message';
import { Message } from '@server/shared/entity/message';
import { Conversation } from '@server/shared/entity/conversation';
import { Profile } from '@server/shared/entity/profile';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Conversation)
    private conversationModel: typeof Conversation,
    @InjectModel(Message)
    private messageModel: typeof Message,
    @InjectModel(Profile)
    private profileModel: typeof Profile
  ) {}

  async send(payload: SendMessageDto) {
    const { senderId, receiverId, content } = payload;

    console.log('payload: ', payload);

    // Validate sender and receiver profiles
    const sender = await this.profileModel.findByPk(senderId);
    if (!sender) {
      throw new NotFoundException(
        `Sender profile with id ${senderId} not found`
      );
    }

    const receiver = await this.profileModel.findByPk(receiverId);
    if (!receiver) {
      throw new NotFoundException(
        `Receiver profile with id ${receiverId} not found`
      );
    }

    // Check if conversation already exists
    const conversation = await this.conversationModel.findOne({
      include: [
        {
          model: Profile,
          as: 'members',
          where: {
            id: [senderId, receiverId],
          },
          through: {
            attributes: [],
          },
          required: true,
        },
      ],
      group: ['Conversation.id'], // Grouping by conversation
    });

    let existingConversation = null;

    if (!conversation) {
      // Create a new conversation if none exists
      existingConversation = await this.conversationModel.create({
        name: `Conversation between ${senderId} and ${receiverId}`,
      });

      // Associate both members with the conversation
      await existingConversation.$set('members', [senderId, receiverId]);
    } else {
      existingConversation = conversation;
    }

    // Create the new message in the conversation
    const newMessage = await this.messageModel.create({
      senderId,
      receiverId,
      conversationId: existingConversation.id,
      content,
    });

    console.log('newMessage: ', newMessage);
    return newMessage;
  }

  async getConversationsByProfileId(
    profileId: number
  ): Promise<Conversation[]> {
    return await this.conversationModel.findAll({
      include: [
        {
          association: 'members', // Association defined in the Conversation model
          where: { id: profileId },
          through: { attributes: [] }, // Exclude join table attributes
        },
      ],
    });
  }
}
