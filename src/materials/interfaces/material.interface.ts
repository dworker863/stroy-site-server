import { IService } from 'src/services/interfaces/service.interface';

export interface IMaterial {
  id?: number;
  name: string;
  consumption: number;
  package: number;
  services: IService[];
  price: number;
}
