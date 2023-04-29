import React from 'react';
import { StyleSheet, Animated as AnimatedRN, Text } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
    interpolateColor,
    runOnJS,
} from 'react-native-reanimated';
import { useState } from 'react';
import { FONTS, SIZES } from '../../constants';

const BUTTON_WIDTH = SIZES.width - 40;
const BUTTON_HEIGHT = 60;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
const AnimatedLinearGradients = Animated.createAnimatedComponent(LinearGradient);

const SwipeButton = ({ swipe }: any) => {

    // Animated value for X translation
    const X = useSharedValue(0);

    // Toggled State
    const [toggled, setToggled] = swipe

    // Fires when animation ends
    const handleComplete = (is_toggled: any) => {
        setToggled(is_toggled);
    };

    // Gesture Handler Events
    const animatedGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.completed = toggled;
        },
        onActive: (e, ctx) => {
            let newValue;
            if (ctx.completed) {
                newValue = H_SWIPE_RANGE + e.translationX;
            } else {
                newValue = e.translationX;
            }

            if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
                X.value = newValue;
            }
        },
        onEnd: () => {
            if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
                X.value = withSpring(0);
                runOnJS(handleComplete)(false);
            } else {
                X.value = withSpring(H_SWIPE_RANGE);
                runOnJS(handleComplete)(true);
            }
        },
    });

    const InterpolateXInput = [0, H_SWIPE_RANGE];

    const AnimatedStyles = {
        swipeCont: useAnimatedStyle(() => {
            return {};
        }),
        colorWave: useAnimatedStyle(() => {
            return {
                width: H_WAVE_RANGE + X.value,

                opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
            };
        }),
        swipeable: useAnimatedStyle(() => {
            return {
                backgroundColor: interpolateColor(
                    X.value,
                    [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
                    ['#06d6a0', '#fff'],
                ),
                transform: [{ translateX: X.value }],
            };
        }),
        swipeText: useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    X.value,
                    InterpolateXInput,
                    [0.7, 0],
                    Extrapolate.CLAMP,
                ),
                transform: [
                    {
                        translateX: interpolate(
                            X.value,
                            InterpolateXInput,
                            [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
                            Extrapolate.CLAMP,
                        ),
                    },
                ],
            };
        }),
    };


    let offerTime = 1;
    let initialTime = offerTime * 60;

    const [duration, setDuration] = React.useState(initialTime)
    const inputRef = React.useRef<any>(null)
    const timerAnimation = React.useRef(new AnimatedRN.Value(0)).current

    const textInputAnimation = React.useRef(new AnimatedRN.Value(initialTime)).current

    React.useEffect(() => {
        const listener = textInputAnimation.addListener(({ value }) => {
            inputRef?.current?.setNativeProps({
                text: Math.ceil(value).toString()
            })
            setDuration(value)
        })
        return () => {
            textInputAnimation.removeListener(listener)
            textInputAnimation.removeAllListeners()
        }
    })

    const animation = React.useCallback(() => {
        textInputAnimation.setValue(duration)
        AnimatedRN.sequence([
            AnimatedRN.timing(timerAnimation, {
                toValue: 0,
                duration: BUTTON_WIDTH - 2 * 20,
                useNativeDriver: true
            }),
            AnimatedRN.parallel([
                AnimatedRN.timing(textInputAnimation, {
                    toValue: 0,
                    duration: duration * 1000,
                    useNativeDriver: true
                }),
                AnimatedRN.timing(timerAnimation, {
                    toValue: BUTTON_WIDTH,
                    duration: duration * 1000,
                    useNativeDriver: true
                }),
            ]),

        ]).start(() => {
            textInputAnimation.setValue(duration)
            X.value = 0;
            setToggled(false)
        })
    }, [duration])


    function secondsToTime(e: any) {
        const h = Math.floor(e / 3600).toString().padStart(2, '0'),
            m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(e % 60).toString().padStart(2, '0');

        return m + ':' + s;
    }

    React.useEffect(() => {
        if (toggled) {
            animation()
        }
    }, [toggled])

    return (
        <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
            {
                toggled && (<Text ref={inputRef} style={styles.text}>
                    {secondsToTime(duration)}
                </Text>)
            }
            <AnimatedLinearGradients
                style={[AnimatedStyles.colorWave, styles.colorWave]}
                colors={['#06d6a0', '#1b9aaa']}
                start={{ x: 0.0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            />
            <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]} />
            </PanGestureHandler>
            <Animated.Text style={[{ ...FONTS.size24b, lineHeight: 40, color: '#333333' }, AnimatedStyles.swipeText]}>
                Claim
            </Animated.Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    swipeCont: {
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
        backgroundColor: '#eeeeee',
        borderRadius: BUTTON_HEIGHT,
        padding: BUTTON_PADDING,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    colorWave: {
        position: 'absolute',
        left: 0,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_HEIGHT,
    },
    swipeable: {
        position: 'absolute',
        left: BUTTON_PADDING,
        height: SWIPEABLE_DIMENSIONS,
        width: SWIPEABLE_DIMENSIONS,
        borderRadius: SWIPEABLE_DIMENSIONS,
        zIndex: 3,
    },
    text: {
        ...FONTS.size24b,
        lineHeight: 40,
        color: '#333333',
        zIndex: 1000,
        position: 'absolute',
        width: 200,
        textAlign: 'center'
    }

});

export default SwipeButton;