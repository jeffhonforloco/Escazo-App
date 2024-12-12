import { HttpClient } from './http.client';

export class AdminService {
    private static instance: AdminService;

    private constructor() {}

    static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService();
        }
        return AdminService.instance;
    }

    async getUsers(params?: any): Promise<any[]> {
        try {
            const response = await HttpClient.get('/admin/users', params);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async getBookings(params?: any): Promise<any[]> {
        try {
            const response = await HttpClient.get('/admin/bookings', params);
            return response.data;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw error;
        }
    }

    async getStats(): Promise<any> {
        try {
            const response = await HttpClient.get('/admin/stats');
            return response.data;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }

    async getPopularDestinations(): Promise<any[]> {
        try {
            const response = await HttpClient.get('/admin/destinations/popular');
            return response.data;
        } catch (error) {
            console.error('Error fetching popular destinations:', error);
            throw error;
        }
    }

    async updateUser(userId: string, userData: any): Promise<any> {
        try {
            const response = await HttpClient.put(`/admin/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async updateBooking(bookingId: string, bookingData: any): Promise<any> {
        try {
            const response = await HttpClient.put(`/admin/bookings/${bookingId}`, bookingData);
            return response.data;
        } catch (error) {
            console.error('Error updating booking:', error);
            throw error;
        }
    }

    async createDeal(dealData: any): Promise<any> {
        try {
            const response = await HttpClient.post('/admin/deals', dealData);
            return response.data;
        } catch (error) {
            console.error('Error creating deal:', error);
            throw error;
        }
    }

    async updateDeal(dealId: string, dealData: any): Promise<any> {
        try {
            const response = await HttpClient.put(`/admin/deals/${dealId}`, dealData);
            return response.data;
        } catch (error) {
            console.error('Error updating deal:', error);
            throw error;
        }
    }

    async deleteDeal(dealId: string): Promise<void> {
        try {
            await HttpClient.delete(`/admin/deals/${dealId}`);
        } catch (error) {
            console.error('Error deleting deal:', error);
            throw error;
        }
    }
}