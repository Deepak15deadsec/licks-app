import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Home } from '../screens/licks';
import Pageone from '../screens/licks/ranveer/pageone';
import Pagetwo from '../screens/licks/ranveer/pagetwo';
import { Intro } from '../screens/intro';
import Pagethree from '../screens/licks/ranveer/pagethree';


const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
           {/* <Stack.Screen name="Intro" component={Intro} /> */}
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="Pageone" component={Pageone} />
           <Stack.Screen name="Pagetwo" component={Pagetwo} />
      <Stack.Screen name="Pagethree" component={Pagethree} />
      
    </Stack.Navigator>
  );
};
