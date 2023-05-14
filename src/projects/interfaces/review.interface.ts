export interface IReview {
  id: number;
  projectId: number;
  author: string;
  stars: number;
  text: string;
  date: Date;
}
