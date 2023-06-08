import React, { useEffect, useRef, useState } from 'react'
import {
    StatusBar,
    Animated,
    Text,
    Image,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { bgs, DATA } from './screens'
import { FONTS, SIZES } from '../../constants';
const { width, height } = SIZES


const Backdrop = ({ scrollX }: any) => {
    const backgroundColor = scrollX.interpolate({
        inputRange: bgs.map((_, i) => i * width),
        outputRange: bgs.map((bg) => bg),

    })
    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject, {
                    backgroundColor
                }
            ]}

        />


    )
}

const Square = ({ scrollX }: any) => {

    const YOLO = Animated.modulo(Animated.divide(
        Animated.modulo(scrollX, width),
        new Animated.Value(width)
    ), 1);

    const rotate = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['35deg', '0deg', '35deg']
    })

    const translateX = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -height, 0]
    })

    return (
        <Animated.View
            style={{
                width: height,
                height: height,
                backgroundColor: '#fff',
                borderRadius: 86,
                position: 'absolute',
                top: -height * 0.6,
                left: -height * 0.3,
                transform: [
                    {
                        rotate
                    },
                    {
                        translateX
                    }
                ]
            }}

        />


    )

}

const Intro = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<any>(null);
    let redirectionScreen = "Phone"

    const navigation = useNavigation();

    useEffect(() => {
      const timer = setTimeout(() => {
        if (currentIndex < DATA.length - 1) {
          flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
          setCurrentIndex(currentIndex + 1);
        } else {
            //@ts-ignore
            navigation.navigate(redirectionScreen); // Replace 'NextScreen' with the name of your desired screen
        }
      }, 4000);
  
      return () => clearTimeout(timer);
    }, [currentIndex, navigation]);

    const Indicator = ({ scrollX }: any) => {
        const navigation = useNavigation();

        const handleNext = () => {
            if (currentIndex < DATA.length - 1) {
                flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
                setCurrentIndex(currentIndex + 1);
            } else {
                //@ts-ignore
                navigation.navigate(redirectionScreen)
            }
        };

        return (
            <View style={{ position: 'absolute', paddingLeft: 20, paddingRight: 20, width, alignItems: 'center', bottom: 40, flexDirection: 'column', justifyContent: 'space-between' }}>

                

                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                    {
                        DATA.map((_, i: number) => {
                            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange: [0.8, 1.4, 0.8],
                                extrapolate: 'clamp'

                            })

                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [0.6, 0.9, 0.6],
                                extrapolate: 'clamp'

                            })
                            return (
                                <Animated.View
                                    key={`indicator-${i}`}
                                    style={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#fff',
                                        opacity,
                                        margin: 10,
                                        transform: [
                                            {
                                                scale
                                            }
                                        ]
                                    }}
                                />

                            )
                        })
                    }
                </View>

                <View style={{ flex: 1 }}>
                    {currentIndex < DATA.length - 1 && (
                        <TouchableOpacity
                            //@ts-ignore
                            onPress={() => navigation.navigate(redirectionScreen)}
                        >
                            <Text style={{...FONTS.size10m}}>Skip</Text>
                        </TouchableOpacity>
                    )
                    }
                </View>

                {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        //@ts-ignore
                        onPress={handleNext}
                    >
                        <Text> Next</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Backdrop scrollX={scrollX} />
            <Square scrollX={scrollX} />
            <Animated.FlatList
                ref={flatListRef}
                scrollEnabled={false} // Disable scrolling
                data={DATA}
                keyExtractor={item => item.key}
                horizontal
                scrollEventThrottle={32}
                onMomentumScrollEnd={event => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
                    setCurrentIndex(index);
                }}
                onScroll={Animated.event(
                    [{
                        nativeEvent:
                        {
                            contentOffset: {
                                x: scrollX
                            }
                        }
                    }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({ item }) => {
                    return (
                        <View style={{ width, alignItems: 'center', padding: 20 }}>
                            <View style={{ flex: 0.7, justifyContent: 'center' }}>
                                <Image
                                    source={item.image }
                                    style={{
                                        width: width / 2,
                                        height: width / 2,
                                        resizeMode: 'contain'
                                    }} />
                            </View>
                            <View style={{ flex: .3, marginTop: 100, width:"90%" }}>
                            <Text
                                    style={{ color: '#fff', fontWeight: '300',marginBottom: 10 }}
                                >{item.title}</Text>
                                <Text
                                    style={{ color: '#fff', fontWeight: '800', fontSize: 30, }}
                                >{item.description}</Text>
                               
                            </View>
                        </View>
                    )
                }}
            />

            <Indicator scrollX={scrollX} />
        </View>
    )
}

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})