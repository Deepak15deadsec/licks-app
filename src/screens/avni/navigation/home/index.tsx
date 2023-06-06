import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES, icons, TYPES, images } from '../../../../constants'
import Svg, {
  Path,
  Circle
} from 'react-native-svg'
import { useColorScheme } from 'react-native';
import CoinCard from './CoinCard';
import Categories from './categories';
import Trending from './trending';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';
import Expiring from './expiring';
import {useNavigation} from '@react-navigation/native';
import Card from './Card';
import Google from './Google';
import Orbit from '../../../../components/orbit/Orbit';

//@ts-ignore
import {SERVER_BASE_URL} from '@env';
import axios from 'axios';
import InviteCard from './InviteCard';
import Dummytrending from './dummy';

const Home = () => {
  const user = useStoreState(store => store.user);
  const isMailAttached = useStoreState(store => store.isMailAttached);
  const isInviteAccepted = useStoreState(store => store.isInviteAccepted);
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  let wr = SIZES.width / 391;
  let hr = SIZES.height / 812;

  const theme = useColorScheme();

  const isProfileComplete = () => {
    // Check if all the required fields in the user object are filled
    if (
      user.firstName &&
      user.lastName &&
      user.email &&
      user.phone &&
      user.gender &&
      user.dob
    ) {
      return true; // Profile is complete
    }
    return false; // Profile is not complete
  };

  // useEffect(() => {
  //   const fetchMailid = async () => {
  //     try {
  //       const {data} = await axios({
  //         method: 'GET',
  //         url: `${SERVER_BASE_URL}/forward-mail?userId=${user.id}`,
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       });

  //       setData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchMailid();
  // }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 20,
          alignItems: 'center',
          paddingHorizontal: wr * 20,
          paddingVertical: Platform.OS === 'android' ? hr * 20 : hr * 50,
        }}>
        <Text style={{...FONTS.heading, color: 'white'}}>
          Welcome Back, {user.firstName}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <Path
              d="M11.7836 17.3125C11.041 18.4375 10.1135 19 9 19C7.88654 19 6.95904 18.4375 6.21636 17.3125M14.6619 15.625H3.33808C3.01277 15.6252 2.69325 15.538 2.41218 15.3725C2.13111 15.2071 1.89858 14.9691 1.73834 14.6831C1.5781 14.397 1.49591 14.0731 1.50016 13.7445C1.50441 13.4158 1.59495 13.0942 1.76254 12.8125C2.85532 10.9723 3.43261 8.86665 3.43272 6.72063V5.5C3.43272 4.30653 3.90196 3.16193 4.73722 2.31802C5.57247 1.47411 6.70532 1 7.88654 1H10.1135C11.2947 1 12.4275 1.47411 13.2628 2.31802C14.098 3.16193 14.5673 4.30653 14.5673 5.5V6.72063C14.5673 8.866 15.144 10.9731 16.2375 12.8125C16.405 13.0942 16.4956 13.4158 16.4998 13.7445C16.5041 14.0731 16.4219 14.397 16.2617 14.6831C16.1014 14.9691 15.8689 15.2071 15.5878 15.3725C15.3068 15.538 14.9872 15.6252 14.6619 15.625Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>

          <TouchableOpacity
            onPress={() => navigation.navigate('Profile' as never)}>
            <Image
             source={ user?.gender === 'Male'
             ? images.man
             : user?.gender === 'Female'
             ? images.woman
             : icons.avatar}
              style={{
                width: wr * 38,
                height: hr * 38,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          width: SIZES.width * 0.92,
          height:
            Platform.OS === 'android' ? SIZES.height - 83 : SIZES.height - 110,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#ffffff80',
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: SIZES.width,
          height:
            Platform.OS === 'android' ? SIZES.height - 95 : SIZES.height - 123,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFFFFF',
          paddingLeft: wr * 24,
          paddingRight: wr * 24,
          paddingTop: hr * 36,
          paddingBottom: hr * 50,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CoinCard />
          {(!isProfileComplete() || isMailAttached === false) && (
            <Text
              style={{
                marginTop: 15,
                ...FONTS.paragraph,
                color: '#5C595F',
              }}>
              Action required
            </Text>
          )}
          {!isProfileComplete() && <Card />}
          {isMailAttached === false && <Google />}
          {isInviteAccepted === false && <InviteCard />}
          <Categories />
          <Dummytrending  />
          {/* <Trending />
          <Expiring /> */}
          <Orbit />
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792',
  },
});
