import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/products.product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  public async create(@Body() createProductDto: CreateProductDto): Promise<any> {
    const result = await this.productsService.create(createProductDto);
    return result;

  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async findAll() {
    return await this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':code')
  public async findProductByCode(@Param('code') code: string) {
    return this.productsService.findProductByCode(code);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public async findProductById(@Param('id') id:string) {
    return this.productsService.findById(+id);
  }
}
