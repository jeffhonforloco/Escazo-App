import axios, { AxiosInstance } from 'axios';
import { config } from '../config/config';
import { AuthService } from './auth.service';
import { NetworkUtils } from '../utils/network/network-utils';

export class ApiService {
    private static instance: ApiService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: config.apiUrl,
            timeout: config.api.timeout,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.setupInterceptors();
    }

    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                if (!NetworkUtils.isConnected()) {
                    throw new Error('No internet connection');
                }

                const token = await AuthService.getInstance().getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    await AuthService.getInstance().logout();
                }
                return Promise.reject(error);
            }
        );
    }

    // API methods for different features
    async searchFlights(params: any) {
        return this.axiosInstance.get('/flights/search', { params });
    }

    async searchHotels(params: any) {
        return this.axiosInstance.get('/hotels/search', { params });
    }

    async createBooking(bookingData: any) {
        return this.axiosInstance.post('/bookings', bookingData);
    }

    async getBookings() {
        return this.axiosInstance.get('/bookings');
    }

    async generateTripPlan(params: any) {
        return this.axiosInstance.post('/ai/trip-plan', params);
    }
}