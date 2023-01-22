import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IRreview } from '../interfaces/reviews.interface';

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, IRreview> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @Column({ type: DataType.STRING, allowNull: false })
  message: string;

  @Column({ type: DataType.STRING, allowNull: true })
  photo: string;

  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;
}
