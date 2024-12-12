import { Observable } from '@nativescript/core';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationService } from '../../../core/services/navigation.service';

export class RegisterViewModel extends Observable {
    private _firstName: string = '';
    private _lastName: string = '';
    private _email: string = '';
    private _password: string = '';
    private _confirmPassword: string = '';
    private _isLoading: boolean = false;
    private authService: AuthService;
    private navigationService: NavigationService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.navigationService = NavigationService.getInstance();
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        if (this._firstName !== value) {
            this._firstName = value;
            this.notifyPropertyChange('firstName', value);
        }
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        if (this._lastName !== value) {
            this._lastName = value;
            this.notifyPropertyChange('lastName', value);
        }
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
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

    get confirmPassword(): string {
        return this._confirmPassword;
    }

    set confirmPassword(value: string) {
        if (this._confirmPassword !== value) {
            this._confirmPassword = value;
            this.notifyPropertyChange('confirmPassword', value);
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

    async onRegister() {
        if (!this.validateForm()) {
            return;
        }

        this.isLoading = true;
        try {
            const success = await this.authService.register({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            });
            if (success) {
                this.navigationService.navigate('features/home/home-page');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            // Show error message
        } finally {
            this.isLoading = false;
        }
    }

    private validateForm(): boolean {
        if (!this.firstName || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
            // Show validation error for empty fields
            return false;
        }

        if (this.password !== this.confirmPassword) {
            // Show validation error for password mismatch
            return false;
        }

        return true;
    }

    onSignIn() {
        this.navigationService.navigate('features/auth/login/login-page');
    }
}