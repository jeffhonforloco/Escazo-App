import { ApplicationSettings } from '@nativescript/core';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  setItem(key: string, value: any): void {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      ApplicationSettings.setString(key, stringValue);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }

  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const value = ApplicationSettings.getString(key);
      if (!value) return defaultValue || null;
      return JSON.parse(value);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return defaultValue || null;
    }
  }

  removeItem(key: string): void {
    ApplicationSettings.remove(key);
  }

  clear(): void {
    ApplicationSettings.clear();
  }
}