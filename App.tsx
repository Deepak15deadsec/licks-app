import React, {useEffect} from 'react';
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
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => {
      subscription.remove();
    };
  });

  const rewardUpdated = async () => {
    const {data} = await axios({
      method: 'GET',
      url: `${SERVER_BASE_URL}/oauth/me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setArtCoin(data.artCount);
  };

  const handleDeepLink = async (event: any) => {
    setIsMailAttached(true);
    await rewardUpdated();
  };

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
