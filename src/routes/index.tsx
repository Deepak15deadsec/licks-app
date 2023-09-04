import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack'
import {useAuth} from '../hooks/auth';
import Loading from '../components/Loading';
import {useStoreActions, useStoreState} from '../store/easy-peasy/hooks';
import {getRequest} from '../react-query';
import {Linking} from 'react-native';
//@ts-ignore
import {SERVER_BASE_URL} from '@env';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};



export const Router = () => {
  const isAuthenticated = useStoreState(store => store.isAuthenticated);
 
  return (
    <NavigationContainer theme={theme} >
      {isAuthenticated ? <AppStack /> : <AppStack />}
    </NavigationContainer>
  );
};
