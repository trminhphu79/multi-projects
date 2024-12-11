export class SendMessageDto {
  conversationId?: number;
  content: string;
  senderId: number;
  receiverId: number;
}

export class NewMessageDto {
  message: string;
  roomId: string;
  senderId: number;
  receiverIds: number[];
}
