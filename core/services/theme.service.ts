import { Observable } from '@nativescript/core';
import { StorageService } from './storage.service';
import { APP_CONFIG } from '../constants/config';

export class ThemeService extends Observable {
  private static instance: ThemeService;
  private storageService: StorageService;
  private _currentTheme: 'light' | 'dark';

  private constructor() {
    super();
    this.storageService = StorageService.getInstance();
    this._currentTheme = this.storageService.getItem('theme', APP_CONFIG.DEFAULTS.THEME);
  }

  static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  get currentTheme(): 'light' | 'dark' {
    return this._currentTheme;
  }

  setTheme(theme: 'light' | 'dark'): void {
    this._currentTheme = theme;
    this.storageService.setItem('theme', theme);
    this.notifyPropertyChange('currentTheme', theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    // Apply theme-specific styles
    const rootView = Application.getRootView();
    if (rootView) {
      rootView.className = this._currentTheme === 'dark' ? 'ns-dark' : 'ns-light';
    }
  }
}