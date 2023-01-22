import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IReview } from './interfaces/reviews.interface';
import { Review } from './models/reviews.model';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}
  async create(createReviewDto: CreateReviewDto): Promise<IReview> {
    const review = await this.reviewModel.create(createReviewDto);
    return review;
  }

  async findAll(): Promise<IReview[]> {
    const reviews = await this.reviewModel.findAll();
    return reviews;
  }

  async findOne(id: number): Promise<IReview> {
    const review = await this.reviewModel.findByPk(id);
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<any> {
    const review = await this.reviewModel.update(updateReviewDto, {
      where: { id },
      returning: true,
    });

    return review;
  }

  async remove(id: number): Promise<number> {
    const review = await this.reviewModel.destroy({ where: { id } });
    return review;
  }
}
