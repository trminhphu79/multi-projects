import {
    Column,
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    DataType,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'channel' })
  export class Channel extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;
  
    @Column({
      allowNull: false, // Use this instead of @NotNull
    })
    channelName: string;
  
    @Column({
      type: DataType.JSON,
      allowNull: true, // Optional, defaults to true if omitted
    })
    joinIds: number[];
  
    @Column({
      allowNull: false,
    })
    ownerId: number;
  
    @Column({
      type: DataType.JSON,
      allowNull: true,
    })
    messageIds: number[];
  
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