import { Observable } from '@nativescript/core';
import { HttpClient } from '../../../core/services/http.client';
import { SocialShare } from '@nativescript/social-share';

export class TripSharingService extends Observable {
    private static instance: TripSharingService;

    private constructor() {
        super();
    }

    static getInstance(): TripSharingService {
        if (!TripSharingService.instance) {
            TripSharingService.instance = new TripSharingService();
        }
        return TripSharingService.instance;
    }

    async shareTrip(tripId: string, platform?: 'whatsapp' | 'facebook' | 'twitter') {
        try {
            const tripDetails = await this.getTripDetails(tripId);
            const shareText = this.formatTripForSharing(tripDetails);
            
            if (platform) {
                await this.shareToSpecificPlatform(platform, shareText, tripDetails.imageUrl);
            } else {
                await SocialShare.shareText(shareText);
            }
        } catch (error) {
            console.error('Failed to share trip:', error);
            throw error;
        }
    }

    async inviteFriends(tripId: string, emails: string[]) {
        try {
            await HttpClient.post('/trips/invite', {
                tripId,
                emails
            });
        } catch (error) {
            console.error('Failed to invite friends:', error);
            throw error;
        }
    }

    private async getTripDetails(tripId: string) {
        const response = await HttpClient.get(`/trips/${tripId}`);
        return response.data;
    }

    private formatTripForSharing(tripDetails: any): string {
        return `Join me on my trip to ${tripDetails.destination}!\n` +
               `Dates: ${tripDetails.startDate} - ${tripDetails.endDate}\n` +
               `Check it out on Escazo: ${tripDetails.shareUrl}`;
    }

    private async shareToSpecificPlatform(
        platform: string,
        text: string,
        imageUrl?: string
    ) {
        const shareOptions = {
            text,
            url: imageUrl,
            subject: 'Join my trip on Escazo!'
        };

        switch (platform) {
            case 'whatsapp':
                await SocialShare.shareTextWithWhatsapp(text);
                break;
            case 'facebook':
                await SocialShare.shareUrl(imageUrl || '', text, 'facebook');
                break;
            case 'twitter':
                await SocialShare.shareUrl(imageUrl || '', text, 'twitter');
                break;
        }
    }
}