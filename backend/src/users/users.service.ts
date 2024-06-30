import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(data: User): Promise<any> {
    return await this.prismaService.user.create({ data });
  }

  async findAll(): Promise<any> {
    return await this.prismaService.user.findMany();
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: number, data: User) {
    return await this.prismaService.user.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
