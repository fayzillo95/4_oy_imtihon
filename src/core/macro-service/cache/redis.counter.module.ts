import { Module } from '@nestjs/common';
import { RedisCounterService } from './redis.counter.service';

@Module({
    providers : [RedisCounterService],
    exports : [RedisCounterService]
})
export class RedisCounterModule {}
