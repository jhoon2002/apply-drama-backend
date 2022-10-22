import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MysqlConfigService } from '@/mysql-config/mysql-config.service'
import { MysqlConfigModule } from '@/mysql-config/mysql-config.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'dev' ? '../.development.env' : '../.development.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [MysqlConfigModule],
            useClass: MysqlConfigService,
            inject: [MysqlConfigService],
        }),
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: 'localhost',
        //     port: 3306,
        //     username: 'apply_drama',
        //     password: '1111',
        //     database: 'apply_drama',
        //     // entities: [User, Product], // 사용할 entity의 클래스명을 넣어둔다.
        //     synchronize: false, // false로 해두는 게 안전하다.
        // }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
