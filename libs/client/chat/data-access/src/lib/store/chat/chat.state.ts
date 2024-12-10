import { ChatState } from '../../model';
import { ChatMessageStatus } from '../../enum';

export const INITIAL_CHAT_STATE: ChatState = {
  messages: [],
  members: [],
  conversationId: null,
  status: ChatMessageStatus.Idle,
};
