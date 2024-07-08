import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}