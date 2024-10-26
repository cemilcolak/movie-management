import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {CreateUserDto} from '../user/dto/create-user.dto';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    async register(createUserDto: CreateUserDto) {
        return this.userService.register(createUserDto);
    }

    async login(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {username: user.username, sub: user.id, role: user.role};
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}