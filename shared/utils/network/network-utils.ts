import { Connectivity } from '@nativescript/core';

export class NetworkUtils {
    static isConnected(): boolean {
        const connectionType = Connectivity.getConnectionType();
        return connectionType !== Connectivity.connectionType.none;
    }

    static isWifi(): boolean {
        return Connectivity.getConnectionType() === Connectivity.connectionType.wifi;
    }

    static isMobile(): boolean {
        const connectionType = Connectivity.getConnectionType();
        return connectionType === Connectivity.connectionType.mobile ||
               connectionType === Connectivity.connectionType.cellular;
    }

    static startMonitoring(callback: (isConnected: boolean) => void): void {
        Connectivity.startMonitoring((connectionType) => {
            const isConnected = connectionType !== Connectivity.connectionType.none;
            callback(isConnected);
        });
    }

    static stopMonitoring(): void {
        Connectivity.stopMonitoring();
    }
}