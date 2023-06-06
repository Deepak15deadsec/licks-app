import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, TYPES} from '../../../../constants';
import CoinCard from '../home/CoinCard';
import {EarningNavigation} from '../../../../navigation/TopNavigation';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import moment from 'moment';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';
import MonthPicker from 'react-native-month-year-picker';

const DEFAULT_OUTPUT_FORMAT = 'MMM-YYYY';
const Art = () => {
  const navigation = useNavigation();

  const [show, setShow] = useState(false);
  const date = useStoreState(store => store.query);

  const setQuery = useStoreActions(store => store.setQuery);

  const showPicker = useCallback(
    (value: boolean | ((prevState: boolean) => boolean)) => setShow(value),
    [],
  );

  const MINIMUM_DATE = moment('2023-05-01').toDate(); // Set the minimum date to May 2023

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setQuery(selectedDate);
    },
    [date, showPicker],
  );

  let wr = SIZES.width / 391;
  let hr = SIZES.height / 812;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: 20,
          alignItems: 'center',
          paddingHorizontal: wr * 20,
          paddingVertical: Platform.OS === 'android' ? hr * 20 : hr * 50,
        }}>
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
              source={icons.avatar}
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
        {/* @ts-ignore */}

        <CoinCard />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: hr * 20,
          }}>
          <Text style={{...FONTS.heading, color: 'black'}}>Earnings</Text>
          <View>
            <TouchableOpacity
              onPress={() => showPicker(true)}
              style={{
                borderRadius: 9,
                padding: 8,
                borderWidth: 1,
                borderColor: '#DBDBDB',
              }}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M1.38033 4.63069H14.7545M2.93465 1.25146H13.066C13.5138 1.25146 13.9433 1.42948 14.26 1.74634C14.5766 2.0632 14.7545 2.49296 14.7545 2.94108V13.0703C14.7545 13.5184 14.5766 13.9482 14.26 14.265C13.9433 14.5819 13.5138 14.7599 13.066 14.7599H2.93465C2.48682 14.7599 2.05733 14.5819 1.74066 14.265C1.42399 13.9482 1.24609 13.5184 1.24609 13.0703V2.94108C1.24609 2.49296 1.42399 2.0632 1.74066 1.74634C2.05733 1.42948 2.48682 1.25146 2.93465 1.25146Z"
                    stroke="#5C595F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.88965 10.2528V9.3413H5.63262C6.19659 9.3413 6.5799 9.0076 6.5799 8.52015C6.5799 8.07493 6.22952 7.73701 5.64866 7.73701C5.04669 7.73701 4.67605 8.04621 4.63468 8.57844H3.48309C3.52615 7.48104 4.37042 6.74268 5.71029 6.74268C7.0299 6.74268 7.76357 7.47259 7.75935 8.34358C7.75513 9.06505 7.30175 9.53983 6.66264 9.69612V9.77468C7.49087 9.8938 7.99406 10.4218 7.99406 11.2185C7.99406 12.2618 7.01301 13.001 5.66892 13.001C4.32483 13.001 3.40963 12.2652 3.35645 11.139H4.54772C4.58487 11.6425 5.01376 11.9644 5.65288 11.9644C6.28356 11.9644 6.72511 11.6214 6.72511 11.1061C6.72511 10.5781 6.31226 10.2528 5.64444 10.2528H4.88965ZM10.5463 12.8481V8.10788H10.4729L9.0131 9.11489V7.95582L10.5505 6.89559H11.7916V12.8481H10.5463Z"
                    fill="#5C595F"
                  />
                </Svg>
                <Text style={{...FONTS.label, color: '#5C595F'}}>
                  {moment(date).format(DEFAULT_OUTPUT_FORMAT)}
                </Text>
              </View>
            </TouchableOpacity>
            {/* <Text>{selectedDate ? selectedDate.toString() : 'No date selected'}</Text> */}
          </View>
        </View>

        <EarningNavigation />

        {show && (
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={MINIMUM_DATE}
            maximumDate={new Date()}
            locale="en"
            mode="full"
            autoTheme={false}
          />
        )}
      </View>
    </View>
  );
};

export default Art;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792',
  },
});
