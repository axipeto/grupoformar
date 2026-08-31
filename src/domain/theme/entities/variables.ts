export class Variables {
  static get<T = string>(key: keyof ImportMetaEnv, fallback?: T): T {
    const value = import.meta.env[key] as T;
    if (value === undefined || value === null || value === '') {
      if (fallback !== undefined) {
        console.warn(`[env] Missing "${String(key)}", using fallback: "${fallback}"`);
        return fallback;
      }
      const msg = `[env] Missing required environment variable: "${String(key)}"`;
      console.error(msg);
      throw new Error(msg);
    }
    return value;
  }
}
