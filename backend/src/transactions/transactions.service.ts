import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TransactionsService {
    constructor(private prismaService: PrismaService) {}

    async create(data: Transaction): Promise<any> {
        return await this.prismaService.transaction.create({ data });
    }

    async findAll(): Promise<any> {
        const transactions =  await this.prismaService.transaction.findMany({
            include: {
                user: true,
                product: true,
            }
        });

        return transactions.map(transaction => ({
            productName: transaction.product.description,
            qtdPaid: transaction.qtdPaid,
            deliveryData: transaction.deliveryData,
            userName: transaction.user.name
        }));
    }
}
