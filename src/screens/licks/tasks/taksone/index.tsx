import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  FlatList,
  Animated,
} from 'react-native';

import Svg, {Path, Circle} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {FONTS, images, SIZES} from '../../../../constants';
import box from './box';
import Box from './box';

const DATA = [
  {id: '1', text: 'Item 1'},
  {id: '2', text: 'Item 2'},
  {id: '3', text: 'Item 3'},
  {id: '4', text: 'Item 4'},
  // Add more items as needed
];

const Taskone = () => {
  const navigation = useNavigation();

  const [input, setInput] = useState<any>({
    supportCat: '',
  });

  let wr = SIZES.width / 391;
  let hr = SIZES.height / 812;

  const onchangeHandler = useCallback((value: any, name: string) => {
    setInput((prevState: any) => ({...prevState, [name]: value}));
  }, []);

  const renderItem = ({item, index}: any) => {
    const translateY = new Animated.Value(0);

    Animated.timing(translateY, {
      toValue: 1,
      duration: 1000,
      delay: index * 250, // Delay each item's animation
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [200, 0],
                }),
              },
            ],
          },
        ]}>
        <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'red',
            borderRadius: 20,
          }}>
        
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: hr * 20}}>
        <Text style={{color: '#E7E7E9', fontSize: 28, fontWeight: '700'}}>
          LI<Text style={{color: '#A259FF'}}>CKS</Text>
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
          marginTop: hr * -20,
        }}>
        <Text
          style={{
            color: '#9FA0A5',
            textAlign: 'left',
            paddingHorizontal: 50,
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 16.8,
          }}>
          <Text style={{color: '#A259FF'}}>Hey, Nayra: </Text> you don’t have
          any tasks, yet. Choose for the tasks you are eligible for below and
          earn exclusive Drops for free.{' '}
          <Text style={{color: '#A259FF'}}>Get started.</Text>
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Box title="Find a task" color="#4F5EA0" />
          <Box title="Explore Drops" color="#700E44" />
          <Box title="Buy LICKS" color="#0CA569" />
        </View>
        <Text
          style={{
            color: 'white',
            alignSelf: 'flex-start',
            paddingHorizontal: 55,
            fontSize: 18,
            fontWeight: '700',
          }}>
          Popular Tasks
        </Text>

        {/* <View style={{paddingHorizontal: 50}}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            contentContainerStyle={styles.flatlistContent}
          />
        </View> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Createdrop' as never)}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{height: hr * 361, width: wr * 314}}
            source={images.image15}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Taskone;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: '#0F111E',
  },
  flatlistContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    marginHorizontal: 10,
  },
});
