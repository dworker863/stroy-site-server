import { IReview } from './review.interface';

export interface IProject {
  id: number;
  name: string;
  description: string;
  review: IReview;
  images: string[];
  price: number;
}
