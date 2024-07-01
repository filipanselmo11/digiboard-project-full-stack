import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('create')
  async create(@Body() data: User) {
    return this.usersService.create(data);
  }

  @Public()
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: User) {
    return this.usersService.update(+id, data);
  }
  
  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
