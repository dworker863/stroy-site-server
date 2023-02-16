import { AuthModule } from './../auth/auth.module';
import { Service } from './models/services.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { UsersModule } from 'src/users/users.module';
import { ServiceMaterials } from './models/service-materials.model';
import { Material } from 'src/materials/models/materials.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Service, ServiceMaterials, Material]),
    AuthModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
