import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './interfaces/project.interface';
import { Project } from './models/projects.model';
import { Review } from './models/reviews.model';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectModel: typeof Project,
    @InjectModel(Review) private reviewModel: typeof Review,
    private fileService: FilesService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    images: Array<Express.Multer.File>,
  ): Promise<IProject> {
    const checkProject = await this.getProjectByName(createProjectDto.name);

    if (checkProject) {
      throw new HttpException(
        'Проект с такими названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileNames = await Promise.all(
      images.map(async (image) => {
        return await this.fileService.createFile(image);
      }),
    );

    const project = await this.projectModel.create({
      ...createProjectDto,
      images: fileNames.map(
        (fileName) => 'http://192.168.1.4:8000/' + fileName,
      ),
    });

    const review = await this.reviewModel.create({
      projectId: project.id,
      ...JSON.parse(String(createProjectDto.review)),
    });

    return project;
  }

  async findAll(): Promise<IProject[]> {
    const projects = await this.projectModel.findAll({
      include: [{ model: Review }],
    });
    return projects;
  }

  async findOne(id: number): Promise<IProject> {
    const project = await this.projectModel.findByPk(id);
    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    images: Array<Express.Multer.File>,
  ): Promise<any> {
    const checkProject = await this.getProjectByName(updateProjectDto.name);

    if (checkProject && checkProject.id !== id) {
      throw new HttpException(
        'Проект с такими названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileNames = await Promise.all(
      images.map(async (image) => {
        return await this.fileService.createFile(image);
      }),
    );

    const project = await this.projectModel.update(
      {
        ...updateProjectDto,
        images: fileNames.map(
          (fileName) => 'http://192.168.1.4:8000/' + fileName,
        ),
      },
      {
        where: { id },
        returning: true,
      },
    );

    return project;
  }

  async remove(id: number): Promise<number> {
    const project = await this.projectModel.destroy({ where: { id } });
    return project;
  }

  async getProjectByName(name: string): Promise<IProject> {
    const project = await this.projectModel.findOne({ where: { name } });
    return project;
  }

  async createReview(projectId: number, createReviewDto: CreateReviewDto) {
    const review = await this.reviewModel.create({
      projectId,
      ...createReviewDto,
    });
    return review;
  }
}
