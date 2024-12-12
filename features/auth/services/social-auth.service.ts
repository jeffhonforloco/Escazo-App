import { Observable } from '@nativescript/core';
import { AuthService } from '../../../core/services/auth.service';

export class SocialAuthService extends Observable {
    private static instance: SocialAuthService;
    private authService: AuthService;

    private constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    static getInstance(): SocialAuthService {
        if (!SocialAuthService.instance) {
            SocialAuthService.instance = new SocialAuthService();
        }
        return SocialAuthService.instance;
    }

    async googleSignIn() {
        try {
            // Implement Google Sign In logic
            const result = await this.authService.socialLogin('google');
            return result;
        } catch (error) {
            console.error('Google sign in failed:', error);
            throw error;
        }
    }

    async appleSignIn() {
        try {
            // Implement Apple Sign In logic
            const result = await this.authService.socialLogin('apple');
            return result;
        } catch (error) {
            console.error('Apple sign in failed:', error);
            throw error;
        }
    }

    async facebookSignIn() {
        try {
            // Implement Facebook Sign In logic
            const result = await this.authService.socialLogin('facebook');
            return result;
        } catch (error) {
            console.error('Facebook sign in failed:', error);
            throw error;
        }
    }
}