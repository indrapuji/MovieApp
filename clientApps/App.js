/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from '@store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@screens/HomeScreen';
import DetailScreen from '@screens/DetailScreen';
import SplashScreen from '@screens/SplashScreen';
import SplashScreen2 from '@screens/SplashScreen2';
import ContentScreen from '@screens/ContentScreen';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ title: null, headerShown: false }} />
          <Stack.Screen name="Splash2" component={SplashScreen2} options={{ title: null, headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: null, headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: null, headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: null, headerShown: false }} />
          <Stack.Screen name="Content" component={ContentScreen} options={{ title: null, headerShown: false }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: null, headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
