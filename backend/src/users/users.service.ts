import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto, LoginUserDto } from './dto/users.user.dto';
import { compare, hash } from 'bcrypt';

interface FormatLogin extends Partial<User> {
  username: string;
}
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(userDto: CreateUserDto): Promise<any> {
    try {
      const salt = 10;
      const hasPass = await hash(userDto.password, salt);
      const createdUser = await this.prisma.user.create({
        data: {
          email: userDto.email,
          name: userDto.name,
          username: userDto.username,
          password: hasPass
        },
      });

      return createdUser;

    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao criar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByLogin({
    username,
    password
  }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new HttpException('Usuário ou senha incorretos', HttpStatus.UNAUTHORIZED);
    }

    const equal = await compare(password, user.password);

    if (!equal) {
      throw new HttpException('Usuário ou senha incorretos', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...rest } = user;
    return rest;
  }

  async findByPayload({ username }): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { username },
    });
  }
}
