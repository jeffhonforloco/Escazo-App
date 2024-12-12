import { HttpClient } from '../../../core/services/http.client';
import { UserProfile } from '../models/user.model';

export class UserService {
    private static instance: UserService;
    private currentUser: UserProfile | null = null;

    private constructor() {}

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async getCurrentUser(): Promise<UserProfile> {
        if (!this.currentUser) {
            const response = await HttpClient.get('/user/profile');
            this.currentUser = response.data;
        }
        return this.currentUser;
    }

    async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
        const response = await HttpClient.put('/user/profile', data);
        this.currentUser = response.data;
        return this.currentUser;
    }

    async updatePreferences(preferences: any): Promise<UserProfile> {
        const response = await HttpClient.put('/user/preferences', preferences);
        this.currentUser = response.data;
        return this.currentUser;
    }

    async uploadProfileImage(imageFile: any): Promise<string> {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await HttpClient.post('/user/profile/image', formData);
        return response.data.imageUrl;
    }
}