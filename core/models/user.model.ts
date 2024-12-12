export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
    phoneNumber?: string;
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPreferences {
    currency: string;
    language: string;
    notifications: NotificationPreferences;
    travelPreferences: TravelPreferences;
}

export interface NotificationPreferences {
    email: boolean;
    push: boolean;
    deals: boolean;
    bookingUpdates: boolean;
    travelAlerts: boolean;
}

export interface TravelPreferences {
    preferredAirlines: string[];
    preferredHotelChains: string[];
    seatPreference: 'window' | 'aisle' | 'no_preference';
    mealPreference?: string;
    accessibility?: string[];
}