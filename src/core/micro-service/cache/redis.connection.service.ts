import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisConnectService implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClientType;

  async onModuleInit() {
    this.redisClient = createClient({
      url: 'redis://127.0.0.1:6379',
    });

    await this.redisClient.on('error', (err) =>
      console.error('Redis error:', err),
    );

    await this.redisClient.connect();
    console.log('Redis connected');
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.quit();
      console.log('Redis disconnected');
    }
  }

  async incrementCounter(key: string): Promise<number> {
    return await this.redisClient.incr(key);
  }
  async setItem(key: string, value: object) {
    return this.redisClient.set(key, JSON.stringify(value), { EX: 600 });
  }
  async getCounter(key: string): Promise<number> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : 0;
  }
}
