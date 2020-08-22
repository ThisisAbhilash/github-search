// eslint-disable-next-line @typescript-eslint/no-var-requires
require('appmetrics-dash').attach();

import App from './app';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import responseTime from 'response-time';
import Config from './utils/config';

// providers
import RedisCache from './providers/cache/redis';

// middlewares
import LoggerMiddleware from './middlewares/req-logger';
import ResponseCached from './middlewares/check-response-cached';
import ExceptionHandlerMiddleware from './middlewares/exception-handler';
import RouteNotFoundMiddleware from './middlewares/not-found';

// controllers
import HealthController from './controllers/health/health.controller';
import SearchController from './controllers/search/search.controller';

// fatal handlers
import { handleExit, handleUncaughtErrors } from './utils/fatal';

handleExit();
handleUncaughtErrors();

// init providers
RedisCache.getInstance();

const app = new App({
  controllers: [new HealthController(), new SearchController()],
  middleWares: [
    LoggerMiddleware,
    responseTime(),
    cors({ credentials: true, origin: true }),
    compression(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    ResponseCached,
  ],
  exceptionHandlers: [RouteNotFoundMiddleware, ExceptionHandlerMiddleware],
  port: Number(Config.get('PORT', '5000')),
});

app.listen();
