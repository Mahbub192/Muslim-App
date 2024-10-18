import React, { useEffect, useRef, useState } from 'react';
import { View, AppState, AppStateStatus, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollViewWithoutImage from '@/components/ParallaxScrollViewWithoutImage';

const LOCATION_TASK_NAME = 'background-location-task';

// Define the background task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const location = locations[0];
    if (location) {
      console.log('Background location:', location.coords);
      const isAttending = checkAttendance(location.coords.latitude, location.coords.longitude);
      console.log(`Background Attendance Check: Student is ${isAttending ? 'attending' : 'not attending'}`);
    }
  }
});

// Function to calculate distance between two coordinates
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

// Function to check attendance
const checkAttendance = (latitude: number, longitude: number) => {
  const schoolLatitude = 23.810331;
  const schoolLongitude = 90.412521;
  const distance = calculateDistance(latitude, longitude, schoolLatitude, schoolLongitude);
  const isAttending = distance < 500; // Consider present if within 500 meters

  console.log(`Attendance Check: Student is ${isAttending ? 'present at' : 'absent from'} the school. Distance: ${distance.toFixed(2)} meters`);
  return isAttending;
};

const locationAuthentication: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [isAttending, setIsAttending] = useState(false);
  const appState = useRef(AppState.currentState);
  const attendanceInterval = useRef<NodeJS.Timeout | null>(null);

  const startAttendanceCheck = () => {
    if (attendanceInterval.current) {
      clearInterval(attendanceInterval.current);
    }
    attendanceInterval.current = setInterval(async () => {
      try {
        const location = await Location.getCurrentPositionAsync({});
        const attending = checkAttendance(location.coords.latitude, location.coords.longitude);
        setIsAttending(attending);
      } catch (error) {
        console.error('Error checking attendance:', error);
      }
    }, 2000);
  };

  const stopAttendanceCheck = () => {
    if (attendanceInterval.current) {
      clearInterval(attendanceInterval.current);
      attendanceInterval.current = null;
    }
  };

  useEffect(() => {
    const startBackgroundTracking = async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== 'granted') {
        console.log('Foreground location permission denied');
        return;
      }

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        console.log('Background location permission denied');
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 60000, // 1 minute
        distanceInterval: 100, // 100 meters
        foregroundService: {
          notificationTitle: 'Location Tracking',
          notificationBody: 'Tracking your location for attendance',
        },
        // iOS specific
        activityType: Location.ActivityType.OtherNavigation,
        showsBackgroundLocationIndicator: true,
      });

      setIsTracking(true);
      console.log('Background location tracking started');
    };

    const stopBackgroundTracking = async () => {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      setIsTracking(false);
      console.log('Background location tracking stopped');
    };

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        await startBackgroundTracking();
        startAttendanceCheck();
      } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('App has gone to the background!');
        stopAttendanceCheck();
        // Log the current attendance status when going to background
        const location = await Location.getCurrentPositionAsync({});
        const attending = checkAttendance(location.coords.latitude, location.coords.longitude);
        console.log(`App going to background - Attendance status: Student is ${attending ? 'attending' : 'not attending'}`);
      }

      appState.current = nextAppState;
    };

    startBackgroundTracking();
    startAttendanceCheck();
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      stopBackgroundTracking();
      stopAttendanceCheck();
      subscription.remove();
    };
  }, []);

  return (
    <ParallaxScrollViewWithoutImage>
      <View style={styles.container}>
        <ThemedText style={styles.text}>
          Background Location Tracking: {isTracking ? 'Active' : 'Inactive'}
        </ThemedText>
        <ThemedText style={styles.text}>
          Student is currently: {isAttending ? 'Attending' : 'Not Attending'}
        </ThemedText>
      </View>
    </ParallaxScrollViewWithoutImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default locationAuthentication;