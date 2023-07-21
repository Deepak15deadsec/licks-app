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
    console.log("token", token);
    const handleDeepLink = async (token: string) => {
      try {
        const responseData = await getRequest(
          `${SERVER_BASE_URL}/oauth/me`,
          token,
        );
        setArtCoin(responseData.artCount);
        setIsMailAttached(true);
      } catch (error) {
        console.log(error);
      }
    };

    const handleUrl = ({url}: {url: string}) => {
      if (token) {
        handleDeepLink(token);
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      subscription.remove();
    };
  }, [token, isAuthenticated]);

  return (
    <NavigationContainer theme={theme} linking={LinkingConfig}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
