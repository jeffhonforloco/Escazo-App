import { Observable } from '@nativescript/core';
import { Toast } from '../../shared/components/ui/toast';

export class ErrorService extends Observable {
    private static instance: ErrorService;

    private constructor() {
        super();
    }

    static getInstance(): ErrorService {
        if (!ErrorService.instance) {
            ErrorService.instance = new ErrorService();
        }
        return ErrorService.instance;
    }

    handleError(error: any) {
        console.error('Error occurred:', error);

        let message = 'An unexpected error occurred';
        
        if (error.response) {
            message = error.response.data.message || message;
        } else if (error.message) {
            message = error.message;
        }

        // Show error toast
        const toast = new Toast(message, 'error');
        toast.show();

        // Track error for analytics
        if (config.environment !== 'development') {
            // Send to error tracking service
        }
    }
}