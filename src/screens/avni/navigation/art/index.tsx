
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import { COLORS, FONTS, SIZES, icons, TYPES } from '../../../../constants'
import CoinCard from '../home/CoinCard'
import TabNavigator from './TabNavigator';


const Art = () => {



  let wr = (SIZES.width / 391)
  let hr = (SIZES.height / 812)
  return (
    <View style={styles.container}>




      <View
        style={{
          position: 'absolute',
          bottom: 0,
          top: 58,
          alignSelf: 'center',
          width: SIZES.width * 0.92,
          height: hr * (SIZES.height - 20),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#ffffff80',
        }}
      />


      <View
        style={{
          position: 'absolute',
          bottom: 0,
          top: 70,
          width: SIZES.width,
          height: hr * (SIZES.height - 30),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFFFFF',
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 36,
          paddingBottom: 50

        }}
      >

        {/* @ts-ignore */}

        <CoinCard />
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginTop: 8 }}>
                <Text style={{ ...FONTS.heading, color: 'black' }}>Earnings</Text>
                <TouchableOpacity
                    style={{
                        borderRadius: 9,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#DBDBDB'
                    }}>
                    <Text style={{ ...FONTS.label, color: '#5C595F' }}> Select Date</Text>
                </TouchableOpacity>
            </View>
       

       
          <TabNavigator />
    
      </View>

    </View>
  )
}

export default Art

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30D792'
  }
})