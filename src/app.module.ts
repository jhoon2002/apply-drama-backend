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
            envFilePath: '../.production.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [MysqlConfigModule],
            useClass: MysqlConfigService,
            inject: [MysqlConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
