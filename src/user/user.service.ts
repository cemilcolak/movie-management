import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User, UserRole} from './entities/user.entity';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>, // Burada Repository'i ekliyoruz
    ) {
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const {username, password, age, role} = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            age,
            role: role || UserRole.CUSTOMER,
        });

        return this.userRepository.save(user);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {username}});
    }
}