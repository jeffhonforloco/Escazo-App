import { Observable } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';

export class NotificationService extends Observable {
    private static instance: NotificationService;

    private constructor() {
        super();
        this.initialize();
    }

    static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    private async initialize() {
        try {
            await LocalNotifications.requestPermission();
        } catch (error) {
            console.error('Failed to initialize notifications:', error);
        }
    }

    async scheduleNotification(options: {
        title: string;
        body: string;
        id?: number;
        at?: Date;
    }) {
        try {
            await LocalNotifications.schedule([{
                id: options.id || Date.now(),
                title: options.title,
                body: options.body,
                at: options.at || new Date(),
                forceShowWhenInForeground: true
            }]);
        } catch (error) {
            console.error('Failed to schedule notification:', error);
        }
    }
}