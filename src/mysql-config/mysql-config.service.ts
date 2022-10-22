import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { join } from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            username: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            port: this.configService.get<number>('DATABASE_PORT'),
            host: this.configService.get<string>('DATABASE_HOST'),
            database: this.configService.get<string>('DATABASE_NAME'),
            // entities: ['src/**/*.entity{.ts,.js}'],
            entities: [join(__dirname, '/**/*.entity.{ts,js}')],
            autoLoadEntities: true,
            synchronize: false, // true: npm run start 시 테이블 update
            logging: false, //쿼리 로그
            namingStrategy: new SnakeNamingStrategy(),
        }
    }
}
