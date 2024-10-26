import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

export enum UserRole {
    CUSTOMER = 'customer',
    MANAGER = 'manager',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    age: number;

    @Column({type: 'enum', enum: UserRole, default: UserRole.CUSTOMER})
    role: UserRole;
}