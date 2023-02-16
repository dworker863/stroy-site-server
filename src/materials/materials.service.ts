import { IMaterial } from 'src/materials/interfaces/material.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Material } from './models/materials.model';

@Injectable()
export class MaterialsService {
  constructor(@InjectModel(Material) private materialModel: typeof Material) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<IMaterial> {
    const checkMaterial = await this.getMaterialByName(createMaterialDto.name);

    if (checkMaterial) {
      throw new HttpException(
        'Материал с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const material = await this.materialModel.create(createMaterialDto);
    await material.$set('services', createMaterialDto.services);

    return material;
  }

  async findAll(): Promise<IMaterial[]> {
    const materials = await this.materialModel.findAll();
    return materials;
  }

  async findOne(id: number): Promise<IMaterial> {
    const material = await this.materialModel.findByPk(id);
    return material;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<any> {
    const checkMaterial = await this.getMaterialByName(updateMaterialDto.name);

    if (checkMaterial && checkMaterial.id !== id) {
      throw new HttpException(
        'Материал с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const material = await this.materialModel.update(updateMaterialDto, {
      where: { id },
      returning: true,
    });
    await material[1][0].$set('services', updateMaterialDto.services);

    return material;
  }

  async remove(id: number): Promise<number> {
    const material = await this.materialModel.destroy({ where: { id } });
    return material;
  }

  async getMaterialByName(name: string): Promise<IMaterial> {
    const material = await this.materialModel.findOne({ where: { name } });
    return material;
  }
}
