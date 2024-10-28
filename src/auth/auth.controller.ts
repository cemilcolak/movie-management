import {Controller, Post, Body} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {LoginAuthDto} from "./dto/login-auth.dto";

@ApiTags('auth') // Grouping under "auth" in Swagger UI
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    @ApiOperation({summary: 'User registration'})
    @ApiResponse({status: 201, description: 'User registered successfully.'})
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    @ApiOperation({summary: 'User login'}) // Description for the operation
    @ApiResponse({status: 200, description: 'Successful login.'}) // Successful response
    @ApiResponse({status: 401, description: 'Unauthorized.'}) // Error response
    async login(@Body() loginAuthDto: LoginAuthDto) {
        return this.authService.login(loginAuthDto);
    }
}