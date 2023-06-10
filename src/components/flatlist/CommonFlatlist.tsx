import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CommonFlatlist = (props: any) => {
  return (
    <FlatList
      {...props}
      contentContainerStyle={{paddingBottom: 20}}
      //keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CommonFlatlist;
