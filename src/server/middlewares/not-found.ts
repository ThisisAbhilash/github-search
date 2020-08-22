import { Request, Response } from 'express';
/**
 * Called for any requests for which no
 * handler was found.
 * @param req
 * @param res
 */
const RouteNotFoundMiddleware = (req: Request, res: Response): Response =>
  res.status(404).json({ message: 'Route not found' });

export default RouteNotFoundMiddleware;
