import { query } from 'express-validator';
import { intersection, pick, mergeUnique, isEmpty } from '../../utils/common';

type SearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: any[];
  page: number;
  per_page: number;
};

const constants = {
  SEARCH_TYPES: ['users', 'repositories'],
  USERS_FIELDS: [
    'login',
    'id',
    'avatar_url',
    'node_id',
    'url',
    'html_url',
    'followers_url',
    'subscriptions_url',
    'organizations_url',
    'repos_url',
  ],
  REPOSITORIES_FIELDS: [
    'full_name',
    'private',
    'html_url',
    'owner',
    'description',
    'created_at',
    'updated_at',
    'stargazers_count',
    'watchers_count',
    'language',
    'forks_count',
    'open_issues_count',
  ],
};

export const generateSearchCacheKey = (obj: any): string => {
  const { method, search_type, search_text, page, per_page, sort, order } = obj;
  let key = `${method}_SEARCH_`;
  for (const curr of [search_type, search_text, page, per_page, sort, order]) {
    if (!isEmpty(curr)) {
      key += `${curr}_`;
    }
  }
  return key;
};

/**
 * Validate and sanitize search query params
 */
export const searchQueryRules = [
  query('search_type')
    .trim()
    .escape()
    .isString()
    .withMessage('search_type string required')
    .isIn(constants.SEARCH_TYPES)
    .withMessage('search_type can only be users or repositories.'),
  query('search_text')
    .trim()
    .escape()
    .isString()
    .isLength({
      min: 3,
    })
    .withMessage('search_text of length greater than 3 required'),
  query('page').optional().escape().isNumeric(),
  query('per_page').optional().escape().isNumeric(),
  query('sort', 'sort by field').trim().optional().escape().isString(),
  query('order')
    .trim()
    .optional()
    .escape()
    .isString()
    .isIn(['asc', 'desc'])
    .withMessage('order can only be asc or desc.'),
  query('fields')
    .optional()
    .custom((fields) => {
      let _fields = fields;
      if (!Array.isArray(fields)) _fields = [fields];
      return _fields.every((k: string) =>
        mergeUnique(
          constants.USERS_FIELDS,
          constants.REPOSITORIES_FIELDS,
        ).includes(k),
      );
    })
    .withMessage(
      `fields can only be ${mergeUnique(
        constants.USERS_FIELDS,
        constants.REPOSITORIES_FIELDS,
      ).join(', ')}`,
    ),
  ,
];

/**
 * format github api response as per our requirement
 * @param search_type
 * @param input
 * @param fields
 */
export const formatSearchResponse = (
  search_type: string,
  input: any,
  fields: any,
): SearchResponse => {
  let _fields = fields;

  if (!Array.isArray(fields)) _fields = [fields];

  _fields = intersection(
    _fields,
    search_type === 'users'
      ? constants.USERS_FIELDS
      : constants.REPOSITORIES_FIELDS,
  );

  if (_fields.length === 0) {
    _fields =
      search_type === 'users'
        ? constants.USERS_FIELDS
        : constants.REPOSITORIES_FIELDS;
  }

  const output: SearchResponse = {
    ...input,
    items: input.items.map((k: any) => pick(k, _fields)),
  };
  return output;
};
