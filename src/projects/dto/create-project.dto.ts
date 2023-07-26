import { Review } from '../models/reviews.model';

export class CreateProjectDto {
  name: string;
  description: string;
  review: Review;
  price: number;
}
