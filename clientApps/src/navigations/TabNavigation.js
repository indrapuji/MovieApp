import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator, WatchlistStackNavigator } from '@navigations/StackNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => <Icon name="film" color={focused ? 'red' : 'grey'} size={15} />,
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistStackNavigator}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarIcon: ({ focused, color, size }) => <Icon name="heart" color={focused ? 'red' : 'grey'} size={15} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
