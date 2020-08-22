import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';
import { fetchRequestData } from '../utils/common';

const LoggerMiddleware = (
  req: Request,
  resp: Response,
  next: NextFunction,
): void => {
  const logger: Logger = new Logger();
  logger.info(
    `Request Method: ${req.method}, Path: ${req.path}, ${fetchRequestData(
      req,
    )}`,
  );
  next();
};

export default LoggerMiddleware;
