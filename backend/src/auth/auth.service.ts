import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findUserByEmail(email);
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.id,
            username: user.email
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
