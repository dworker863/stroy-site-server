import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUser } from './interafaces/user.interface';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOne(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ where: { username } });
    return user;
  }
}
