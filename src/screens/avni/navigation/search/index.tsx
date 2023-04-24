import { StyleSheet, Text, View } from 'react-native'
import { FONTS } from '../../../../constants'
import React from 'react'

const Search = () => {
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

export default Search

const styles = StyleSheet.create({})