import { ChatMessageStatus, ConversationStatus } from '../enum';

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

export type Message = {
  content: string;
  senderId: number;
  receiverId: number;
  type: string;
  conversationId: number;
  isSender?: boolean;
  timestamp: string;
  timeSend: string;
  isOld?: boolean;
};

export type ConversationState = {
  conversations: Conversation[];
  status: ConversationStatus;
};

export type ChatState = {
  messages: Message[];
  members: Array<Member>;
  conversationId: number;
  status: ChatMessageStatus;
  conversation: {
    id: number;
    receiver: Member | null;
  };
};

export type MessageCategory = any;
