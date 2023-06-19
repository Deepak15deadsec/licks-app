import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {COLORS, FONTS, SIZES, icons, TYPES} from '../../../../constants';
import {useNavigation} from '@react-navigation/native';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';

//@ts-ignore
import {SERVER_BASE_URL} from '@env';
import axios from 'axios';
import { useAuth } from '../../../../hooks/auth';

const CoinCard = () => {
  const user = useStoreState(store => store.user);
  const artCoin = useStoreState(store => store.artCoin);
  const isInviteAccepted = useStoreState((store) => store.isInviteAccepted)
  const isProfileCompleted = useStoreState((store) => store.isProfileCompleted)
  const setArtCoin = useStoreActions(store => store.setArtCoin);
  const navigation = useNavigation();
  const {id, token} = useAuth()
  let wr = SIZES.width / 391;
  let hr = SIZES.height / 812;

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const {data} = await axios({
          method: 'GET',
          url: `${SERVER_BASE_URL}/oauth/me`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtCoin(data.artCount);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      token && fetchCoin();
    }
  }, [token, isInviteAccepted, isProfileCompleted]);

  return (
    <View
      style={{
        backgroundColor: '#222831',
        borderRadius: 10,
        height: hr * 97,
        paddingLeft: wr * 8,
        paddingRight: wr * 8,
        paddingTop: hr * 20,
        paddingBottom: hr * 20,
        gap: 4,
        alignContent: 'center',
        marginTop: 15,
      }}>
      <Text
        style={{
          ...FONTS.label,
          color: COLORS.white,
        }}>
        Earnings
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <Image
          style={{height: 25, width: 25}}
          source={icons.coin}
          resizeMode="contain"
        />
        <Text style={{...FONTS.coin, color: 'white'}}>{artCoin}</Text>
        {/* <Text style={{
                    ...FONTS.label,
                    color: COLORS.white
                }}>ART</Text> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Token' as never)}
          style={{
            borderRadius: 15,
            padding: 8,
            borderWidth: 1,
            borderColor: '#DBDBDB',

            flexDirection: 'row',
            zIndex: 50,

            shadowColor: '##30D792',
            shadowOffset: {width: 10, height: 1},
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 5,
            backgroundColor: '#f0fcfa',
          }}>
          <Image
            style={{height: 12, width: 12}}
            source={icons.question}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={{position: 'absolute', flexDirection: 'row', right: 0}}>
        <Svg width="133" height="64" viewBox="0 0 133 64" fill="none">
          <Circle
            cx="98.5"
            cy="20.5"
            r="43.5"
            fill="white"
            fillOpacity="0.14"
          />
          <Circle
            cx="43.5"
            cy="20.5"
            r="43.5"
            fill="white"
            fillOpacity="0.14"
          />
        </Svg>

        {/* <Svg  width="87" height="64" viewBox="0 0 87 64" fill="none">
              <Circle  cx="43.5" cy="20.5" r="43.5" fill="white" fillOpacity="0.14"/>
              </Svg> */}
        {/* <Svg width="78" height="64" viewBox="0 0 78 64" fill="none">
                    <Circle cx="43.5" cy="20.5" r="43.5" fill="white" fillOpacity="0.14" />
                </Svg> */}
      </View>
    </View>
  );
};

export default CoinCard;

const styles = StyleSheet.create({});
