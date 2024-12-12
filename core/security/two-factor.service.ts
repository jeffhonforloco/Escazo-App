import { Observable } from '@nativescript/core';
import { EncryptionService } from './encryption.service';
import { HttpClient } from '../services/http.client';

export class TwoFactorService extends Observable {
    private static instance: TwoFactorService;
    private encryptionService: EncryptionService;

    private constructor() {
        super();
        this.encryptionService = EncryptionService.getInstance();
    }

    static getInstance(): TwoFactorService {
        if (!TwoFactorService.instance) {
            TwoFactorService.instance = new TwoFactorService();
        }
        return TwoFactorService.instance;
    }

    async enableTwoFactor(userId: string): Promise<{ secret: string; qrCode: string }> {
        try {
            const response = await HttpClient.post('/auth/2fa/enable', { userId });
            return {
                secret: response.data.secret,
                qrCode: response.data.qrCode
            };
        } catch (error) {
            console.error('Failed to enable 2FA:', error);
            throw error;
        }
    }

    async verifyTwoFactor(code: string, secret: string): Promise<boolean> {
        try {
            const response = await HttpClient.post('/auth/2fa/verify', {
                code,
                secret
            });
            return response.data.valid;
        } catch (error) {
            console.error('2FA verification failed:', error);
            throw error;
        }
    }

    async generateBackupCodes(userId: string): Promise<string[]> {
        try {
            const response = await HttpClient.post('/auth/2fa/backup-codes', { userId });
            return response.data.codes;
        } catch (error) {
            console.error('Failed to generate backup codes:', error);
            throw error;
        }
    }
}