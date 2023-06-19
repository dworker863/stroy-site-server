import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { IReview } from '../interfaces/review.interface';
import { Project } from './projects.model';

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, IReview> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Project)
  @Column
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  @Column({ type: DataType.STRING })
  author: string;

  @Column({ type: DataType.INTEGER })
  stars: number;

  @Column({ type: DataType.STRING })
  text: string;

  @Column({ type: DataType.STRING })
  date: string;
}
