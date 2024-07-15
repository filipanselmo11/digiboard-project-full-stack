import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('SECRET_KEY'),
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        console.log('Payload recebido ', payload);
        const user = await this.authService.validateUser(payload);
        if (!user) {
            console.log('TOKEN INVALIDO ');
            throw new HttpException('Token Inválido', HttpStatus.UNAUTHORIZED);
        }
        console.log('Usuário ok ', user);
        return user;
    }
}


export interface JwtPayload {
    username: string;
}