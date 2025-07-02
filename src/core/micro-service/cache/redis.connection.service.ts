import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisConnectService implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClientType;

  async onModuleInit() {
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

    this.redisClient = createClient({ url: redisUrl });

    this.redisClient.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });

    await this.redisClient.connect();

    console.log(`✅ Redis connected: ${redisUrl}`);
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.quit();
      console.log('🔌 Redis disconnected');
    }
  }

  async setItem(key: string, value: object) {
    const status = await this.redisClient.set(key, JSON.stringify(value), { EX: 60 * 10 }); // 10 minutes
    return status;
  }

  async getValue<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : null;
  }

  async removeItem(key: string) {
    return await this.redisClient.del(key);
  }
}
