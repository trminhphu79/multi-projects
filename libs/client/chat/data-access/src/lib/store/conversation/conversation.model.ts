import { ConversationStatus } from '@shared/enums';
import { Conversation } from '@shared/models/conversation';

export type ConversationState = {
  conversations: Conversation[];
  status: ConversationStatus;
};

export type MessageCategory = any;
