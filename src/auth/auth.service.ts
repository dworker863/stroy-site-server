import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findOne(userDto.email);

    if (user) {
      throw new HttpException(
        'Пользователь с таким именем уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(userDto.password, 10);

    await this.usersService.create({
      ...userDto,
      password: hash,
    });

    const result = await this.login(userDto);

    return result;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };

    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validate(userDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findOne(userDto.email);
    const passwordEquals =
      user && (await bcrypt.compare(userDto.password, user.password));

    if (user && passwordEquals) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
