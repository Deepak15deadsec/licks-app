import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../hooks/auth';
import Loading from '../components/Loading';
import { useStoreState } from '../store/easy-peasy/hooks';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

export const LinkingConfig: any = {
  prefixes: ['https://app.avni.club'],
  config: {
    screens: {
      Avni: {
        screens: {
          Home: 'home',
        },
      },
    },
  },
};

export const Router = () => {
  const isAuthenticated = useStoreState(store => store.isAuthenticated)
  return (
    <NavigationContainer theme={theme} linking={LinkingConfig}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
