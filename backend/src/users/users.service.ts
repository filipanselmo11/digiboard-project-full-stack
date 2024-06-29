import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(data: User) {
    return await this.prismaService.user.create({ data });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
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
