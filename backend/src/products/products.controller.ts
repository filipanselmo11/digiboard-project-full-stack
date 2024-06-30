import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Post('create')
  async create(@Body() data: Product) {
    return await this.productsService.create(data);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Public()
  @Get(':code')
  async findProductByCode(@Param('code') code: string) {
    return this.productsService.findProductByCode(code);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}
