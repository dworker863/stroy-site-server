import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IService } from '../interfaces/service.interface';

@Table({ tableName: 'services' })
export class Service extends Model<Service, IService> {
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
  measure: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
}
