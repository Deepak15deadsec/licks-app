import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
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

const LinkingConfig: any = {
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
  const isAuthenticated = useStoreState(store => store.isAuthenticated);
  const setIsMailAttached = useStoreActions(store => store.setIsMailAttached);
  const setArtCoin = useStoreActions(store => store.setArtCoin);
  const {token} = useAuth();

  useEffect(() => {
    console.log('token1', token);

    const handleDeepLink = async (token: string) => {
      let responseData;
      try {
        console.log('token', token);
        responseData = await getRequest(`${SERVER_BASE_URL}/oauth/me`, token);
      } catch (error) {
        console.log(error);
      } finally {
        setArtCoin(responseData.artCount);
        setIsMailAttached(true);
      }
    };

    const subscription = Linking.addEventListener(
      'url',
      () => token && handleDeepLink(token),
    );

    return () => {
      subscription.remove();
    };
  }, [token]);

  return (
    <NavigationContainer theme={theme} linking={LinkingConfig}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
