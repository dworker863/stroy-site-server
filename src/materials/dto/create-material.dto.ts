import { IService } from 'src/services/interfaces/service.interface';

export class CreateMaterialDto {
  name: string;
  consumption: number;
  package: number;
  services: any[];
  price: number;
}
