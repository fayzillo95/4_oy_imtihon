import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisConnectService implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClientType;

  async onModuleInit() {
    const isProd = !!process.env.REDIS_URL;

    this.redisClient = createClient({ url: isProd ? process.env.REDIS_URL : 'redis://127.0.0.1:6379' });

    await this.redisClient.on('error', (err) =>
      console.error('Redis error:', err),
    );

    await this.redisClient.connect();
    console.log(`Redis connected\n${isProd ? `\n.env.REDIS_URL= : ${process.env.REDIS_URL}` : 'redis://127.0.0.1:6379'}`);
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.quit();
      const isProd = !!process.env.REDIS_URL;

      console.log(`Redis disconnected\n${isProd ? `\n.env.REDIS_URL= : ${process.env.REDIS_URL}` : '\nredis://127.0.0.1:6379'}`);
    }
  }
  async setItem(key: string, value: object) {
    const status = await this.redisClient.set(key, JSON.stringify(value),{ EX: 60 * 10 }); // 10 minutes expiration
    console.log(status);
    return status;
  }
  async getValue<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    console.log(value);
    return value ? JSON.parse(value) : null;
  }
  async removeItem(key: string) {
    const removests = await this.redisClient.del(key);
    return removests;
  }
}
