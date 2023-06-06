import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import { SIZES, COLORS } from '../constants'



const LoadingIndicator = ({ size }: { size: number }) => {
  return (
    <View style={{
      alignContent: 'center',
      alignItems: 'center'
    }}>

      <MotiView
        from={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 0,
          shadowOpacity: 0.5
        }}
        animate={{
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
          borderWidth: size / 10,
          shadowOpacity: 1
        }}
        transition={{
          type: 'timing',
          duration: 1000,
          loop: true,
          //repeatReverse: false
        }}

        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 2,
          borderColor: '#fff',
          shadowColor: '#fff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 10,
          paddingTop: 40,
          paddingLeft: 20
        }}

      >
        <Text>Loading...</Text>
      </MotiView>
    </View>
  )
}


const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <LoadingIndicator size={100} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    position: 'absolute',
    height: SIZES.height,
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#30D792'
  }
})