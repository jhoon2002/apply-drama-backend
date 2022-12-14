import { Module } from '@nestjs/common'
import { MysqlConfigService } from '@/mysql-config/mysql-config.service'

@Module({
    providers: [MysqlConfigService],
})
export class MysqlConfigModule {}
