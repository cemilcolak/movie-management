import {Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserRole} from '../../user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true; // If no roles are defined, allow access
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Assuming user is set in the request after validation

        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
