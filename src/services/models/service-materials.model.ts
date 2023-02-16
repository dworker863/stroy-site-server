import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Material } from 'src/materials/models/materials.model';
import { Service } from './services.model';

@Table({ tableName: 'service-materials', createdAt: false, updatedAt: false })
export class ServiceMaterials extends Model {
  @ForeignKey(() => Service)
  @AllowNull(true)
  @Column({ type: DataType.INTEGER, allowNull: true })
  serviceId: number;

  @ForeignKey(() => Material)
  @AllowNull(true)
  @Column({ type: DataType.INTEGER, allowNull: true })
  materialId: number;
}
