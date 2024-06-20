class LocalStorageService {
  public get<T extends {} | string>(key: string, options?: { parse?: true | ((value: string) => T) }) {
    try {
      const value = localStorage.getItem(key);
      if (!value) {
        return undefined;
      }

      if (!options?.parse) {
        return value as T;
      }

      if (options.parse === true) {
        return JSON.parse(value) as T;
      }

      return options.parse(value);
    } catch (error) {
      console.log(`Failed to get "${key}" from localStorage`, { error, options });
      throw error;
    }
  }

  public getOrThrow<T extends {} | string>(key: string, options?: { parse?: true | ((value: string) => T) }) {
    const value = this.get<T>(key, options);
    if (!value) {
      throw new Error(`LocalStorage doesnt have value for "${key}"`);
    }

    return value;
  }

  public set<T extends {}>(key: string, value: T | string, options?: { stringify?: ((value: T) => string) }) {
    try {
      const valueDB = typeof value === 'string'
        ? value
        : (options?.stringify ?? JSON.stringify.bind(JSON))(value);
      localStorage.setItem(key, valueDB);
    } catch (error) {
      console.log(`Failed to set "${key}"`, { error, options });
      throw error;
    }
  }
}

export const localStorageService = new LocalStorageService();
