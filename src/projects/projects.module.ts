import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './models/projects.model';
import { FilesModule } from 'src/files/files.module';
import { Review } from './models/reviews.model';

@Module({
  imports: [SequelizeModule.forFeature([Project, Review]), FilesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
