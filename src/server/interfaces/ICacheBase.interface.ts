// any caching provider service (redis, mcache or any other) must implement interface ICacheBase,
// and define get, set & clear methods

interface ICacheBase {
  /**
   * returns value stored against the given key
   * @param key
   */
  get(key: string): Promise<string>;

  /**
   * set (key, value) pair in cache for ex time
   * @param key
   * @param value
   * @param ex
   */
  set(key: string, value: string, ex: number): Promise<boolean>;

  /**
   * clear redis cache
   */
  clear(): Promise<boolean>;
}

export default ICacheBase;
