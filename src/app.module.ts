import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {join} from 'path';
import {MoviesModule} from './movies/movies.module';
import {DevtoolsModule} from "@nestjs/devtools-integration";
import {TicketsModule} from './tickets/tickets.module';


@Module({
    imports: [
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
        ConfigModule.forRoot({
            isGlobal: true, // Makes ConfigModule available globally
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<'mysql'>('DB_TYPE'),
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
                synchronize: true,
                logging: true,
            }),
        }),
        AuthModule,
        UsersModule,
        MoviesModule,
        TicketsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}