import { format, parseISO, isValid } from 'date-fns';

export class DateUtils {
    static formatDate(date: string | Date, formatString: string = 'MMM dd, yyyy'): string {
        if (!date) return '';
        
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        if (!isValid(parsedDate)) return '';
        
        return format(parsedDate, formatString);
    }

    static formatDateTime(date: string | Date): string {
        return this.formatDate(date, 'MMM dd, yyyy HH:mm');
    }

    static formatTime(date: string | Date): string {
        return this.formatDate(date, 'HH:mm');
    }

    static isValidDate(date: any): boolean {
        if (!date) return false;
        const parsedDate = new Date(date);
        return isValid(parsedDate);
    }
}