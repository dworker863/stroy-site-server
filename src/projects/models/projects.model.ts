import { IProject } from './../interfaces/project.interface';
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Review } from './reviews.model';

@Table({ tableName: 'projects' })
export class Project extends Model<Project, IProject> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(2048), allowNull: true })
  description: string;

  @HasOne(() => Review, { as: 'projectReview' })
  @Column({ type: DataType.STRING(4096), allowNull: true })
  review: Review;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  images: string[];

  @Column({ type: DataType.INTEGER, allowNull: true })
  price: number;
}
