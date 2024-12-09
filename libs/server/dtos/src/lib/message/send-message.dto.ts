export class SendMessageDto {
  conversationId?: number;
  message: string;
  senderId: number;
  receiverId: number;
}

export class NewMessageDto {
  message: string;
  roomId: string;
  senderId: number;
}
