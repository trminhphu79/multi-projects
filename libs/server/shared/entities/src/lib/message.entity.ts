import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Profile } from './profile.entity';
import { Conversation } from './conversation.entity';

@Table({ tableName: 'message', timestamps: true })
export class Message extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  override id: number;

  @BelongsTo(() => Profile, 'senderId')
  sender: Profile;

  @BelongsTo(() => Profile, 'receiverId')
  receiver: Profile;

  @ForeignKey(() => Conversation)
  @Column
  conversationId: number;

  @BelongsTo(() => Conversation)
  conversation: Conversation;

  @Column({
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'PERSONAL',
  })
  message_type: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  override createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  override updatedAt: Date;
}
