import { ChatMessageStatus, ConversationStatus } from '../enum';

export type Member = {
  avatarUrl: string;
  id: number;
  [key: string]: any;
};

export type Conversation = {
  id: number;
  messages: Message[];
  lastMessage: {
    content: string;
    timeSend: string;
    senderName: string;
    senderAvatar: string;
  };
  members: Array<Member>;
  thumbnailUrl: string;
};

export type Message = {
  content: string;
  senderId: number;
  receiverId: number;
  type: string;
  conversationId: number;
  isSender?: boolean;
  timestamp: string;
};

export type ConversationState = {
  conversations: Conversation[];
  status: ConversationStatus;
};

export type ChatState = {
  messages: Message[];
  members: Array<Member>;
  conversationId: number | null;
  status: ChatMessageStatus;
};

export type MessageCategory = any;
