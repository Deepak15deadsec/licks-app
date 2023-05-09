import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'
import Svg, {
  Path,
  Circle
} from 'react-native-svg'
import { useColorScheme } from 'react-native';
import CoinCard from './CoinCard';
import Categories from './categories';
import Trending from './trending';
import { useStoreActions, useStoreState } from '../../../../store/easy-peasy/hooks';
import Expiring from './expiring';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const user = useStoreState((store) => store.user)
  const navigation = useNavigation()

  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)

  const theme = useColorScheme();

  return (
    <View style={styles.container}>


      <View style={{ flexDirection: "row", justifyContent: 'space-between', gap: 20, alignItems: 'center', paddingHorizontal: wr*20, paddingVertical:hr*20 }}>

        <Text style={{ ...FONTS.heading, color: 'white' }}>Welcome Back, {user.name}</Text>

        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <Path
              d="M11.7836 17.3125C11.041 18.4375 10.1135 19 9 19C7.88654 19 6.95904 18.4375 6.21636 17.3125M14.6619 15.625H3.33808C3.01277 15.6252 2.69325 15.538 2.41218 15.3725C2.13111 15.2071 1.89858 14.9691 1.73834 14.6831C1.5781 14.397 1.49591 14.0731 1.50016 13.7445C1.50441 13.4158 1.59495 13.0942 1.76254 12.8125C2.85532 10.9723 3.43261 8.86665 3.43272 6.72063V5.5C3.43272 4.30653 3.90196 3.16193 4.73722 2.31802C5.57247 1.47411 6.70532 1 7.88654 1H10.1135C11.2947 1 12.4275 1.47411 13.2628 2.31802C14.098 3.16193 14.5673 4.30653 14.5673 5.5V6.72063C14.5673 8.866 15.144 10.9731 16.2375 12.8125C16.405 13.0942 16.4956 13.4158 16.4998 13.7445C16.5041 14.0731 16.4219 14.397 16.2617 14.6831C16.1014 14.9691 15.8689 15.2071 15.5878 15.3725C15.3068 15.538 14.9872 15.6252 14.6619 15.625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </Svg>


          <TouchableOpacity
          onPress={() => navigation.navigate('Profile' as never)}
            >
            <Image
              source={icons.avatar}
              style={{
                width: wr*38,
                height: hr*38
              }}
              resizeMode='contain'
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
          height:  (SIZES.height - 83),
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
          height:  (SIZES.height - 95),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFFFFF',
          paddingLeft: wr*24,
          paddingRight: wr*24,
          paddingTop: hr*36,
          paddingBottom: hr*50
        }}
      >

        <ScrollView
          showsVerticalScrollIndicator={false}>
          <CoinCard />
          <Categories />
          <Trending />
          <Expiring />
        </ScrollView>
      </View>


    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792'
  }
})