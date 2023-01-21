import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './interfaces/project.interface';
import { Project } from './models/projects.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}

  async create(createProjectDto: CreateProjectDto): Promise<IProject> {
    const project = await this.projectModel.create(createProjectDto);
    return project;
  }

  async findAll(): Promise<IProject[]> {
    const projects = await this.projectModel.findAll();
    return projects;
  }

  async findOne(id: number): Promise<IProject> {
    const project = await this.projectModel.findByPk(id);
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<any> {
    const project = await this.projectModel.update(updateProjectDto, {
      where: { id },
      returning: true,
    });

    return project;
  }

  async remove(id: number): Promise<number> {
    const project = await this.projectModel.destroy({ where: { id } });
    return project;
  }
}
