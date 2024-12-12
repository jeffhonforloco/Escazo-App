import { Observable } from '@nativescript/core';

export class FeaturedDestinations extends Observable {
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

    get destinations() {
        return this._destinations;
    }

    onDestinationTap(args: any) {
        const destination = args.object.bindingContext;
        // Navigate to destination details
        console.log('Selected destination:', destination.name);
    }
}