import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Site, Month, Category } from '../screens/avni/earning'
import { Promotion, Receipt, Sent } from '../screens/avni/email';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS, FONTS } from "../constants"

const Tab = createMaterialTopTabNavigator();

export const MialNavigation = (props: any) => {
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
                                key={index}
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
            name="Receipt"
            component={Receipt}

        />
         <Tab.Screen name="Promotion" component={Promotion} />
        <Tab.Screen name="Sent" component={Sent} />
       
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
