import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) {}

    async create(data: Product): Promise<any> {
        return await this.prismaService.product.create({ data });
    }

    async findAll(): Promise<any> {
        return await this.prismaService.product.findMany();
    }

    async findProductByCode(code: string): Promise<Product> {
        return await this.prismaService.product.findUnique({
            where: { code },
        });
    }

    async findOne(id: number): Promise<Product> {
        return await this.prismaService.product.findFirst({
            where: {
                id: Number(id),
            },
        });
    }
}
