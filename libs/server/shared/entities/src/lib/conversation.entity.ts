import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Message } from './message.entity';
import { Profile } from './profile.entity';
import { UserConversation } from './user-conversation.entity';

@Table({ tableName: 'conversation' })
export class Conversation extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  override id: number;

  @Column({
    allowNull: false, // Use this instead of @NotNull
  })
  name: string;

  @BelongsToMany(() => Profile, () => UserConversation)
  users: Profile[];

  @HasMany(() => Message)
  messsages: Message[];

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
