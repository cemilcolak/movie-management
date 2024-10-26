import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {UserModule} from '../user/user.module';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: 'creainc-uPvb2FATvGXqKrEgShMvDbwyFPRuUijW',
            signOptions: {expiresIn: '60s'}, // token expire time
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}