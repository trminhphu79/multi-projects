import {
    Column,
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    DataType,
  } from 'sequelize-typescript';

@Table({ tableName: 'account' })
export class Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
