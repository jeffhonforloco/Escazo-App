import { ApplicationSettings } from '@nativescript/core';

export class StorageUtils {
    static setString(key: string, value: string): void {
        ApplicationSettings.setString(key, value);
    }

    static getString(key: string, defaultValue: string = ''): string {
        return ApplicationSettings.getString(key, defaultValue);
    }

    static setNumber(key: string, value: number): void {
        ApplicationSettings.setNumber(key, value);
    }

    static getNumber(key: string, defaultValue: number = 0): number {
        return ApplicationSettings.getNumber(key, defaultValue);
    }

    static setBoolean(key: string, value: boolean): void {
        ApplicationSettings.setBoolean(key, value);
    }

    static getBoolean(key: string, defaultValue: boolean = false): boolean {
        return ApplicationSettings.getBoolean(key, defaultValue);
    }

    static remove(key: string): void {
        ApplicationSettings.remove(key);
    }

    static clear(): void {
        ApplicationSettings.clear();
    }

    static getAllKeys(): Array<string> {
        return ApplicationSettings.getAllKeys();
    }
}