import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../../constants'

const Art = () => {
  return (
    <View style={{
      flex:1, 
      justifyContent:'center',
      alignItems:'center'
    }}>
      <Text style={{
        color:'#30D792',
        ...FONTS.heading
      }}>Coming ...</Text>
    </View>
  )
}

export default Art

const styles = StyleSheet.create({})