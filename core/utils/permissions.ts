import { isAndroid, isIOS, Application } from '@nativescript/core';

export class Permissions {
  static async requestLocationPermission(): Promise<boolean> {
    try {
      if (isAndroid) {
        const permissions = await this.requestAndroidPermissions([
          android.Manifest.permission.ACCESS_FINE_LOCATION,
          android.Manifest.permission.ACCESS_COARSE_LOCATION
        ]);
        return permissions.every(p => p === 'granted');
      } else if (isIOS) {
        const status = await CLLocationManager.authorizationStatus();
        return status === CLAuthorizationStatus.AuthorizedWhenInUse;
      }
      return false;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  private static async requestAndroidPermissions(permissions: string[]): Promise<string[]> {
    return Promise.all(
      permissions.map(permission =>
        Application.android.requestPermissions(permission)
      )
    );
  }
}