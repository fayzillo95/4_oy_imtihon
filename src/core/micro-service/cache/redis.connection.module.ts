import { Global, Module } from '@nestjs/common';
import { RedisConnectService } from './redis.connection.service';

@Global()
@Module({
  providers: [RedisConnectService],
  exports: [RedisConnectService],
})
export class RedisConnectionModule {}
