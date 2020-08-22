export const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Github Search Users / Repositories',
  },
  basePath: '/api',
  schemes: 'http',
  paths: {
    '/ping': {
      get: {
        tags: ['HEALTH'],
        summary: 'ping the server (can be used by monitoring services)',
        responses: {
          '200': {
            description: 'ping status',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'ping response',
                },
              },
            },
          },
          '503': {
            description: 'server down',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'server down message',
                },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        tags: ['HEALTH'],
        summary: 'check health of the server and providers',
        responses: {
          '200': {
            description: 'server health',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  description: 'server status',
                },
                redis: {
                  type: 'string',
                  description: 'redis connection status',
                },
              },
            },
          },
        },
      },
    },
    '/v1/search': {
      get: {
        tags: ['SEARCH'],
        summary: 'search for users / repositories on github',
        parameters: [
          {
            in: 'query',
            name: 'search_type',
            description: 'search user or repositories',
            required: true,
            type: 'string',
            example: 'users',
            enum: ['users', 'repositories'],
          },
          {
            in: 'query',
            name: 'search_text',
            description: 'text to search for',
            required: true,
            schema: { type: 'string', example: 'abhilash' },
          },
          {
            in: 'query',
            name: 'page',
            description: 'page number for pagination',
            required: false,
            schema: { type: 'number', example: 1 },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'number of records to limit per_page',
            required: false,
            schema: { type: 'number', example: 20 },
          },
          {
            in: 'query',
            name: 'sort',
            description: 'sort results by',
            required: false,
            type: 'string',
            example: 'stars',
            enum: [
              'stars',
              'forks',
              'help-wanted-issues',
              'updated',
              'followers',
              'repositories',
              'joined',
            ],
          },
          {
            in: 'query',
            name: 'order',
            description: 'asc or desc (used only if sort provided)',
            required: false,
            type: 'string',
            example: 'asc',
            enum: ['asc', 'desc'],
          },
          {
            in: 'query',
            name: 'fields',
            description:
              'fields to return in response (to solve under / over fetching) defaults to all',
            required: false,
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'login',
                'id',
                'avatar_url',
                'node_id',
                'url',
                'followers_url',
                'subscriptions_url',
                'organizations_url',
                'repos_url',
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
            },
            collectionFormat: 'multi',
          },
        ],
        responses: {
          '200': {
            description: 'success',
            schema: {
              type: 'object',
            },
          },
          '400': {
            description: 'bad request',
            schema: {
              type: 'object',
            },
          },
          '403': {
            description: 'rate limit exceeded',
            schema: {
              type: 'object',
            },
          },
          '500': {
            description: 'internal server error',
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
    '/clear-cache': {
      put: {
        tags: ['CACHE'],
        summary: 'flush all cached records',
        responses: {
          '204': {
            description: 'success',
          },
          '500': {
            description: 'internal server error',
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  },
};
