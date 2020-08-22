import * as redis from 'redis';
import Config from '../../utils/config';
import Logger from '../../utils/logger';
import IProviderBase from '../../interfaces/IProviderBase.interface';
import ICacheBase from '../../interfaces/ICacheBase.interface';

/**
 * This class will be singleton such that
 * same redis client instance is used by all
 * and we don't have multiple connection's
 */

export default class RedisCache implements IProviderBase, ICacheBase {
  private static instance: RedisCache;
  private connected = false;
  private logger = new Logger();
  private client: redis.RedisClient;

  /**
   * constructor is private to prevent direct constructor calls with the `new` operator.
   */
  private constructor() {
    const port = Number(Config.get('REDIS_PORT', '6379'));
    const host = Config.get('REDIS_HOST', '127.0.0.1');
    const pwd = Config.get('REDIS_PWD', '');

    this.client = redis.createClient(port, host, { password: pwd });
    this.client.on('connect', () => {
      this.logger.info('Client connected to redis...');
    });

    this.client.on('ready', () => {
      this.connected = true;
      this.logger.info('Client connected to redis and ready to use...');
    });

    this.client.on('error', (err) => {
      this.connected = false;
      this.logger.error(err.message);
    });

    this.client.on('end', () => {
      this.connected = false;
      this.logger.error('Client disconnected from redis');
    });
  }

  /**
   * This static method getInstance controls the access to the singleton instance.
   */
  public static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }

    return RedisCache.instance;
  }

  status = (): string => (this.connected ? 'connected' : 'dis-connected');

  shutdown = (): void => {
    this.client.quit();
    this.logger.info('Redis Client connection disconnected gracefully');
  };

  get = (key: string): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!this.connected) return resolve('');
      console.time(`[REDIS] time taken to fetch key - ${key}`);
      this.client.get(key, (error, result) => {
        console.timeEnd(`[REDIS] time taken to fetch key - ${key}`);
        if (error) return reject(error);
        return resolve(result || '');
      });
    });

  set = (key: string, value: string, ex: number): Promise<boolean> =>
    new Promise((resolve, reject) => {
      if (!this.connected) return resolve(false);
      this.client.set(key, value, 'EX', ex, (error, result) => {
        if (error) return reject(error);
        return resolve(!!result);
      });
    });

  clear = (): Promise<boolean> =>
    new Promise((resolve, reject) => {
      this.client.flushall((error, result) => {
        this.logger.info(`[CLEAR CACHE]`);
        if (error) return reject(error);
        return resolve(!!result);
      });
    });
}
