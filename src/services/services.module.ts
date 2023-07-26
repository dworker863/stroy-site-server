import { AuthModule } from './../auth/auth.module';
import { Service } from './models/services.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Service]), AuthModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
