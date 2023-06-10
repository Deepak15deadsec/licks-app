import React, { ReactElement } from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useIsFetching } from "react-query";
import RingWave from "../components/RingWave";
import { FONTS, SIZES } from '../constants';

function Loading(props: any): ReactElement {
  const isFetching = useIsFetching();
  return (
    <>
      {Boolean(isFetching) && (
       <View style={styles.container}>
         <RingWave/>
       </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    position: 'absolute',
    height: SIZES.height,
    width : SIZES.width,
    zIndex:1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
