import { IProject } from './../interfaces/project.interface';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  images: string[];
}
