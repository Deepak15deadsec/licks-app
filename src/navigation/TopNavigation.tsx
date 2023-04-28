import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Site, Month, Category } from '../screens/avni/earning'
import { Promotion, Receipt, Sent } from '../screens/avni/email';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import Svg, {
    Path
} from 'react-native-svg'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { useColorScheme } from 'react-native';
import { COLORS, icons, TYPES, FONTS } from "../constants"

const Tab = createMaterialTopTabNavigator();

const TabBarCustomButton = ({ accessibilityLabel, accessibilityState, children, onPress }: any) => {

    var isSelected = accessibilityState.selected

    const theme = useColorScheme();

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 0
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: theme === TYPES.dark ? COLORS.navigation : COLORS.white }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={theme === TYPES.dark ? COLORS.navigation : COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: theme === TYPES.dark ? COLORS.navigation : COLORS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.primary,
                        ...styles.shadow
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: theme === TYPES.dark ? COLORS.navigation : COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props: any) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                    }}
                ></View>
                <MaterialTopTabBar {...props.props} />
            </View>
        )
    } else {
        return (
            <MaterialTopTabBar {...props.props} />
        )
    }
}

export const EarningNavigation = (props: any) => {
    return (<Tab.Navigator

        tabBar={(props) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 1000,
                    borderWidth: 1,
                    borderColor: 'rgba(92, 89, 95, 0.1)',
                    backgroundColor: '#F8F8F8',
                    padding: 8
                }}>
                    {
                        props.state.routeNames.map((route: string, index: number) => {

                            return (
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate(route)}
                                    style={{
                                        paddingVertical: 10,
                                        width: 90,
                                        borderRadius: 1000,
                                        backgroundColor: (index === props.state.index) ? "#fff" : 'transparent',

                                    }}
                                >
                                    <Text style={{ ...FONTS.size12s, textAlign: 'center', color: (index === props.state.index) ? "#000" : '#5C595F' }}>{route}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            )
        }}

    >
        <Tab.Screen
            name="Month"
            component={Month}

        />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="Site" component={Site} />
    </Tab.Navigator>
    )
}

export const EmailNavigation = (props: any) => {
    return (<Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: COLORS.white,
                elevation: 0

            }
        }}>
        <Tab.Screen
            name="Receipts"
            component={Receipt} />
        <Tab.Screen name="Promotions" component={Promotion} />
        <Tab.Screen name="Sent" component={Sent} />
    </Tab.Navigator>)

}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})



