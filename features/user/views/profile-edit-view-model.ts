import { Observable } from '@nativescript/core';
import { UserService } from '../services/user.service';
import { UserProfile } from '../models/user.model';

export class ProfileEditViewModel extends Observable {
    private userService: UserService;
    private _profile: UserProfile;
    private _seatPreferences = ['Window', 'Aisle', 'No Preference'];

    constructor() {
        super();
        this.userService = UserService.getInstance();
        this.loadProfile();
    }

    async loadProfile() {
        try {
            this._profile = await this.userService.getCurrentUser();
            this.updateObservables();
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }

    private updateObservables() {
        Object.keys(this._profile).forEach(key => {
            this.notifyPropertyChange(key, this._profile[key]);
        });
    }

    async onSave() {
        try {
            const updatedProfile = await this.userService.updateProfile({
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber,
                preferences: {
                    notifications: this.notifications,
                    theme: this.darkTheme ? 'dark' : 'light'
                },
                travelPreferences: {
                    seatPreference: this.seatPreferences[this.selectedSeatPreference],
                    preferredAirlines: this.preferredAirlines.split(',').map(a => a.trim()),
                    preferredHotelChains: this.preferredHotelChains.split(',').map(h => h.trim())
                }
            });
            this._profile = updatedProfile;
            // Navigate back
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    }

    async onChangePhoto() {
        // Implement photo selection and upload
    }

    get seatPreferences(): string[] {
        return this._seatPreferences;
    }

    // Getters and setters for all profile fields
    get firstName(): string {
        return this._profile.firstName;
    }

    set firstName(value: string) {
        if (this._profile.firstName !== value) {
            this._profile.firstName = value;
            this.notifyPropertyChange('firstName', value);
        }
    }

    // Add similar getters and setters for other profile fields
}