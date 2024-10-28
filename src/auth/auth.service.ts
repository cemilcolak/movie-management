import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {LoginAuthDto} from "./dto/login-auth.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async register(createUserDto: CreateUserDto) {
        return this.userService.register(createUserDto);
    }

    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.userService.findByUsername(loginAuthDto.username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginAuthDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {username: user.username, sub: user.id, role: user.role};
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}