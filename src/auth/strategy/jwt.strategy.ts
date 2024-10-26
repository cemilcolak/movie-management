import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UsersService} from '../../users/users.service'; // Adjust the import path
import {User} from '../../users/entities/user.entity'; // Adjust the import path

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'creainc-uPvb2FATvGXqKrEgShMvDbwyFPRuUijW', // Use your secret key
        });
    }

    async validate(payload: any): Promise<User> {
        // This method will be called with the decoded JWT payload
        const user = await this.usersService.findOneById(payload.sub); // Ensure this method exists
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}