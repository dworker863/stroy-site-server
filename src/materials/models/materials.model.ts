import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ServiceMaterials } from 'src/services/models/service-materials.model';
import { Service } from 'src/services/models/services.model';
import { IMaterial } from '../interfaces/material.interface';

@Table({ tableName: 'materials' })
export class Material extends Model<Material, IMaterial> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  consumption: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  package: number;

  @BelongsToMany(() => Service, () => ServiceMaterials)
  services: any[];

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
}
