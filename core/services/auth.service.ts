import { Observable } from '@nativescript/core';
import { HttpClient } from './http.client';

export class AuthService extends Observable {
    private static instance: AuthService;
    private token: string | null = null;

    private constructor() {
        super();
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await HttpClient.post('/auth/login', { email, password });
            this.token = response.data.token;
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    getToken(): string | null {
        return this.token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }
}