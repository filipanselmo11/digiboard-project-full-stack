import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateTransactionDto } from './dto/transaction.transcations';

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) {}

    async create(transactionDto: CreateTransactionDto): Promise<any> {
        try {
            const createdTransaction = await this.prisma.transaction.create({
                data: {
                     qtdPaid: transactionDto.qtdPaid,
                     deliveryData: transactionDto.deliveryData,
                     userId: transactionDto.userId,
                     productId: transactionDto.productId                 
                },
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
        const transactions =  await this.prisma.transaction.findMany({
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
