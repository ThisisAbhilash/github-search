import * as express from 'express';
import { Request, Response } from 'express';
import RedisService from '../../providers/cache/redis';
import IControllerBase from '../../interfaces/IControllerBase.interface';

export default class HealthController implements IControllerBase {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/ping', this._ping);
    this.router.get('/health', this._health);
  }

  private _ping = (req: Request, res: Response): Response =>
    res.status(200).send({ message: 'pong' });

  private _health = (req: Request, res: Response): Response =>
    res
      .status(200)
      .send({ status: 'ok', redis: RedisService.getInstance().status() });
}
