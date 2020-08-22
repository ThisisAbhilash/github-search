import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';
import {
  generateSearchCacheKey,
  formatSearchResponse,
} from '../controllers/search/search-util';
import RedisCache from '../providers/cache/redis';

const CACHE_PATH = ['GET:/api/v1/search']; // list of method:path that needs to be checked in cache

const ResponseCached = async (
  req: Request,
  resp: Response,
  next: NextFunction,
): Promise<any> => {
  const logger: Logger = new Logger();
  const {
    method,
    path,
    query: {
      search_type,
      search_text,
      page = 1,
      per_page = 30,
      sort = null,
      order = null,
      fields = [],
    },
  } = req;

  if (!CACHE_PATH.includes(`${method}:${path}`)) {
    return next();
  } else {
    const cacheKey = generateSearchCacheKey({
      method,
      path,
      search_type,
      search_text,
      page,
      per_page,
      sort,
      order,
    });
    req.cacheKey = cacheKey; // add cache key to req object

    logger.info(`[CACHE CHECK] for key - ${cacheKey}`);
    const cachedData = await RedisCache.getInstance().get(cacheKey);

    if (cachedData) {
      logger.info(`[CACHE FOUND] for key - ${cacheKey}`);
      const data = JSON.parse(cachedData);
      const response = formatSearchResponse(
        String(search_type),
        { ...data, search_type, search_text, per_page, page, sort, order },
        fields,
      );

      return resp.status(200).send(response);
    }
    logger.info(`[CACHE MISSED] for key - ${cacheKey}`);
    return next();
  }
};

export default ResponseCached;
