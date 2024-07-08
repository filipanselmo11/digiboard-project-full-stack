import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProductDto } from './dto/products.product';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async create(productDto: CreateProductDto): Promise<any> {
        try {
            const createdProduct = await this.prisma.product.create({
                data: {
                    code: productDto.code,
                    description: productDto.description,
                    enterDate: productDto.enterDate,
                    validateDate: productDto.validateDate,
                },
            });

            return createdProduct;
        } catch(error) {
            console.error(error);
            throw new HttpException(
                'Erro ao criar produto',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findAll(): Promise<any> {
        return await this.prisma.product.findMany();
    }

    async findProductByCode(code: string): Promise<Product> {
        return await this.prisma.product.findUnique({
            where: { code },
        });
    }
}
