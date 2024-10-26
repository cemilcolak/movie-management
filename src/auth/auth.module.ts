import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {UsersModule} from '../users/users.module';
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: 'creainc-uPvb2FATvGXqKrEgShMvDbwyFPRuUijW',
            signOptions: {expiresIn: '60s'}, // token expire time
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {
}