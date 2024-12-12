import { Observable } from '@nativescript/core';

export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    profileImage?: string;
    preferences: {
        currency: string;
        language: string;
        notifications: boolean;
        theme: 'light' | 'dark';
    };
    travelPreferences: {
        seatPreference: 'window' | 'aisle' | 'no_preference';
        mealPreference?: string;
        preferredAirlines: string[];
        preferredHotelChains: string[];
    };
}

export class UserModel extends Observable {
    private _profile: UserProfile;

    constructor(profile: UserProfile) {
        super();
        this._profile = profile;
    }

    get profile(): UserProfile {
        return this._profile;
    }

    set profile(value: UserProfile) {
        this._profile = value;
        this.notifyPropertyChange('profile', value);
    }

    get fullName(): string {
        return `${this._profile.firstName} ${this._profile.lastName}`;
    }
}