import { Message } from './message';

export type Member = {
  avatarUrl: string;
  id: number;
  bio: string;
  fullName: string;
  [key: string]: any;
};

export type Conversation = {
  id: number;
  messages: Message[];
  name: string;
  lastMessage: {
    id: number;
    content: string;
    timeSend: string;
    fullName: string;
    avatarUrl: string;
    isSender: boolean;
  };
  receiver: Member;
  members?: Member[];
};

export type MessageCategory = any;
