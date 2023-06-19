import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Video } from './model/video.model';
import { FilesService } from 'src/files/files.service';
import { IVideo } from './interfaces/video.interface';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private videoModel: typeof Video,
    private fileService: FilesService,
  ) {}
  async create(
    createVideoDto: CreateVideoDto,
    video: Express.Multer.File,
  ): Promise<IVideo> {
    const checkVideo = await this.getVideoByName(createVideoDto.name);

    if (checkVideo) {
      throw new HttpException(
        'Видео с такими названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileName = await this.fileService.createFile(video);

    const videoENtity = await this.videoModel.create({
      ...createVideoDto,
      video: 'http://192.168.1.4:8000/' + fileName,
    });
    return videoENtity;
  }

  async findAll(): Promise<IVideo[]> {
    const videos = await this.videoModel.findAll();
    return videos;
  }

  async findOne(id: number): Promise<IVideo> {
    const video = await this.videoModel.findByPk(id);
    return video;
  }

  async update(
    id: number,
    updateVideoDto: UpdateVideoDto,
    video: Express.Multer.File,
  ): Promise<any> {
    const checkVideo = await this.getVideoByName(updateVideoDto.name);

    if (checkVideo && checkVideo.id !== id) {
      throw new HttpException(
        'Работа с такими названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileName = await this.fileService.createFile(video);
    const videoEntity = await this.videoModel.update(
      {
        ...updateVideoDto,
        video: 'http://192.168.1.4:8000/' + fileName,
      },
      {
        where: { id },
        returning: true,
      },
    );

    return videoEntity;
  }

  async remove(id: number): Promise<number> {
    const video = await this.videoModel.destroy({ where: { id } });
    return video;
  }

  async getVideoByName(name: string): Promise<IVideo> {
    const video = await this.videoModel.findOne({ where: { name } });
    return video;
  }
}
