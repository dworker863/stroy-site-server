import { IMaterial } from 'src/materials/interfaces/material.interface';

export class CreateServiceDto {
  name: string;
  measure: string;
  materials: any[];
  price: number;
}
