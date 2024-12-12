import { Observable } from '@nativescript/core';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { ValidationUtils } from '../../../core/utils/validation.utils';

export class RegisterViewModel extends Observable {
    private _firstName: string = '';
    private _lastName: string = '';
    private _email: string = '';
    private _phoneNumber: string = '';
    private _password: string = '';
    private _confirmPassword: string = '';
    private _isLoading: boolean = false;
    private _errors: string[] = [];

    private authService: AuthService;
    private navigationService: NavigationService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.navigationService = NavigationService.getInstance();
    }

    // Getters and setters for all fields...

    async onRegister() {
        if (!this.validateForm()) {
            return;
        }

        this.isLoading = true;
        try {
            await this.authService.register({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                password: this.password
            });
            this.navigationService.navigate('features/home/home-page');
        } catch (error) {
            console.error('Registration failed:', error);
            // Show error dialog
        } finally {
            this.isLoading = false;
        }
    }

    private validateForm(): boolean {
        this._errors = [];

        if (!this.firstName) {
            this._errors.push('First name is required');
        }

        if (!this.lastName) {
            this._errors.push('Last name is required');
        }

        if (!this.email || !ValidationUtils.isValidEmail(this.email)) {
            this._errors.push('Valid email is required');
        }

        if (!this.phoneNumber || !ValidationUtils.isValidPhoneNumber(this.phoneNumber)) {
            this._errors.push('Valid phone number is required');
        }

        if (!this.password || !ValidationUtils.isValidPassword(this.password)) {
            this._errors.push('Password must be at least 8 characters');
        }

        if (this.password !== this.confirmPassword) {
            this._errors.push('Passwords do not match');
        }

        return this._errors.length === 0;
    }

    onSignIn() {
        this.navigationService.navigate('features/auth/login/login-page');
    }
}