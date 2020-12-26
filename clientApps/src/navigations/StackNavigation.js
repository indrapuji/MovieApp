import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@screens/HomeScreen';
import WelcomeScreen from '@screens/WelcomeScreen';
import DetailScreen from '@screens/DetailScreen';
import SplashScreen from '@screens/SplashScreen';
import SplashScreen2 from '@screens/SplashScreen2';
import ContentScreen from '@screens/ContentScreen';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import WatchlistScreen from '@screens/WatchlistScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Splash2" component={SplashScreen2} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Content" component={ContentScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: null, headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Content" component={ContentScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: null, headerShown: false }} />
    </Stack.Navigator>
  );
};

const ContentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Content" component={ContentScreen} options={{ title: null, headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: null, headerShown: false }} />
    </Stack.Navigator>
  );
};

const WatchlistStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Watchlist" component={WatchlistScreen} options={{ title: null, headerShown: false }} />
    </Stack.Navigator>
  );
};

export { AuthStackNavigator, MainStackNavigator, WatchlistStackNavigator, ContentStackNavigator };
