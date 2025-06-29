import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisConnectService implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClientType;

  async onModuleInit() {
    const isProd = !!process.env.REDIS_URL;

    this.redisClient = createClient(
      isProd
        ? {
            url: process.env.REDIS_URL,
            socket: {
              tls: true,
              host: 'assuring-jaybird-40190.upstash.io', // 👈 qo‘shildi
              rejectUnauthorized: false,
            },
          }
        : {
            url: 'redis://127.0.0.1:6379',
          },
    );

    await this.redisClient.on('error', (err) =>
      console.error('Redis error:', err),
    );

    await this.redisClient.connect();
    const cluster = await this.redisClient.CLUSTER_LINKS();
    console.log(cluster);
    console.log('Redis connected');
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.quit();
      console.log('Redis disconnected');
    }
  }
  async setItem(key: string, value: object) {
    const status = await this.redisClient.set(key, JSON.stringify(value), {
      EX: 60000,
    });
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
