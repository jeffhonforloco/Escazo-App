import { Observable } from '@nativescript/core';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { ValidationUtils } from '../../../core/utils/validation.utils';

export class LoginViewModel extends Observable {
    private _identifier: string = '';
    private _password: string = '';
    private _isLoading: boolean = false;
    private _errors: string[] = [];

    private authService: AuthService;
    private navigationService: NavigationService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.navigationService = NavigationService.getInstance();
    }

    get identifier(): string {
        return this._identifier;
    }

    set identifier(value: string) {
        if (this._identifier !== value) {
            this._identifier = value;
            this.notifyPropertyChange('identifier', value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    async onSignIn() {
        if (!this.validateForm()) {
            return;
        }

        this.isLoading = true;
        try {
            const isEmail = ValidationUtils.isValidEmail(this.identifier);
            const isPhone = ValidationUtils.isValidPhoneNumber(this.identifier);

            if (!isEmail && !isPhone) {
                throw new Error('Invalid email or phone number');
            }

            const loginType = isEmail ? 'email' : 'phone';
            await this.authService.login(this.identifier, this.password, loginType);
            this.navigationService.navigate('features/home/home-page');
        } catch (error) {
            console.error('Login failed:', error);
            // Show error dialog
        } finally {
            this.isLoading = false;
        }
    }

    private validateForm(): boolean {
        this._errors = [];

        if (!this.identifier) {
            this._errors.push('Email or phone number is required');
        }

        if (!this.password) {
            this._errors.push('Password is required');
        }

        return this._errors.length === 0;
    }

    onForgotPassword() {
        this.navigationService.navigate('features/auth/forgot-password/forgot-password-page');
    }

    onCreateAccount() {
        this.navigationService.navigate('features/auth/register/register-page');
    }

    async onGoogleSignIn() {
        // Implement Google Sign In
    }

    async onAppleSignIn() {
        // Implement Apple Sign In
    }
}