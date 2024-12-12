import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '../config/api.config';
import { AuthService } from './auth.service';

export class HttpClient {
    private static instance: AxiosInstance;
    private static retryCount = API_CONFIG.RETRY_ATTEMPTS;
    private static retryDelay = 1000;

    static getInstance(): AxiosInstance {
        if (!HttpClient.instance) {
            HttpClient.instance = axios.create({
                baseURL: API_CONFIG.BASE_URL,
                timeout: API_CONFIG.TIMEOUT,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            this.setupInterceptors();
        }
        return HttpClient.instance;
    }

    private static setupInterceptors(): void {
        HttpClient.instance.interceptors.request.use(
            (config) => {
                const token = AuthService.getInstance().getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        HttpClient.instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const config = error.config;
                
                if (error.response?.status === 401) {
                    AuthService.getInstance().logout();
                    return Promise.reject(error);
                }

                if (!config || !config.retry) {
                    config.retry = 0;
                }

                if (config.retry >= HttpClient.retryCount) {
                    return Promise.reject(error);
                }

                config.retry += 1;
                await new Promise(resolve => setTimeout(resolve, HttpClient.retryDelay));
                return HttpClient.instance(config);
            }
        );
    }
}