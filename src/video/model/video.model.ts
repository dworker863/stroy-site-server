import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IVideo } from '../interfaces/video.interface';

@Table({ tableName: 'video' })
export class Video extends Model<Video, IVideo> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  video: string;
}
