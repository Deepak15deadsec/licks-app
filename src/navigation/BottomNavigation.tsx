import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import Svg, {
  Path
} from 'react-native-svg'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { COLORS, icons, TYPES } from "../constants"
import { Home, Search, Art, More, Reward } from '../screens/avni'
import { useColorScheme } from 'react-native';


const Tab = createBottomTabNavigator()

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
        <BottomTabBar {...props.props} />
      </View>
    )
  } else {
    return (
      <BottomTabBar {...props.props} />
    )
  }
}

const BottomNavigation = () => {
  const theme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.white,
          elevation: 0

        }
      }}
      tabBar={(props) => (
        <CustomTabBar
          props={props}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Svg width="19" height="20" viewBox="0 0 19 20">
              <Path
                d="M2.27273 17.7143H5.68182V10.8571H12.5V17.7143H15.9091V7.42857L9.09091 2.28571L2.27273 7.42857V17.7143ZM2.27273 20C1.64773 20 1.1125 19.776 0.667047 19.328C0.221593 18.88 -0.000755646 18.3421 1.92931e-06 17.7143V7.42857C1.92931e-06 7.06667 0.0806835 6.72381 0.242047 6.4C0.403411 6.07619 0.62576 5.80952 0.909093 5.6L7.72727 0.457143C7.93561 0.304762 8.15341 0.190476 8.38068 0.114286C8.60795 0.0380951 8.8447 0 9.09091 0C9.33712 0 9.57386 0.0380951 9.80114 0.114286C10.0284 0.190476 10.2462 0.304762 10.4545 0.457143L17.2727 5.6C17.5568 5.80952 17.7795 6.07619 17.9409 6.4C18.1023 6.72381 18.1826 7.06667 18.1818 7.42857V17.7143C18.1818 18.3429 17.9591 18.8811 17.5136 19.3291C17.0682 19.7771 16.5333 20.0008 15.9091 20H10.2273V13.1429H7.95455V20H2.27273Z"
                fill={theme === TYPES.dark ? COLORS.white : focused ? COLORS.white : COLORS.secondary} />
            </Svg>
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <Svg width="30" height="25" viewBox="0 0 53 55" fill="none" >

            <Path d="M4 5C4 2.23858 6.23858 0 9 0H20C22.7614 0 25 2.23858 25 5V17C25 19.7614 22.7614 22 20 22H9C6.23858 22 4 19.7614 4 17V5Z" fill="#D9D9D9" />
            <Path d="M4 30C4 27.2386 6.23858 25 9 25H20C22.7614 25 25 27.2386 25 30V42C25 44.7614 22.7614 47 20 47H9C6.23858 47 4 44.7614 4 42V30Z" fill="#D9D9D9" />
            <Path d="M28 35.5C28 29.701 32.701 25 38.5 25C44.299 25 49 29.701 49 35.5V36.5C49 42.299 44.299 47 38.5 47C32.701 47 28 42.299 28 36.5V35.5Z" fill="#D9D9D9" />
            <Path d="M28 5C28 2.23858 30.2386 0 33 0H44C46.7614 0 49 2.23858 49 5V17C49 19.7614 46.7614 22 44 22H33C30.2386 22 28 19.7614 28 17V5Z" fill="#D9D9D9" />
            <Path d="M9 0.5H20C22.4853 0.5 24.5 2.51472 24.5 5V17C24.5 19.4853 22.4853 21.5 20 21.5H9C6.51472 21.5 4.5 19.4853 4.5 17V5C4.5 2.51472 6.51472 0.5 9 0.5ZM9 25.5H20C22.4853 25.5 24.5 27.5147 24.5 30V42C24.5 44.4853 22.4853 46.5 20 46.5H9C6.51472 46.5 4.5 44.4853 4.5 42V30C4.5 27.5147 6.51472 25.5 9 25.5ZM48.5 35.5V36.5C48.5 42.0228 44.0228 46.5 38.5 46.5C32.9772 46.5 28.5 42.0228 28.5 36.5V35.5C28.5 29.9772 32.9772 25.5 38.5 25.5C44.0228 25.5 48.5 29.9772 48.5 35.5ZM33 0.5H44C46.4853 0.5 48.5 2.51472 48.5 5V17C48.5 19.4853 46.4853 21.5 44 21.5H33C30.5147 21.5 28.5 19.4853 28.5 17V5C28.5 2.51472 30.5147 0.5 33 0.5Z" stroke={theme === TYPES.dark ? COLORS.black : focused ? COLORS.white : COLORS.black} strokeWidth={3.5} fill={theme === TYPES.dark ? COLORS.white : focused ? COLORS.primary : COLORS.white} />


          </Svg>
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }}
      />

      <Tab.Screen
        name="Art"
        component={Art}
        options={{
          tabBarIcon: ({ focused }) => (
            <Svg width="12" height="20" viewBox="0 0 12 20" >
              <Path
                d="M0 13.3333H2.22222C2.22222 14.5333 3.74444 15.5556 5.55556 15.5556C7.36667 15.5556 8.88889 14.5333 8.88889 13.3333C8.88889 12.1111 7.73333 11.6667 5.28889 11.0778C2.93333 10.4889 0 9.75556 0 6.66667C0 4.67778 1.63333 2.98889 3.88889 2.42222V0H7.22222V2.42222C9.47778 2.98889 11.1111 4.67778 11.1111 6.66667H8.88889C8.88889 5.46667 7.36667 4.44444 5.55556 4.44444C3.74444 4.44444 2.22222 5.46667 2.22222 6.66667C2.22222 7.88889 3.37778 8.33333 5.82222 8.92222C8.17778 9.51111 11.1111 10.2444 11.1111 13.3333C11.1111 15.3222 9.47778 17.0111 7.22222 17.5778V20H3.88889V17.5778C1.63333 17.0111 0 15.3222 0 13.3333Z"
                fill={theme === TYPES.dark ? COLORS.white : focused ? COLORS.white : COLORS.secondary} />
            </Svg>
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }}
      />

      <Tab.Screen
        name="Reward"
        component={Reward}
        options={{
          tabBarIcon: ({ focused }) => (



            <Svg  fill="none" viewBox="0 0 24 24" strokeWidth={1.8}  width="30" height="30"  stroke={theme === TYPES.dark ? COLORS.white : focused ? COLORS.white : COLORS.secondary}  >
            <Path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"  fill={theme === TYPES.dark ? COLORS.black : focused ? COLORS.primary : COLORS.white} />
          </Svg>

          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }}
      />

      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => (
            <Svg width="20" height="14" viewBox="0 0 20 14">
              <Path
                d="M1.11111 13.3333H18.8889C19.5 13.3333 20 12.8333 20 12.2222C20 11.6111 19.5 11.1111 18.8889 11.1111H1.11111C0.5 11.1111 0 11.6111 0 12.2222C0 12.8333 0.5 13.3333 1.11111 13.3333ZM1.11111 7.77778H18.8889C19.5 7.77778 20 7.27778 20 6.66667C20 6.05556 19.5 5.55556 18.8889 5.55556H1.11111C0.5 5.55556 0 6.05556 0 6.66667C0 7.27778 0.5 7.77778 1.11111 7.77778ZM0 1.11111C0 1.72222 0.5 2.22222 1.11111 2.22222H18.8889C19.5 2.22222 20 1.72222 20 1.11111C20 0.5 19.5 0 18.8889 0H1.11111C0.5 0 0 0.5 0 1.11111Z"
                fill={theme === TYPES.dark ? COLORS.white : focused ? COLORS.white : COLORS.secondary} />
            </Svg>
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
            />
          )
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomNavigation

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