import { format, parseISO } from 'date-fns';

export const DateUtils = {
  formatDate(date: string | Date, formatString: string = 'MMM dd, yyyy'): string {
    if (!date) return '';
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, formatString);
  },

  formatDateTime(date: string | Date): string {
    if (!date) return '';
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'MMM dd, yyyy HH:mm');
  },

  formatTime(date: string | Date): string {
    if (!date) return '';
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'HH:mm');
  }
};