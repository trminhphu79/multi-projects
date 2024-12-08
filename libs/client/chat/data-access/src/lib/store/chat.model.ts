import { MessageEnum } from './chat.enum';

export type Conversation = {
  id: number;
  memberIds: number[];
  messages: Partial<Message>[];
};

export type Message = {
  message: string;
  senderId: number;
  receiverId: number;
  type?: MessageEnum;
};

export type ChatScreenState = {
  conversations: Conversation[];
  isLoading: boolean;
  messages: Partial<Message>[];
};
