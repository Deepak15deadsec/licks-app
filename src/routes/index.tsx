import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../hooks/auth';
import Loading from '../components/Loading';

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
  const {authenticate, loading} = useAuth();
  console.log("auth",authenticate)

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer theme={theme} linking={LinkingConfig}>
      {authenticate ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};