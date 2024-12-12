import { Observable } from '@nativescript/core';
import { Biometrics } from '@nativescript/biometrics';

export class BiometricService extends Observable {
    private static instance: BiometricService;
    private biometrics: Biometrics;

    private constructor() {
        super();
        this.biometrics = new Biometrics();
    }

    static getInstance(): BiometricService {
        if (!BiometricService.instance) {
            BiometricService.instance = new BiometricService();
        }
        return BiometricService.instance;
    }

    async isBiometricAvailable(): Promise<boolean> {
        try {
            const result = await this.biometrics.available();
            return result.biometricType !== 'none';
        } catch (error) {
            console.error('Biometric availability check failed:', error);
            return false;
        }
    }

    async authenticate(message: string = 'Verify your identity'): Promise<boolean> {
        try {
            const result = await this.biometrics.verifyFingerprint({
                message,
                fallbackMessage: 'Use PIN instead'
            });
            return result.code === 0;
        } catch (error) {
            console.error('Biometric authentication failed:', error);
            return false;
        }
    }
}