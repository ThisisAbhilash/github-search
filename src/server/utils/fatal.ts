import RedisCache from '../providers/cache/redis';
import Logger from './logger';

const logger = new Logger();

/**
 * Makes sure that the process doesn't shut down
 * for any uncaught errors – and logs them to
 * for easier debugging.
 */
export const handleUncaughtErrors = (): void => {
  process.on('unhandledRejection', (err: { message: string }) => {
    logger.error(`Unhandled Rejection - ${err.message}`);
  });

  process.on('uncaughtException', (err: { message: string }) => {
    logger.error(`Unhandled Exception - ${err.message}`);
  });
};

const _disconnectGracefully = () => {
  logger.info('shuting down providers');
  RedisCache.getInstance().shutdown();
  process.exit(0);
};

export const handleExit = (): void => {
  // If the Node process ends, close the connection gracefully
  process.on('SIGINT', _disconnectGracefully);
  process.on('exit', _disconnectGracefully);
};
