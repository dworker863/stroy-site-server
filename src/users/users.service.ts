import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interafaces/user.interface';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(userDto: CreateUserDto): Promise<IUser> {
    const user = await this.userModel.create(userDto);
    return user;
  }

  async findOne(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ where: { username } });
    return user;
  }
}
