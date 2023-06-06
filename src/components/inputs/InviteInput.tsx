import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {icons, SIZES, FONTS} from '../../constants';

let wr = SIZES.width / 391;
let hr = SIZES.height / 812;

const InviteInput = (props: any) => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#30D792',
        height: hr * 48,
        paddingLeft: wr * 15,
        paddingRight: wr * 15,
        paddingTop: hr * 1,
        paddingBottom: hr * 1,
      }}>
      <TextInput
        {...props}
        placeholderTextColor="#00000080"
        style={{
          ...FONTS.paragraph,
          lineHeight: 25,
          color: '#4E656F',
        }}
      />
    </View>
  );
};

export default InviteInput;

const styles = StyleSheet.create({});
