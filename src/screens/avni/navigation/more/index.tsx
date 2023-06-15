import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  TYPES,
  images,
} from '../../../../constants';
import Svg, {Path, Circle} from 'react-native-svg';
import Options from './Options';
import {useColorScheme} from 'react-native';
import {
  useStoreActions,
  useStoreState,
} from '../../../../store/easy-peasy/hooks';
import {useNavigation} from '@react-navigation/native';

const More = () => {
  let wr = SIZES.width / 391;
  let hr = SIZES.height / 812;

  const navigation = useNavigation()
  const user = useStoreState((store) => store.user)
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
          {/* <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <Path
              d="M11.7836 17.3125C11.041 18.4375 10.1135 19 9 19C7.88654 19 6.95904 18.4375 6.21636 17.3125M14.6619 15.625H3.33808C3.01277 15.6252 2.69325 15.538 2.41218 15.3725C2.13111 15.2071 1.89858 14.9691 1.73834 14.6831C1.5781 14.397 1.49591 14.0731 1.50016 13.7445C1.50441 13.4158 1.59495 13.0942 1.76254 12.8125C2.85532 10.9723 3.43261 8.86665 3.43272 6.72063V5.5C3.43272 4.30653 3.90196 3.16193 4.73722 2.31802C5.57247 1.47411 6.70532 1 7.88654 1H10.1135C11.2947 1 12.4275 1.47411 13.2628 2.31802C14.098 3.16193 14.5673 4.30653 14.5673 5.5V6.72063C14.5673 8.866 15.144 10.9731 16.2375 12.8125C16.405 13.0942 16.4956 13.4158 16.4998 13.7445C16.5041 14.0731 16.4219 14.397 16.2617 14.6831C16.1014 14.9691 15.8689 15.2071 15.5878 15.3725C15.3068 15.538 14.9872 15.6252 14.6619 15.625Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg> */}

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
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#333333',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 30,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
            <Text
              style={{
                ...FONTS.size16m,
                color: '#fff',
              }}>
              More
            </Text>
          </View>
        </View>

        <Options />

        <View
          style={{
            position: 'absolute',
            bottom: Platform.OS === 'android' ? hr*60 : hr*100,
            width: '80%',
            paddingLeft: wr*40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
            gap: 2,
          }}>
            
          <Image
            source={images.cyber}
            style={{
              width: wr * 35,
              height: hr * 35,
            }}
            resizeMode="contain"
          />
          <Text style={{color: '#cccccc', textAlign: 'justify'}}>
            your data is 100% secure with us. we don't share any of your
            information with any third party
          </Text>
        </View>
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792',
  },
});
