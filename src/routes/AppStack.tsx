import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import MailDetail from '../screens/avni/email/MailDetail';
import Mail from '../screens/avni/navigation/more/mail';
import ReplyScreen from '../screens/avni/email/ReplyScreen';
import FowardScreen from '../screens/avni/email/FowardScreen';
import Token from '../screens/avni/navigation/more/faqtoken';
import Googlepage from '../components/googlefq';
import SentDetail from '../screens/avni/email/SentDetail';
import AllCategories from '../screens/avni/navigation/home/categories/AllCategories';
import maillist from '../screens/avni/navigation/more/maillist';
import Invitebox from '../screens/auth/invitebox';
import Faqreward from '../screens/avni/navigation/more/faqreward';
import CatReward from '../screens/avni/navigation/home/categories/rewardCat';
import Profile from '../screens/avni/navigation/more/profile';
import Support from '../screens/avni/navigation/more/support';
import Invite from '../screens/avni/navigation/more/invite';
import Terms from '../screens/avni/navigation/more/terms';
import {Detail} from '../screens/avni';
import {BottomNavigation} from '../navigation';

const Stack = createSharedElementStackNavigator();



export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Avni" component={BottomNavigation} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Token" component={Token} />
      <Stack.Screen name="Rewardhtml" component={Faqreward} />
      <Stack.Screen name="Mail" component={Mail} />
      <Stack.Screen name="Maildetail" component={MailDetail} />
      <Stack.Screen name="Sentdetail" component={SentDetail} />
      <Stack.Screen name="Reply" component={ReplyScreen} />
      <Stack.Screen name="Forward" component={FowardScreen} />
      <Stack.Screen name="Google" component={Googlepage} />
      <Stack.Screen name="Maillist" component={maillist} />
      <Stack.Screen name="Allcategories" component={AllCategories} />
      <Stack.Screen name="Invitebox" component={Invitebox} />
      <Stack.Screen name="Catreward" component={CatReward} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        sharedElements={(route, otherRoute, showing) => {
          const {id} = route.params;
          return [
            {
              id: `banner${id}`,
              animation: 'fade',
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};
