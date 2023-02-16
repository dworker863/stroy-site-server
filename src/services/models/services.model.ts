import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { IMaterial } from 'src/materials/interfaces/material.interface';
import { Material } from 'src/materials/models/materials.model';
import { IService } from '../interfaces/service.interface';
import { ServiceMaterials } from './service-materials.model';

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

  @BelongsToMany(() => Material, () => ServiceMaterials)
  materials: any[];

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
}
