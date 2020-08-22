import * as express from 'express';
import { Request, Response } from 'express';
import Config from '../../utils/config';
import HttpClient from '../../utils/http-client';
import RedisCache from '../../providers/cache/redis';
import IControllerBase from '../../interfaces/IControllerBase.interface';
import { validationResult } from 'express-validator/check';
import { searchQueryRules, formatSearchResponse } from './search-util';

type SearchQuery = {
  q: string;
  page: number;
  per_page: number;
  sort?: string;
  order?: string;
};

export default class SearchController extends HttpClient
  implements IControllerBase {
  protected readonly path: string = '/v1';
  public router = express.Router();

  constructor() {
    // call the parent constructor with github base url
    super(Config.get('GITHUB_BASE_API', 'https://api.github.com/search'));
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(`${this.path}/search`, this._search);
    this.router.put(`/clear-cache`, this._clearCache);
  }

  private _search = async (req: Request, res: Response): Promise<Response> => {
    try {
      await Promise.all(
        searchQueryRules.map((validation: any) => validation.run(req)),
      );

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Ideally all this should move to services, but keeping it here for sake of simplicity
      const {
        query: {
          search_type,
          search_text,
          page = 1,
          per_page = 30,
          sort = null,
          order = null,
          fields = [],
        },
        cacheKey,
      } = req;

      const params: SearchQuery = {
        q: String(search_text),
        page: Number(page),
        per_page: Number(per_page),
        ...(sort && { sort: String(sort) }),
        ...(order && { order: String(order) }),
      };
      const result = await this.instance.get(`/${search_type}`, { params });

      // save to redis this query and result
      RedisCache.getInstance().set(
        cacheKey || '',
        JSON.stringify(result),
        60 * 60 * 2,
      );

      const formattedResponse = formatSearchResponse(
        String(search_type),
        { ...result, search_type, search_text, per_page, page, sort, order },
        fields,
      );
      return res.status(200).send(formattedResponse);
    } catch (error) {
      throw error;
    }
  };

  private _clearCache = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      await RedisCache.getInstance().clear();
      return res.status(204).send();
    } catch (error) {
      throw error;
    }
  };
}
