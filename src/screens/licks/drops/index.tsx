import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
const { width, height } = Dimensions.get('window');
import { getMovies } from './api';
import { useNavigation } from '@react-navigation/native';


const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);


export default function App() {
  const [movies, setMovies] = React.useState<any>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()

  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>

      <StatusBar hidden />
      <View style={{ alignItems: 'center', marginTop: 37 }}>
        <Text style={{ color: '#E7E7E9', fontSize: 28, fontWeight: '700' }}>LI<Text style={{ color: '#A259FF' }}>CKS</Text></Text>
      </View>
      <View style={{ flex: 1, marginTop: -80 }}>
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={(item) => item.key}
          horizontal
          bounces={false}
          decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
          renderToHardwareTextureAndroid
          contentContainerStyle={{ alignItems: 'center' }}
          snapToInterval={ITEM_SIZE}
          snapToAlignment='start'
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            if (!item.poster) {
              return <View style={{ width: EMPTY_ITEM_SIZE }} />;
            }

            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [100, 50, 100],
              extrapolate: 'clamp',
            });

            return (
              <View style={{ width: ITEM_SIZE }}>

                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    transform: [{ translateY }],
                    backgroundColor: 'white',
                    borderRadius: 34,
                  }}
                >

                  <TouchableOpacity style={{ width: '100%' }} onPress={() => navigation.navigate('Dropped' as never)}>
                    <Image
                      source={item.poster}
                      style={styles.posterImage}
                    />
                  </TouchableOpacity>


                  <View style={{
                    width: '100%', // Adjust the size of the square as needed
                    height: 64, // Adjust the size of the square as needed
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderRadius: 27,

                    backgroundColor: '#0F111E',
                    flexDirection: 'row'

                  }}>
                    <TouchableOpacity>
                      <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" >

                        <Circle id="Ellipse 2" cx="14" cy="14" r="14" fill="#6F7078" />
                        <Path id="Vector" d="M20.7663 8.23771C20.3753 7.84532 19.9111 7.53405 19.4002 7.32168C18.8893 7.10931 18.3417 7.00001 17.7887 7.00001C17.2357 7.00001 16.6881 7.10931 16.1772 7.32168C15.6663 7.53405 15.2021 7.84532 14.8112 8.23771L13.9998 9.05167L13.1884 8.23771C12.3987 7.44549 11.3277 7.00042 10.2109 7.00042C9.09409 7.00042 8.02303 7.44549 7.23334 8.23771C6.44365 9.02993 6 10.1044 6 11.2248C6 12.3452 6.44365 13.4197 7.23334 14.2119L8.0447 15.0258L13.9998 21L19.9549 15.0258L20.7663 14.2119C21.1574 13.8197 21.4677 13.354 21.6794 12.8415C21.891 12.3289 22 11.7796 22 11.2248C22 10.67 21.891 10.1207 21.6794 9.60812C21.4677 9.09558 21.1574 8.62991 20.7663 8.23771Z" fill="#E7E7E9" />

                      </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Svg width="18" height="22" viewBox="0 0 18 22" fill="none" >

                        <Path id="Vector" d="M1 11V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V11" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <Path id="Vector_2" d="M13 5.00001L9 1.00001L5 5.00001" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <Path id="Vector_3" d="M9 1.00001V14" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

                      </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Svg width="17" height="4" viewBox="0 0 17 4" fill="none" >

                        <Path id="Vector" d="M8.5 3.00001C9.01777 3.00001 9.4375 2.55229 9.4375 2.00001C9.4375 1.44772 9.01777 1.00001 8.5 1.00001C7.98223 1.00001 7.5625 1.44772 7.5625 2.00001C7.5625 2.55229 7.98223 3.00001 8.5 3.00001Z" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <Path id="Vector_2" d="M15.0625 3.00001C15.5803 3.00001 16 2.55229 16 2.00001C16 1.44772 15.5803 1.00001 15.0625 1.00001C14.5447 1.00001 14.125 1.44772 14.125 2.00001C14.125 2.55229 14.5447 3.00001 15.0625 3.00001Z" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <Path id="Vector_3" d="M1.9375 3.00001C2.45527 3.00001 2.875 2.55229 2.875 2.00001C2.875 1.44772 2.45527 1.00001 1.9375 1.00001C1.41973 1.00001 1 1.44772 1 2.00001C1 2.55229 1.41973 3.00001 1.9375 3.00001Z" stroke="#E7E7E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

                      </Svg>
                    </TouchableOpacity>
                  </View>

                </Animated.View>
              </View>
            );
          }}
        />
      </View>
      <View style={{ height: 260, width: '100%', paddingVertical: 20, }}>
        <Text style={{ width: '100%', color: '#9FA0A5', paddingHorizontal: 50, fontSize: 12, fontWeight: '500', lineHeight: 16.8, alignSelf: 'center', textAlign: 'justify' }}><Text style={{ color: '#A259FF' }}>Drops: </Text> When we say it’s exclusive, it really is exclusive. Limited edition merchandise, unique creator experiences, branded events, shows, workshops, you name it - all curated by the creators themselves only for Licks Community.</Text>
        <TouchableOpacity style={{
          width: 195,
          height: 60,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#A259FF',
          flexDirection: 'row', gap: 10,
          alignSelf: 'center',
          marginTop: 20
        }}>
          <Svg width="21" height="20" viewBox="0 0 21 20" fill="none">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.67053 12.4491C6.78055 12.7763 6.60451 13.1307 6.27734 13.2407C5.21792 13.597 4.65489 14.4863 4.35373 15.3907C4.23414 15.7498 4.16189 16.0955 4.11848 16.3814C4.40434 16.338 4.75006 16.2657 5.10917 16.1461C6.01355 15.845 6.9029 15.2819 7.25916 14.2225C7.36918 13.8954 7.7236 13.7193 8.05078 13.8293C8.37795 13.9394 8.55399 14.2938 8.44396 14.621C7.9096 16.21 6.58801 16.9712 5.50411 17.3321C4.95655 17.5144 4.44395 17.6045 4.0698 17.6493C3.88182 17.6719 3.72641 17.6833 3.616 17.6891C3.56074 17.6921 3.51658 17.6936 3.48505 17.6943C3.46928 17.6947 3.45666 17.6949 3.44737 17.6951L3.43596 17.6952L3.43217 17.6952L3.43077 17.6952L3.43019 17.6952C3.42993 17.6952 3.42969 17.6952 3.42969 17.0702C2.80469 17.0702 2.80469 17.0699 2.80469 17.0697L2.80469 17.0691L2.80469 17.0677L2.80471 17.0639L2.80481 17.0525C2.80493 17.0432 2.80514 17.0306 2.80553 17.0148C2.80631 16.9833 2.80782 16.9391 2.81072 16.8839C2.81653 16.7735 2.82797 16.618 2.85052 16.4301C2.8954 16.0559 2.98542 15.5433 3.16776 14.9958C3.5287 13.9119 4.28989 12.5903 5.87891 12.0559C6.20608 11.9459 6.5605 12.1219 6.67053 12.4491ZM3.42969 17.0702H2.80469C2.80469 17.4154 3.08451 17.6952 3.42969 17.6952V17.0702Z" fill="white" />
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M17.0462 3.454C16.3208 3.34937 14.5351 3.30996 12.7076 5.13747L7.84482 10.0002L10.5 12.6554L15.3627 7.79265C17.1903 5.96514 17.1508 4.17945 17.0462 3.454ZM17.2275 2.21721C16.2298 2.07276 14.0058 2.07151 11.8237 4.25359L6.519 9.55827C6.40179 9.67548 6.33594 9.83446 6.33594 10.0002C6.33594 10.166 6.40179 10.3249 6.519 10.4422L10.0581 13.9812C10.3021 14.2253 10.6979 14.2253 10.9419 13.9812L16.2466 8.67653C18.4287 6.49445 18.4275 4.27046 18.283 3.27276C18.2465 3.00574 18.1235 2.75797 17.9329 2.56734C17.7422 2.37671 17.4945 2.25376 17.2275 2.21721Z" fill="white" />
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.922 8.49243C15.2672 8.49243 15.547 8.77225 15.547 9.11743V14.1643L15.5469 14.1732C15.5423 14.5015 15.4086 14.8147 15.175 15.0452L12.6527 17.5753C12.4926 17.7352 12.2921 17.8486 12.0725 17.9035C11.853 17.9584 11.6227 17.9527 11.4061 17.8869C11.1896 17.8212 10.995 17.6978 10.843 17.5301C10.6912 17.3625 10.5877 17.1569 10.5435 16.9351C10.5434 16.935 10.5435 16.9353 10.5435 16.9351L9.88731 13.6622C9.81946 13.3237 10.0388 12.9944 10.3773 12.9265C10.7157 12.8587 11.0451 13.078 11.1129 13.4165L11.7694 16.6909L14.297 14.1554V9.11743C14.297 8.77225 14.5768 8.49243 14.922 8.49243Z" fill="white" />
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.32698 4.95307L6.33588 4.953H11.3828C11.7279 4.953 12.0078 5.23282 12.0078 5.578C12.0078 5.92318 11.7279 6.203 11.3828 6.203H6.34472L6.33967 6.20816L6.33964 6.20813L3.80933 8.73063L3.8103 8.73082L7.08373 9.38707C7.42218 9.45492 7.64154 9.78429 7.57369 10.1227C7.50584 10.4612 7.17647 10.6805 6.83803 10.6127L3.56556 9.95663C3.56537 9.95659 3.56518 9.95655 3.565 9.95652C3.34325 9.91232 3.13764 9.8088 2.97006 9.65699C2.80235 9.50504 2.67903 9.31042 2.61327 9.09387C2.54751 8.87733 2.54176 8.647 2.59665 8.42745C2.65154 8.2079 2.765 8.00737 2.92493 7.84725L2.92587 7.84631L2.92587 7.84632L5.45498 5.32502C5.68549 5.09139 5.99869 4.95774 6.32698 4.95307Z" fill="white" />
          </Svg>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            BUY NOW
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0F111E'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 0.8,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});