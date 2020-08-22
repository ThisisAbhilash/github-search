// basic Error / Exception handler

import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

/**
 * Intercepts the exceptions and logs them if required
 * @param err
 * @param req
 * @param res
 * @param next
 */
const ExceptionHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  // Continue if it is not an error
  if (!(err instanceof Error)) {
    return next();
  }
  const status = err.status || 500;
  const requestUrl = req.originalUrl;
  const message = err.message || 'something went wrong';

  // log error
  new Logger().error(
    `Error handled in middleware - ${JSON.stringify({
      status,
      message,
      requestUrl,
    })}`,
  );
  return res.status(status).json({ status, message, requestUrl });
};

export default ExceptionHandlerMiddleware;
