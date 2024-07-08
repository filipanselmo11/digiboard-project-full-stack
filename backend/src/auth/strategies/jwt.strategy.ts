import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new HttpException('Token Inválido', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}


export interface JwtPayload {
    username: string;
}