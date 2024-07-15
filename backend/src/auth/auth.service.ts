import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Product, Transaction, User } from "@prisma/client";
import { PrismaService } from "src/database/PrismaService";
import { CreateUserDto, LoginUserDto } from "src/users/dto/users.user.dto";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "./strategies/jwt.strategy";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private prisma: PrismaService,
    ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'Usuário criado com sucesso',
        };

        try {
            status.dataUser = await this.userService.create(userDto);
        } catch (error) {
            status = {
                success: false,
                message: error,
            };
        }

        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userService.findByLogin(loginUserDto);
        const token = this._createToken(user);
        
        return {
            ...token,
            data: user,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        console.log('Validando usuário com payload ', payload);
        const user = await this.userService.findByPayload(payload);
        if (user) {
            console.log('Usuário encontrado ', user);
            return user;  
        }
        console.log('Usuário não encotrado');
        throw new HttpException('Token Inválido', HttpStatus.UNAUTHORIZED);

    }

    private _createToken({ username }): any {
        const user: JwtPayload = { username };
        const token = this.jwtService.sign(user);
        return {
            expiresIn: '2hr',
            token,
        };
    }
}

export interface RegistrationStatus {
    success: boolean;
    message: string;
    dataUser?: User;
    dataProduct?: Product;
    dataTransaction?: Transaction;
}