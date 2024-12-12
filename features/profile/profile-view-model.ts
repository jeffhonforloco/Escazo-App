import { Observable } from '@nativescript/core';
import { AuthService } from '../../core/services/auth.service';

export class ProfileViewModel extends Observable {
    private _profileImage: string;
    private _fullName: string;
    private _email: string;
    private authService: AuthService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.loadUserProfile();
    }

    get profileImage(): string {
        return this._profileImage;
    }

    get fullName(): string {
        return this._fullName;
    }

    get email(): string {
        return this._email;
    }

    async loadUserProfile() {
        try {
            const user = await this.authService.getCurrentUser();
            this._profileImage = user.profileImage;
            this._fullName = user.fullName;
            this._email = user.email;
            this.notifyPropertyChange('profileImage', this._profileImage);
            this.notifyPropertyChange('fullName', this._fullName);
            this.notifyPropertyChange('email', this._email);
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    onBookingsTap() {
        // Navigate to bookings
    }

    onSavedPlacesTap() {
        // Navigate to saved places
    }

    onSettingsTap() {
        // Navigate to settings
    }

    onSupportTap() {
        // Navigate to support
    }

    async onSignOutTap() {
        try {
            await this.authService.logout();
            // Navigate to login page
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
}