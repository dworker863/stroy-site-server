import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async registration(userDto: CreateUserDto): Promise<string> {
    const user = await this.usersService.findOne(userDto.username);

    if (user) {
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(userDto.password, 10);
    console.log(hash);

    const { username } = await this.usersService.create({
      ...userDto,
      password: hash,
    });

    return username;
  }

  async validate(userDto: CreateUserDto) {
    const user = await this.usersService.findOne(userDto.username);
    const passwordEquals =
      user && (await bcrypt.compare(userDto.password, user.password));

    if (user && passwordEquals) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
