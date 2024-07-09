import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    qtdPaid: number;
    @IsNotEmpty()
    @IsString()
    deliveryData: string;
    @IsNotEmpty()
    @IsNumber()
    productId: number;
}