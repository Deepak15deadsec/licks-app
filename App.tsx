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
    const handleDeepLink = async (event: any) => {
      setIsMailAttached(true);
      await rewardUpdated();
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [token]);

  const rewardUpdated = useCallback(async () => {
    try {
      const {data} = await axios.get(`${SERVER_BASE_URL}/oauth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArtCoin(data.artCount);
    } catch (error) {
      // Handle error gracefully
      console.log('Reward update failed:', error);
    }
  }, [setArtCoin, token]);

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
