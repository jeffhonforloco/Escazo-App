import { Observable } from '@nativescript/core';
import { HttpClient } from '../../../core/services/http.client';

export class UserBookingsViewModel extends Observable {
    private _upcomingBookings: Array<any> = [];
    private _pastBookings: Array<any> = [];

    constructor() {
        super();
        this.loadBookings();
    }

    async loadBookings() {
        try {
            const [upcoming, past] = await Promise.all([
                HttpClient.get('/bookings/upcoming'),
                HttpClient.get('/bookings/past')
            ]);
            
            this.upcomingBookings = upcoming.data;
            this.pastBookings = past.data;
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    }

    getBookingIcon(type: string): string {
        const icons = {
            flight: '✈️',
            hotel: '🏨',
            car: '🚗',
            ride: '🚕',
            stay: '🏠'
        };
        return icons[type] || '📋';
    }

    onViewBooking(args: any) {
        const booking = args.object.bindingContext;
        // Navigate to booking details
    }

    onReviewBooking(args: any) {
        const booking = args.object.bindingContext;
        // Navigate to review page
    }

    // Getters and setters for bookings
    get upcomingBookings(): Array<any> {
        return this._upcomingBookings;
    }

    set upcomingBookings(value: Array<any>) {
        this._upcomingBookings = value;
        this.notifyPropertyChange('upcomingBookings', value);
    }

    get pastBookings(): Array<any> {
        return this._pastBookings;
    }

    set pastBookings(value: Array<any>) {
        this._pastBookings = value;
        this.notifyPropertyChange('pastBookings', value);
    }
}