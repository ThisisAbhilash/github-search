declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      APP_URL: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_USER: string;
      REDIS_PWD: string;
      REDIS_TIMEOUT: string;
      GITHUB_BASE_API: string;
    }
  }
}
