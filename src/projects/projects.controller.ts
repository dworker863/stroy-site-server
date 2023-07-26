import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { IProject } from './interfaces/project.interface';
import { IReview } from './interfaces/review.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<IProject> {
    console.log(images);

    return this.projectsService.create(createProjectDto, images);
  }

  @Get()
  findAll(): Promise<IProject[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  update(
    @Param('id') id: string,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<any> {
    return this.projectsService.update(+id, updateProjectDto, images);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<number> {
    return this.projectsService.remove(+id);
  }

  @Post(':id/review')
  @UseGuards(JwtAuthGuard)
  createReview(
    @Param('id') projectId: number,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<IReview> {
    return this.projectsService.createReview(projectId, createReviewDto);
  }
}
