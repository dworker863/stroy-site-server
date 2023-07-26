export class CreateMailDto {
  cart: { service: string; sum: number }[];
  cartSum: number;
  phoneNumber: string;
}
