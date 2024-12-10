import { ConversationStatus } from '../../enum';
import { ConversationState } from '../../model';

export const INITIAL_CONVERSATION_STATE: ConversationState = {
  conversations: [],
  status:ConversationStatus.Idle
};
