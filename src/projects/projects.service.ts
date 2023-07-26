import { UpdateReviewDto } from './dto/update-review.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './interfaces/project.interface';
import { Project } from './models/projects.model';
import { Review } from './models/reviews.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { IReview } from './interfaces/review.interface';

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
        (fileName) => 'http://192.168.1.3:8000/' + fileName,
      ),
    });

    if (createProjectDto.review) {
      await this.createReview(
        project.id,
        JSON.parse(String(createProjectDto.review)),
      );
    }

    return project;
  }

  async findAll(): Promise<IProject[]> {
    const projects = await this.projectModel.findAll({
      include: [{ model: Review }],
    });
    return projects;
  }

  async findOne(id: number): Promise<IProject> {
    const project = await this.projectModel.findByPk(id, {
      include: [{ model: Review }],
    });
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
        'Работа с такими названием уже существует',
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
          (fileName) => 'http://192.168.1.3:8000/' + fileName,
        ),
      },
      {
        where: { id },
        returning: true,
      },
    );

    if (!checkProject.projectReview && updateProjectDto.review) {
      await this.createReview(id, JSON.parse(String(updateProjectDto.review)));
    } else if (checkProject.projectReview && updateProjectDto.review) {
      await this.updateReview(id, JSON.parse(String(updateProjectDto.review)));
    } else {
      await this.removeReview(id);
    }

    return project;
  }

  async remove(id: number): Promise<number> {
    const project = await this.projectModel.destroy({ where: { id } });
    return project;
  }

  async getProjectByName(name: string): Promise<IProject> {
    const project = await this.projectModel.findOne({
      where: { name },
      include: [{ model: Review }],
    });
    return project;
  }

  async createReview(
    projectId: number,
    createReviewDto: CreateReviewDto,
  ): Promise<IReview> {
    const review = await this.reviewModel.create({
      projectId,
      ...createReviewDto,
    });
    return review;
  }

  async removeReview(projectId: number): Promise<number> {
    const review = await this.reviewModel.destroy({ where: { projectId } });
    return review;
  }

  async updateReview(
    projectId: number,
    upadateReviewDto: UpdateReviewDto,
  ): Promise<any> {
    const review = await this.reviewModel.update(upadateReviewDto, {
      where: { projectId },
      returning: true,
    });

    return review;
  }
}
