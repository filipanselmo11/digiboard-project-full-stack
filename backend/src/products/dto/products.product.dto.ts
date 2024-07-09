import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    code: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    enterDate: string;
    @IsNotEmpty()
    validateDate: string;
}