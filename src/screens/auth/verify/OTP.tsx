import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { FONTS } from '../../../constants';

interface Props {
  otp: string[],
  setOtp: any,
  error: {
    otp: boolean
  }
}

const OTP = (props: Props) => {

  const otpInputRefs = useRef<any>([]);

  

  const handleOtpChange = (index: number, value: any) => {
    const newOtp = [...props.otp];
    newOtp[index] = value;
    props.setOtp(newOtp);

    if (value && index < props.otp.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyPress = (index: number, key: any) => {
    if (key === 'Backspace' && !props.otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {props.otp.map((value: string, index: number) => (
          <TextInput
            key={index}
            style={{
              marginHorizontal: 4,
              fontSize: 20,
              height: 45,
              width: 45,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: props.error.otp ? '#F65C65' : '#30D792',
              textAlign: 'center',
              color: 'black',
              justifyContent:'center',
              alignContent:'center'
            }}
            value={value}
            onChangeText={(text: string) => handleOtpChange(index, text)}
            onKeyPress={({ nativeEvent: { key } }) =>
              handleOtpKeyPress(index, key)
            }
            maxLength={1}
            keyboardType="numeric"
            ref={(ref: any) => (otpInputRefs.current[index] = ref)}
          />
        ))}

      </View>
      {props.error.otp && <Text style={{
        color: '#F65C65',
        ...FONTS.size16b,
        letterSpacing: -1.03,
        marginTop:12
      }}>Incorrect code, please enter the correct code.</Text>}
    </View>

  )
}

export default OTP

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
});