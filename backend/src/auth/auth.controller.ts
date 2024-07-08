import { Body, Controller, HttpStatus, Post, HttpException } from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  public async registerUser(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.register(createUserDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async loginUser(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }
}
