import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Creatordrop, Dropped, Drops, Home, Pageone, Pagethree, Pagetwo, Taskone, Tasktwo, Trade } from '../screens/licks';
import { Intro } from '../screens/intro';
import { BottomNavigation } from '../navigation';




const Stack = createStackNavigator();



export const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
                    
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Licks" component={BottomNavigation} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Pageone" component={Pageone} />
            <Stack.Screen name="Pagetwo" component={Pagetwo} />
            <Stack.Screen name="Pagethree" component={Pagethree} />
            <Stack.Screen name="Taskone" component={Taskone} />
            <Stack.Screen name="Tasktwo" component={Tasktwo} />
            <Stack.Screen name="Drop" component={Drops} />
            <Stack.Screen name="Trade" component={Trade} />
            <Stack.Screen name="Createdrop" component={Creatordrop} />
            <Stack.Screen name="Dropped" component={Dropped} />
        </Stack.Navigator>
    );
};
