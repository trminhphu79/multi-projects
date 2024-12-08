// import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
// import { Conversation } from './conversation.entity';
// import { Profile } from './profile.entity';

// @Table({ tableName: 'user_conversation', timestamps: true })
// export class UserConversation extends Model {
//   @ForeignKey(() => Conversation)
//   @Column
//   conversationId: number;

//   @ForeignKey(() => Profile)
//   @Column
//   userId: number;
// }

import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Conversation } from './conversation.entity';
import { Profile } from './profile.entity';

@Table({ tableName: 'user_conversation', timestamps: true })
export class UserConversation extends Model {
  @ForeignKey(() => Conversation)
  @Column
  conversationId: number;

  @ForeignKey(() => Profile)
  @Column
  userId: number;
}