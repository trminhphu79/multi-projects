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
