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
            <Svg width="20" height="20" viewBox="0 0 20 20">
              <Path
                d="M14.6654 12.8982H13.7386L13.4101 12.5816C14.1433 11.7304 14.6791 10.7278 14.9792 9.64545C15.2794 8.56313 15.3364 7.42789 15.1463 6.32096C14.595 3.06167 11.8734 0.458926 8.58873 0.0603082C7.43396 -0.0856965 6.26107 0.0342475 5.15981 0.410962C4.05855 0.787676 3.05812 1.41118 2.23506 2.23375C1.412 3.05633 0.788138 4.05617 0.411203 5.15679C0.0342676 6.2574 -0.0857468 7.4296 0.0603435 8.5837C0.459195 11.8664 3.06346 14.5864 6.32466 15.1374C7.43224 15.3274 8.56815 15.2704 9.6511 14.9704C10.7341 14.6705 11.7373 14.135 12.589 13.4023L12.9057 13.7306V14.6568L17.8914 19.6395C18.3723 20.1202 19.1583 20.1202 19.6393 19.6395C20.1202 19.1588 20.1202 18.3733 19.6393 17.8926L14.6654 12.8982ZM7.6268 12.8982C4.70579 12.8982 2.34788 10.5416 2.34788 7.62233C2.34788 4.70304 4.70579 2.3465 7.6268 2.3465C10.5478 2.3465 12.9057 4.70304 12.9057 7.62233C12.9057 10.5416 10.5478 12.8982 7.6268 12.8982Z"
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
        name="Art"
        component={Art}
        options={{
          tabBarIcon: ({ focused }) => (
            <Svg width="12" height="20" viewBox="0 0 12 20">
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
            <Svg width="12" height="20" viewBox="0 0 12 20">
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