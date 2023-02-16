import { Service } from './../services/models/services.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { Material } from './models/materials.model';
import { ServiceMaterials } from 'src/services/models/service-materials.model';

@Module({
  imports: [SequelizeModule.forFeature([Material, ServiceMaterials, Service])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
