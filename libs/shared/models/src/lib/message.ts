export type Message = {
  content: string;
  senderId: number;
  receiverId: number;
  type?: string;
  conversationId: number;
  isSender?: boolean;
  timeSend: string;
  isOld?: boolean;
};
