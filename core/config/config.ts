import { isAndroid, isIOS } from '@nativescript/core';

const ENV = {
    development: {
        apiUrl: 'http://localhost:3000/api/v1',
        environment: 'development'
    },
    staging: {
        apiUrl: 'https://staging-api.escazo.com/v1',
        environment: 'staging'
    },
    production: {
        apiUrl: 'https://api.escazo.com/v1',
        environment: 'production'
    }
};

const currentEnv = process.env.NODE_ENV || 'development';

export const config = {
    ...ENV[currentEnv],
    version: '1.0.0',
    defaultLanguage: 'en',
    defaultCurrency: 'USD',
    theme: {
        primary: '#6b46c1',
        secondary: '#9f7aea',
        accent: '#4990E2'
    },
    storage: {
        authToken: 'auth_token',
        userPreferences: 'user_preferences',
        theme: 'app_theme'
    },
    api: {
        timeout: 10000,
        retryAttempts: 3
    },
    platform: {
        isAndroid,
        isIOS
    }
};