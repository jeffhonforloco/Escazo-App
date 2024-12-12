import { Observable } from '@nativescript/core';
import { NavigationService } from '../../core/navigation/navigation.service';

export class HomeViewModel extends Observable {
    private _searchText: string = '';
    private _destinations = [
        {
            name: 'Paris',
            image: '~/assets/images/paris.jpg',
            price: 'From $699'
        },
        {
            name: 'Tokyo',
            image: '~/assets/images/tokyo.jpg',
            price: 'From $899'
        },
        {
            name: 'Bali',
            image: '~/assets/images/bali.jpg',
            price: 'From $599'
        }
    ];

    constructor() {
        super();
    }

    get searchText(): string {
        return this._searchText;
    }

    set searchText(value: string) {
        if (this._searchText !== value) {
            this._searchText = value;
            this.notifyPropertyChange('searchText', value);
        }
    }

    get destinations() {
        return this._destinations;
    }

    onFlightsTap() {
        NavigationService.getInstance().navigateTo('flights');
    }

    onHotelsTap() {
        NavigationService.getInstance().navigateTo('hotels');
    }

    onCarsTap() {
        NavigationService.getInstance().navigateTo('cars');
    }

    onRidesTap() {
        NavigationService.getInstance().navigateTo('rides');
    }

    onStaysTap() {
        NavigationService.getInstance().navigateTo('stays');
    }

    onAITripTap() {
        NavigationService.getInstance().navigateTo('ai-trip');
    }
}