import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {FONTS, SIZES} from '../../../constants';

interface Props {
  otp: string[];
  setOtp: any;
  error: {
    otp: boolean;
  };
}

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

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
      <View style={[styles.container,{gap:8}]}>
        {props.otp.map((value: string, index: number) => (
          <TextInput
            key={index}
            style={{
              fontSize: 20,
              height: hr * 50,
              width: wr * 50,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: props.error.otp ? '#F65C65' : '#30D792',
              textAlign: 'center',
              color: 'black',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
            value={value}
            onChangeText={(text: string) => handleOtpChange(index, text)}
            onKeyPress={({nativeEvent: {key}}) => handleOtpKeyPress(index, key)}
            maxLength={1}
            keyboardType="numeric"
            ref={(ref: any) => (otpInputRefs.current[index] = ref)}
          />
        ))}
      </View>
      {props.error.otp && (
        <Text
          style={{
            color: '#F65C65',
            ...FONTS.size16b,
            letterSpacing: -1.03,
            marginTop: hr * 12,
          }}>
          Incorrect code, please enter the correct code.
        </Text>
      )}
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hr * 30,
  },
});
