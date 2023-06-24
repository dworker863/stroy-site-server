import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { IVideo } from './interfaces/video.interface';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  create(
    @UploadedFile() video: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
  ): Promise<IVideo> {
    console.log(createVideoDto);
    console.log(video);

    return this.videoService.create(createVideoDto, video);
  }

  @Get()
  findAll(): Promise<IVideo[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IVideo> {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  update(
    @Param('id') id: string,
    @UploadedFile() video: Express.Multer.File,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<any> {
    return this.videoService.update(+id, updateVideoDto, video);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<number> {
    return this.videoService.remove(+id);
  }
}
