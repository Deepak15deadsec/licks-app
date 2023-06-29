import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import ReactQueryLoading from './src/react-query';
import { Router } from './src/routes';

const App = () => {

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
