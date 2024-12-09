import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateConversationDto,
  PagingConversationDto,
} from '@server/shared/dtos/conversation';
import { Conversation } from '@server/shared/entity/conversation';
import { Profile } from '@server/shared/entity/profile';
import {
  Observable,
  throwError,
  from,
  switchMap,
  of,
  map,
  catchError,
  tap,
} from 'rxjs';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation)
    private conversationModel: typeof Conversation,
    @InjectModel(Profile)
    private profileModel: typeof Profile,
    private sequelize: Sequelize
  ) {}

  createConversation(payload: CreateConversationDto): Observable<any> {
    const { memberIds } = payload;

    if (memberIds.length !== 2) {
      return throwError(
        () =>
          new BadRequestException(
            'Conversations must be between exactly two members'
          )
      );
    }

    // Validate members
    return from(
      this.profileModel.findAll({
        where: { id: memberIds },
      })
    ).pipe(
      switchMap((members) => {
        if (members.length !== memberIds.length) {
          return throwError(
            () => new NotFoundException('One or more members not found')
          );
        }

        console.log('members: ', members);
        // Check if conversation exists
        return from(
          this.conversationModel.findAll({
            include: [
              {
                model: Profile,
                as: 'members',
                where: {
                  id: memberIds,
                },
                through: { attributes: [] }, // Exclude join table
              },
            ],
          })
        ).pipe(
          switchMap((existingConversation) => {
            console.log('Found existingConversation', existingConversation);
            if (existingConversation.length == 2) {
              return of({
                message: 'Conversation already exists',
                data: existingConversation,
              });
            }

            // If no conversation exists, create one
            return from(
              this.conversationModel.create({
                name: `Conversation between ${members
                  .map((m) => m.fullName)
                  .join(' and ')}`,
              })
            ).pipe(
              switchMap((newConversation) =>
                from(newConversation.$set('members', members)).pipe(
                  map(() => ({
                    message: 'Conversation created successfully',
                    data: newConversation,
                  }))
                )
              )
            );
          })
        );
      }),
      catchError((error) => throwError(() => error))
    );
  }

  paging(payload: PagingConversationDto): Observable<any> {
    const { offset, limit, keyword, profileId } = payload;

    const whereCondition = keyword
      ? { name: { [Op.iLike]: `%${keyword}%` } }
      : {};

    const includeCondition = {
      association: 'members',
      attributes: ['id', 'fullName', 'avatarUrl'],
      where: profileId
        ? {
            id: {
              [Op.in]: [profileId],
            },
          }
        : undefined,
      required: !!profileId,
    };

    return from(
      this.conversationModel.findAndCountAll({
        where: whereCondition,
        include: [includeCondition],
        offset,
        limit,
        order: [['updatedAt', 'DESC']],
      })
    ).pipe(
      tap((result) => {
        console.log('result.rows: ', result.rows);
      }),
      map((result) => ({
        data: result.rows.map((conversation) => ({
          id: conversation.id,
          name: conversation.name,
          isGroup: conversation.isGroup,
          members: conversation.members,
        })),
        total: result.count,
        message: 'Conversations retrieved successfully',
      }))
    );
  }

  findMembersOfConversations(payload: PagingConversationDto): Observable<any> {
    const { profileId } = payload;
    return from(
      this.conversationModel.findAll({
        include: [
          {
            model: Profile,
            as: 'members',
            attributes: ['id', 'fullName', 'avatarUrl'],
            where: { id: profileId }, // Tìm các conversation có profileId
            through: { attributes: [] },
            required: true,
          },
        ],
      })
    ).pipe(
      switchMap((conversations) => {
        if (!conversations.length) {
          return of([]); // Không có conversation nào
        }

        // Lấy danh sách conversationId
        const conversationIds = conversations.map((c) => c.id);

        // Tìm tất cả các member liên quan đến các conversationId
        return from(
          this.profileModel.findAll({
            include: [
              {
                model: Conversation,
                as: 'conversations',
                attributes: ['id', 'name'], // Chỉ cần id và name của conversation
                where: {
                  id: {
                    [Op.in]: conversationIds,
                  },
                },
                through: { attributes: [] },
                required: true,
              },
            ],
          })
        ).pipe(
          map((profiles) =>
            profiles
              .filter((profile) => profile.id !== profileId) // Loại bỏ profileId hiện tại
              .map((profile) => ({
                id: profile.id,
                fullName: profile.fullName,
                avatarUrl: profile.avatarUrl,
              }))
          ),
          map((response) => ({
            data: response,
            message: 'Paging successfully!',
          }))
        );
      })
    );
  }

  async delete(conversationId: number) {
    const conversation = await this.conversationModel.findByPk(conversationId);
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    await conversation.destroy();

    return {
      message: 'Conversation deleted successfully',
    };
  }
}