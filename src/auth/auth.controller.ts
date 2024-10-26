import {Controller, Post, Body} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../user/dto/create-user.dto';

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
    async login(@Body() body: { username: string; password: string }) {
        return this.authService.login(body.username, body.password);
    }
}