import { LocalAuthGuard } from './guards/local-auth.guard';
import { Controller, Post, UseGuards, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) res) {
    // console.log(req.user);
    const { username, id, access_token } = await this.authService.login(
      req.user.dataValues,
    );

    res.cookie('token', access_token, { httpOnly: true });

    return { username, id };
  }
}
