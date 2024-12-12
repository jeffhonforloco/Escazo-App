export class Analytics {
  private static instance: Analytics;

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  trackScreen(screenName: string, params?: Record<string, any>) {
    console.log(`Screen viewed: ${screenName}`, params);
  }

  trackEvent(eventName: string, params?: Record<string, any>) {
    console.log(`Event tracked: ${eventName}`, params);
  }

  trackError(error: Error, context?: Record<string, any>) {
    console.error('Error tracked:', error, context);
  }
}