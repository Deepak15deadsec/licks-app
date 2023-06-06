import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SIZES, COLORS, FONTS } from '../../constants';

const Checkbox = (props:any) => {
  
  return (
    <TouchableOpacity onPress={props.onchangeHandler}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 8}}>
          <Icon
            name={props.value ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
            size={30}
            color={props.value ? COLORS.primary : COLORS.gray}
          />
        </View>
        <Text style={{
          color:COLORS.black , ...FONTS.label
        }}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;
