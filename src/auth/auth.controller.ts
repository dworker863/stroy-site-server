import { LocalAuthGuard } from './guards/local-auth.guard';
import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<any> {
    return this.authService.registration(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req): Promise<any> {
    return this.authService.login(req.user.dataValues);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/login')
  checkJwt(): boolean {
    return true;
  }
}
