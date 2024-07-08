import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '@prisma/client';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async create(@Body() data: Transaction) {
    return await this.transactionsService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.transactionsService.findAll();
  }
}
