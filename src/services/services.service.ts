import { Service } from './models/services.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { IService } from './interfaces/service.interface';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service) private serviceModel: typeof Service) {}

  async create(createServiceDto: CreateServiceDto): Promise<IService> {
    const checkService = await this.getServiceByName(createServiceDto.name);

    if (checkService) {
      throw new HttpException(
        'Данная услуга уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const service = await this.serviceModel.create(createServiceDto);
    await service.$set('materials', createServiceDto.materials);

    return service;
  }

  async findAll(): Promise<IService[]> {
    const services = await this.serviceModel.findAll({
      include: { all: true },
    });
    return services;
  }

  async findOne(id: number): Promise<IService> {
    const service = await this.serviceModel.findByPk(id);
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<any> {
    const checkService = await this.getServiceByName(updateServiceDto.name);

    if (checkService && checkService.id !== id) {
      throw new HttpException(
        'Данная услуга уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const service = await this.serviceModel.update(updateServiceDto, {
      where: { id },
      returning: true,
    });

    await service[1][0].$set('materials', updateServiceDto.materials);

    return service;
  }

  async remove(id: number): Promise<number> {
    const service = await this.serviceModel.destroy({ where: { id } });
    return service;
  }

  async getServiceByName(name: string): Promise<IService> {
    const service = await this.serviceModel.findOne({ where: { name } });
    return service;
  }
}
