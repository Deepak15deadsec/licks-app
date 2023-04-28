import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../more/profile'
import Search from '../search'
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Month from './month';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator

    >
      <Tab.Screen name="Month" component={Month} />
      <Tab.Screen name="Home" component={Search} />


    </Tab.Navigator>
  );
};



export default TabNavigator;