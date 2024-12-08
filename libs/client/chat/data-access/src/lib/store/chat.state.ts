import { Message } from 'primeng/api';
import { ChatScreenState } from './chat.model';

export const INITIAL_CHAT_STATE: ChatScreenState = {
  conversations: [],
  isLoading: false,
  messages: []
};
