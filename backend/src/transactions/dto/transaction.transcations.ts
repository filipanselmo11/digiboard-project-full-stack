import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
    @IsNotEmpty()
    qtdPaid: number;
    @IsNotEmpty()
    deliveryData: string;
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    productId: number
}