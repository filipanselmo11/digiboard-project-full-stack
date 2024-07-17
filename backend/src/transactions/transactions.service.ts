import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateTransactionDto } from './dto/transaction.transcations.dto';

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) {}

    async create(transactionDto: CreateTransactionDto, userId: number): Promise<any> {
        try {
            const createdTransaction = await this.prisma.transaction.create({
                data: {
                    qtdPaid: Number(transactionDto.qtdPaid),
                    deliveryData: transactionDto.deliveryData,
                    userId: userId,
                    productId: transactionDto.productId,
                }
            });
            return createdTransaction;
        } catch(error) {
            console.error(error);
            throw new HttpException(
                'Erro ao criar transação',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findAll(): Promise<any> {
        const result = await this.prisma.transaction.findMany();
        return result;
    }

    async findTransactionsByUserId(userId: number): Promise<any> {
        const result = await this.prisma.transaction.findMany({
            where: { userId }
        });

        return result;
    }
}
