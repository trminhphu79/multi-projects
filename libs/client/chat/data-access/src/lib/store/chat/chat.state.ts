import { Member } from './../../model/index';
import { ChatState } from '../../model';
import { ChatMessageStatus } from '../../enum';

export const INITIAL_CHAT_STATE: ChatState = {
  messages: [],
  members: [],
  conversationId: -1,
  conversation: {
    id: -1,
    receiver: null,
  },
  status: ChatMessageStatus.Idle,
};
