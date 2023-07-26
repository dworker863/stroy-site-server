import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from './model/video.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Video]), FilesModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
