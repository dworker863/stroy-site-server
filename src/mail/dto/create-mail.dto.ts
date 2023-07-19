export class CreateMailDto {
  cart: { service: string; sum: number }[];
  cartSum: number;
  email: string;
}
