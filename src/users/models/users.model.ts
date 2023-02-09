import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IUser } from '../interafaces/user.interface';

@Table({ tableName: 'user' })
export class User extends Model<User, IUser> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
