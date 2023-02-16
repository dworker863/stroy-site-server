import { IMaterial } from 'src/materials/interfaces/material.interface';

export interface IService {
  id?: number;
  name: string;
  measure: string;
  materials: IMaterial[];
  price: number;
}
