import * as dotenv from 'dotenv';
// dotenv.config({ path: __dirname + '/../../../.env' });

export default class Config {
  /**
   * return env value for key, else defaults to defaultValue
   * @param key
   * @param defaultValue
   */
  static get(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }
}
