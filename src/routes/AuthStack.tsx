import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Phone, Verify, Language, Signup, Mail} from '../screens/auth';
import {Intro} from '../screens/intro';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Phone" component={Phone} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="Mailid" component={Mail} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
