import { NavigatedData, Page } from '@nativescript/core';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationService } from '../../../core/services/navigation.service';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const authService = AuthService.getInstance();
    const navigationService = NavigationService.getInstance();

    setTimeout(async () => {
        try {
            const isAuthenticated = await authService.isAuthenticated();
            if (isAuthenticated) {
                navigationService.navigate('features/home/home-page');
            } else {
                navigationService.navigate('features/auth/welcome/welcome-page');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            navigationService.navigate('features/auth/welcome/welcome-page');
        }
    }, 2000);
}