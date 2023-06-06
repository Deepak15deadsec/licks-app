import React, { useEffect } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Phone, Verify, Language, Signup } from './src/screens/auth';
import { Intro } from './src/screens/intro'
import { Detail } from './src/screens/avni';
import { BottomNavigation } from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import Profile from './src/screens/avni/navigation/more/profile';
import Support from './src/screens/avni/navigation/more/support';
import Invite from './src/screens/avni/navigation/more/invite';
import Terms from './src/screens/avni/navigation/more/terms';
import Mailid from './src/screens/auth/mailid';
import MailDetail from './src/screens/avni/email/MailDetail';
import Mail from './src/screens/avni/navigation/more/mail';
import ReplyScreen from './src/screens/avni/email/ReplyScreen';
import FowardScreen from './src/screens/avni/email/FowardScreen';
import Token from './src/screens/avni/navigation/more/faqtoken';
import Googlepage from './src/components/googlefq';
import SentDetail from './src/screens/avni/email/SentDetail';
import AllCategories from './src/screens/avni/navigation/home/categories/AllCategories';
import { Linking } from 'react-native';
import axios from 'axios';
import { useStoreActions, useStoreState } from './src/store/easy-peasy/hooks';

//@ts-ignore
import { SERVER_BASE_URL } from '@env'
import maillist from './src/screens/avni/navigation/more/maillist';
import Invitebox from './src/screens/auth/invitebox';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createSharedElementStackNavigator();

export const LinkingConfig: any = {
  prefixes: ["https://test.avniads.com"],
  config: {
    screens: {
      Avni: {

        screens: {
          Home: 'home',

        },
      },

    },
  },
}

const App = () => {
  const user = useStoreState((store) => store.user)
  const authenticate = useStoreState((store) => store.authenticate)
  const setIsMailAttached = useStoreActions((store) => store.setIsMailAttached)
  const setArtCoin = useStoreActions((store) => store.setArtCoin)

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleOpenURL);
    return () => {
      subscription.remove()
    };

  });


  const fetchme = async () => {

    const { data } = await axios({
      method: "GET",
      url: `${SERVER_BASE_URL}//oauth/me`,
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
   
    setIsMailAttached(true)
    setArtCoin(data.artCount)
  }


  const handleOpenURL = async (event: any) => {
    const { url } = event;
    // Parse the URL to extract the access token and refresh token
    await fetchme()

    console.log('Refresh Token:', url);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <NavigationContainer linking={LinkingConfig}>

      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Intro'}
      >
        {authenticate ? (
          <>
            <Stack.Screen name="Avni" component={BottomNavigation} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Support" component={Support} />
            <Stack.Screen name="Invite" component={Invite} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="Token" component={Token} />
            <Stack.Screen name="Mail" component={Mail} />
            <Stack.Screen name="Maildetail" component={MailDetail} />
            <Stack.Screen name="Sentdetail" component={SentDetail} />
            <Stack.Screen name="Reply" component={ReplyScreen} />
            <Stack.Screen name="Forward" component={FowardScreen} />
            <Stack.Screen name="Google" component={Googlepage} />
            <Stack.Screen name="Maillist" component={maillist} />
            <Stack.Screen name="Allcategories" component={AllCategories} />
            <Stack.Screen name="Invitebox" component={Invitebox} />
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
            <Stack.Screen name="Phone"  component={Phone} />
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="Mailid" component={Mailid} />
            <Stack.Screen name="Signup" component={Signup} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
