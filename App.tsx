import React, {useCallback, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {Linking} from 'react-native';
import axios from 'axios';
import {useStoreActions} from './src/store/easy-peasy/hooks';
//@ts-ignore
import {SERVER_BASE_URL} from '@env';
import ReactQueryLoading from './src/react-query';
import {useAuth} from './src/hooks/auth';
import {Router} from './src/routes';

const App = () => {
  const setIsMailAttached = useStoreActions(store => store.setIsMailAttached);
  const setArtCoin = useStoreActions(store => store.setArtCoin);
  const {token} = useAuth();

  useEffect(() => {
    const handleDeepLink = async (token: string) => {
      let responseData;
      try {
        const {data} = await axios.get(`${SERVER_BASE_URL}/oauth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        responseData = data;
      } catch (error) {
        console.log(error);
      } finally {
        setArtCoin(responseData.artCount);
        setIsMailAttached(true);
      }
    };

    const subscription = Linking.addEventListener('url', () =>
      handleDeepLink(token),
    );

    return () => {
      subscription.remove();
    };
  }, [token]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <ReactQueryLoading />
      <Router />
    </>
  );
};

export default App;
