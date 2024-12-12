import { Observable } from '@nativescript/core';
import { HttpClient } from './http.client';
import { User, UserPreferences } from '../models/user.model';

export class UserService extends Observable {
    private static instance: UserService;
    private currentUser: User | null = null;

    private constructor() {
        super();
    }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getCurrentUser(): Promise<User | null> {
        if (!this.currentUser) {
            try {
                const response = await HttpClient.get('/user/profile');
                this.currentUser = response.data;
            } catch (error) {
                console.error('Error fetching user profile:', error);
                return null;
            }
        }
        return this.currentUser;
    }

    async updateProfile(userData: Partial<User>): Promise<User> {
        try {
            const response = await HttpClient.put('/user/profile', userData);
            this.currentUser = response.data;
            return this.currentUser;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    async updatePreferences(preferences: Partial<UserPreferences>): Promise<User> {
        try {
            const response = await HttpClient.put('/user/preferences', preferences);
            this.currentUser = response.data;
            return this.currentUser;
        } catch (error) {
            console.error('Error updating user preferences:', error);
            throw error;
        }
    }

    async uploadProfileImage(imageFile: any): Promise<string> {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            const response = await HttpClient.post('/user/profile/image', formData);
            return response.data.imageUrl;
        } catch (error) {
            console.error('Error uploading profile image:', error);
            throw error;
        }
    }

    clearCurrentUser(): void {
        this.currentUser = null;
    }
}