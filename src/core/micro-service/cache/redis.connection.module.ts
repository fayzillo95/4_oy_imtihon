import { Module } from '@nestjs/common';
import { RedisConnectService } from './redis.connection.service';

@Module({
  providers: [RedisConnectService],
  exports: [RedisConnectService],
})
export class RedisConnectionModule {}
