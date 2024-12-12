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

    navigate(path: string, options?: any) {
        const frame = Frame.topmost();
        frame.navigate({
            moduleName: path,
            ...options
        });
    }

    goBack() {
        const frame = Frame.topmost();
        frame.goBack();
    }
}