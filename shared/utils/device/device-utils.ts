import { Device, Screen, isAndroid, isIOS } from '@nativescript/core';

export class DeviceUtils {
    static getDeviceInfo() {
        return {
            model: Device.model,
            type: Device.deviceType,
            os: Device.os,
            osVersion: Device.osVersion,
            sdkVersion: Device.sdkVersion,
            language: Device.language,
            manufacturer: Device.manufacturer,
            uuid: Device.uuid
        };
    }

    static getScreenInfo() {
        return {
            width: Screen.mainScreen.widthDIPs,
            height: Screen.mainScreen.heightDIPs,
            scale: Screen.mainScreen.scale,
            widthPixels: Screen.mainScreen.widthPixels,
            heightPixels: Screen.mainScreen.heightPixels
        };
    }

    static isTablet(): boolean {
        return Device.deviceType === 'Tablet';
    }

    static getPlatformSpecificValue<T>(androidValue: T, iOSValue: T): T {
        return isAndroid ? androidValue : iOSValue;
    }

    static getStatusBarHeight(): number {
        if (isAndroid) {
            const resourceId = android.content.res.Resources.getSystem().getIdentifier(
                'status_bar_height', 'dimen', 'android'
            );
            return android.content.res.Resources.getSystem().getDimensionPixelSize(resourceId) / Screen.mainScreen.scale;
        } else if (isIOS) {
            const window = UIApplication.sharedApplication.keyWindow;
            return window?.safeAreaInsets.top ?? 20;
        }
        return 20;
    }
}