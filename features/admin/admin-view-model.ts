import { Observable } from '@nativescript/core';
import { AdminService } from '../../core/services/admin.service';

export class AdminViewModel extends Observable {
    private adminService: AdminService;
    private _users: Array<any> = [];
    private _bookings: Array<any> = [];
    private _popularDestinations: Array<any> = [];
    private _userSearchQuery: string = '';
    private _bookingSearchQuery: string = '';
    private _stats = {
        totalUsers: 0,
        totalBookings: 0,
        revenue: '$0',
        activeDeals: 0
    };

    constructor() {
        super();
        this.adminService = AdminService.getInstance();
        this.loadDashboardData();
    }

    async loadDashboardData() {
        try {
            const [users, bookings, stats, destinations] = await Promise.all([
                this.adminService.getUsers(),
                this.adminService.getBookings(),
                this.adminService.getStats(),
                this.adminService.getPopularDestinations()
            ]);

            this.users = users;
            this.bookings = bookings;
            this.popularDestinations = destinations;
            this.stats = stats;
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    get users(): Array<any> {
        return this._users;
    }

    set users(value: Array<any>) {
        if (this._users !== value) {
            this._users = value;
            this.notifyPropertyChange('users', value);
        }
    }

    get bookings(): Array<any> {
        return this._bookings;
    }

    set bookings(value: Array<any>) {
        if (this._bookings !== value) {
            this._bookings = value;
            this.notifyPropertyChange('bookings', value);
        }
    }

    get popularDestinations(): Array<any> {
        return this._popularDestinations;
    }

    set popularDestinations(value: Array<any>) {
        if (this._popularDestinations !== value) {
            this._popularDestinations = value;
            this.notifyPropertyChange('popularDestinations', value);
        }
    }

    get stats() {
        return this._stats;
    }

    set stats(value) {
        this._stats = value;
        this.notifyPropertyChange('totalUsers', value.totalUsers);
        this.notifyPropertyChange('totalBookings', value.totalBookings);
        this.notifyPropertyChange('revenue', value.revenue);
        this.notifyPropertyChange('activeDeals', value.activeDeals);
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

    getStatusColor(status: string): string {
        const colors = {
            confirmed: '#22c55e',
            pending: '#eab308',
            cancelled: '#ef4444'
        };
        return colors[status] || '#6b7280';
    }

    async onManageUser(args: any) {
        const user = args.object.bindingContext;
        // Navigate to user management page
    }

    async onBookingDetails(args: any) {
        const booking = args.object.bindingContext;
        // Navigate to booking details page
    }

    async onManageDestinations() {
        // Navigate to destinations management page
    }

    async onManageDeals() {
        // Navigate to deals management page
    }

    async onManageFeatured() {
        // Navigate to featured content management page
    }
}