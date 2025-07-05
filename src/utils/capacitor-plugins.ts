import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics } from '@capacitor/haptics';
import { StatusBar } from '@capacitor/status-bar';
import { PushNotifications } from '@capacitor/push-notifications';

// Initialize and export Capacitor plugins
export const initializeCapacitorPlugins = async () => {
  if (!Capacitor.isNativePlatform()) {
    console.log('Not running on a native platform, skipping Capacitor plugin initialization');
    return;
  }

  try {
    console.log('Initializing Capacitor plugins...');
    
    // Request permissions
    await Geolocation.requestPermissions();
    await Camera.requestPermissions();
    await LocalNotifications.requestPermissions();
    
    // Set up push notifications
    await PushNotifications.requestPermissions();
    await PushNotifications.register();
    
    // Set up status bar
    if (Capacitor.getPlatform() === 'android') {
      StatusBar.setBackgroundColor({ color: '#2563eb' });
    }
    
    console.log('Capacitor plugins initialized successfully');
  } catch (error) {
    console.error('Error initializing Capacitor plugins:', error);
  }
};

// Export plugins for direct use
export {
  Geolocation,
  Camera,
  Filesystem,
  Device,
  Network,
  LocalNotifications,
  Haptics,
  StatusBar,
  PushNotifications
};