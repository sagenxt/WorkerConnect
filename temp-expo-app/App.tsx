import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageProvider } from './src/contexts/LanguageContext';

// Import existing screens
import LandingScreen from './src/screens/LandingScreen';
import WorkerLoginScreen from './src/screens/WorkerLoginScreen';
import WorkerDashboardScreen from './src/screens/WorkerDashboardScreen';
import RegistrationChoiceScreen from './src/screens/RegistrationChoiceScreen';
import WorkerRegistrationScreen from './src/screens/WorkerRegistrationScreen';
import EstablishmentRegistrationScreen from './src/screens/EstablishmentRegistrationScreen';
import EstablishmentLoginScreen from './src/screens/EstablishmentLoginScreen';
import EstablishmentDashboardScreen from './src/screens/EstablishmentDashboardScreen';
import DepartmentLoginScreen from './src/screens/DepartmentLoginScreen';
import DepartmentDashboardScreen from './src/screens/DepartmentDashboardScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import MobileDownloadScreen from './src/screens/MobileDownloadScreen';
import AttendanceHistoryScreen from './src/screens/AttendanceHistoryScreen';
import WorkerProfileScreen from './src/screens/WorkerProfileScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="RegistrationChoice" component={RegistrationChoiceScreen} />
          <Stack.Screen name="WorkerRegistration" component={WorkerRegistrationScreen} />
          <Stack.Screen name="EstablishmentRegistration" component={EstablishmentRegistrationScreen} />
          <Stack.Screen name="WorkerLogin" component={WorkerLoginScreen} />
          <Stack.Screen name="WorkerDashboard" component={WorkerDashboardScreen} />
          <Stack.Screen name="EstablishmentLogin" component={EstablishmentLoginScreen} />
          <Stack.Screen name="EstablishmentDashboard" component={EstablishmentDashboardScreen} />
          <Stack.Screen name="DepartmentLogin" component={DepartmentLoginScreen} />
          <Stack.Screen name="DepartmentDashboard" component={DepartmentDashboardScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="MobileDownload" component={MobileDownloadScreen} />
          <Stack.Screen name="AttendanceHistory" component={AttendanceHistoryScreen} />
          <Stack.Screen name="WorkerProfile" component={WorkerProfileScreen} />
          <Stack.Screen name="Attendance" component={AttendanceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
