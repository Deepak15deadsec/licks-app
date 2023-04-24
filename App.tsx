import React, { useEffect } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Phone, Verify, Language, Signup } from './src/screens/auth';
import { Intro } from './src/screens/intro'
import { Detail } from './src/screens/avni';
import { BottomNavigation } from './src/navigation';
import { useStoreState } from 'easy-peasy';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import 'react-native-reanimated'
import 'react-native-gesture-handler'


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createSharedElementStackNavigator();

const App = () => {
  const authenticate = useStoreState((state: any) => state.authenticate);

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Intro'}
      >
        {authenticate ? (
          <>
            <Stack.Screen name="avni" component={BottomNavigation} />
            <Stack.Screen
              name="Detail"
              component={Detail}
              sharedElements={(route, otherRoute, showing) => {
                const { id } = route.params;
                return [
                  {
                    id: `banner${id}`,
                    animation: 'fade',
                  },
                ];
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="Phone" component={Phone} />
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
