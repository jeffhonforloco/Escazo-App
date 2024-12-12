import { Frame } from '@nativescript/core';

export class NavigationService {
    private static instance: NavigationService;

    private constructor() {}

    static getInstance(): NavigationService {
        if (!NavigationService.instance) {
            NavigationService.instance = new NavigationService();
        }
        return NavigationService.instance;
    }

    navigateTo(page: string, options?: any) {
        const frame = Frame.topmost();
        frame.navigate({
            moduleName: `features/${page}/${page}-page`,
            ...options
        });
    }

    goBack() {
        const frame = Frame.topmost();
        frame.goBack();
    }
}