import { Button } from '@nativescript/core';

export class SocialAuthButton extends Button {
    constructor(provider: 'google' | 'apple' | 'facebook') {
        super();
        
        this.className = `
            btn btn-outline w-full flex items-center justify-center
            ${this.getProviderStyles(provider)}
        `;
    }

    private getProviderStyles(provider: string): string {
        switch (provider) {
            case 'google':
                return 'border-gray-300 text-gray-700';
            case 'apple':
                return 'bg-black text-white border-black';
            case 'facebook':
                return 'bg-blue-600 text-white border-blue-600';
            default:
                return '';
        }
    }
}