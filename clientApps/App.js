/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@store';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '@navigations/TabNavigation';
import { AuthStackNavigator } from '@navigations/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [authLoggedIn, setAuthLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setAuthLoggedIn(true);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <Provider store={store}>
      <NavigationContainer>{authLoggedIn ? <BottomTabNavigator /> : <AuthStackNavigator />}</NavigationContainer>
    </Provider>
  );
};

export default App;
