import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async create(@Body() data: Product) {
    return await this.productsService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':code')
  async findProductByCode(@Param('code') code: string) {
    return this.productsService.findProductByCode(code);
  }
}
