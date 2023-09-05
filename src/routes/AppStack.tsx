import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Pageone, Pagethree, Pagetwo, Taskone, Tasktwo } from '../screens/licks';
import { Intro } from '../screens/intro';




const Stack = createStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            {/* <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Pageone" component={Pageone} />
            <Stack.Screen name="Pagetwo" component={Pagetwo} />
            <Stack.Screen name="Pagethree" component={Pagethree} />
            <Stack.Screen name="Taskone" component={Taskone} /> */}
            <Stack.Screen name="Tasktwo" component={Tasktwo} />
        </Stack.Navigator>
    );
};
