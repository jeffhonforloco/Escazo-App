import { Observable } from '@nativescript/core';
import { config } from '../config/config';

export class AnalyticsService extends Observable {
    private static instance: AnalyticsService;

    private constructor() {
        super();
    }

    static getInstance(): AnalyticsService {
        if (!AnalyticsService.instance) {
            AnalyticsService.instance = new AnalyticsService();
        }
        return AnalyticsService.instance;
    }

    trackScreen(screenName: string, params?: Record<string, any>) {
        if (config.environment === 'production') {
            // Implement analytics tracking
            console.log('Screen tracked:', screenName, params);
        }
    }

    trackEvent(eventName: string, params?: Record<string, any>) {
        if (config.environment === 'production') {
            // Implement event tracking
            console.log('Event tracked:', eventName, params);
        }
    }

    trackError(error: Error, context?: Record<string, any>) {
        if (config.environment === 'production') {
            // Implement error tracking
            console.error('Error tracked:', error, context);
        }
    }
}