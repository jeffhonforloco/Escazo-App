import { Observable } from '@nativescript/core';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationService } from '../../../core/services/navigation.service';

export class LoginViewModel extends Observable {
    private _email: string = '';
    private _password: string = '';
    private _isLoading: boolean = false;
    private authService: AuthService;
    private navigationService: NavigationService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.navigationService = NavigationService.getInstance();
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
        if (!this.email || !this.password) {
            // Show validation error
            return;
        }

        this.isLoading = true;
        try {
            const success = await this.authService.login(this.email, this.password);
            if (success) {
                this.navigationService.navigate('features/home/home-page');
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Show error message
        } finally {
            this.isLoading = false;
        }
    }

    onForgotPassword() {
        this.navigationService.navigate('features/auth/forgot-password/forgot-password-page');
    }

    onCreateAccount() {
        this.navigationService.navigate('features/auth/register/register-page');
    }
}