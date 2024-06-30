import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Transaction } from '@prisma/client';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Public()
  @Post('create')
  async create(@Body() data: Transaction) {
    return await this.transactionsService.create(data);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.transactionsService.findAll();
  }
}
