import { Observable } from '@nativescript/core';
import { HttpClient } from '../../core/services/http.client';

export class SearchViewModel extends Observable {
    private _destinations: Array<any>;

    constructor() {
        super();
        this._destinations = [];
        this.loadDestinations();
    }

    get destinations(): Array<any> {
        return this._destinations;
    }

    set destinations(value: Array<any>) {
        if (this._destinations !== value) {
            this._destinations = value;
            this.notifyPropertyChange('destinations', value);
        }
    }

    async loadDestinations() {
        try {
            const response = await HttpClient.get('/destinations/trending');
            this.destinations = response.data;
        } catch (error) {
            console.error('Error loading destinations:', error);
        }
    }

    onFlightsTap() {
        // Navigate to flights search
    }

    onHotelsTap() {
        // Navigate to hotels search
    }

    onCarsTap() {
        // Navigate to car rentals search
    }

    onRidesTap() {
        // Navigate to ride-share search
    }

    onStaysTap() {
        // Navigate to short stays search
    }

    onExploreTap() {
        // Navigate to explore page
    }
}