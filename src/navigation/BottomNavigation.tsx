import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Svg, { Circle, Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { COLORS, icons, SIZES, TYPES } from '../constants';
import {
  Chat,
  Community,
  Creatordrop,
  Dropped,
  Drops,
  Group,
  Home,
  Pageone,
  Pagethree,
  Pagetwo,
  Taskone,
  Trade,
} from '../screens/licks';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'moti';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

let wr = (SIZES.width / 391)
let hr = (SIZES.height / 812)

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeBar" component={Home} />
      <Stack.Screen name="Pageone" component={Pageone} />
      <Stack.Screen name="Pagethree" component={Pagethree} />
    </Stack.Navigator>
  );
};

const DropStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DropsBar" component={Drops} />
      <Stack.Screen name="Dropped" component={Dropped} />
    </Stack.Navigator>
  );
};

const TaskStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskBar" component={Taskone} />
      <Stack.Screen name="Createdrop" component={Creatordrop} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatBar" component={Chat} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Group" component={Group} />
    </Stack.Navigator>
  );
};

const TabBarCustomButton = ({
  accessibilityLabel,
  accessibilityState,
  children,
  onPress,
}: any) => {
  var isSelected = accessibilityState.selected;

  const theme = useColorScheme();

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor:
                theme === TYPES.dark ? COLORS.navigation : '#0F111E',
            }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={theme === TYPES.dark ? COLORS.navigation : '#0F111E'}
            />
          </Svg>
          <View
            style={{
              flex: 1,
              backgroundColor:
                theme === TYPES.dark ? COLORS.navigation : '#0F111E',
            }}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#A259FF',
            ...styles.shadow,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          height: 50,
          backgroundColor: theme === TYPES.dark ? COLORS.navigation : '#0F111E',
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

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
            backgroundColor: '#A259FF',
          }}></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const BottomNavigation = () => {
  const theme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#A259FF',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}
      initialRouteName="Home">
      <Tab.Screen
        name="Drops"
        component={DropStack}
        options={{
          tabBarLabel: ({ focused }) => (focused ? <Text style={{ fontSize: 10, marginTop: hr * -5, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Drops</Text> : <Text style={{ fontSize: 10, marginTop: hr * -10, marginBottom: hr * 10, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Drops</Text>),
          tabBarIcon: ({ focused }) => (
            <Svg width="20" height="14" viewBox="0 0 20 14">
              <Path
                d="M1.11111 13.3333H18.8889C19.5 13.3333 20 12.8333 20 12.2222C20 11.6111 19.5 11.1111 18.8889 11.1111H1.11111C0.5 11.1111 0 11.6111 0 12.2222C0 12.8333 0.5 13.3333 1.11111 13.3333ZM1.11111 7.77778H18.8889C19.5 7.77778 20 7.27778 20 6.66667C20 6.05556 19.5 5.55556 18.8889 5.55556H1.11111C0.5 5.55556 0 6.05556 0 6.66667C0 7.27778 0.5 7.77778 1.11111 7.77778ZM0 1.11111C0 1.72222 0.5 2.22222 1.11111 2.22222H18.8889C19.5 2.22222 20 1.72222 20 1.11111C20 0.5 19.5 0 18.8889 0H1.11111C0.5 0 0 0.5 0 1.11111Z"
                fill={
                  theme === TYPES.dark
                    ? COLORS.white
                    : focused
                      ? COLORS.white
                      : COLORS.white
                }
              />
            </Svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Tasks"
        component={TaskStack}
        options={{
          tabBarLabel: ({ focused }) => (focused ? <Text style={{ fontSize: 10, marginTop: hr * -5, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Tasks</Text> : <Text style={{ fontSize: 10, marginTop: hr * -8, marginBottom: hr * 10, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Tasks</Text>),
          tabBarIcon: ({ focused }) => (
            <Svg
              fill="none"
              viewBox="0 0 27 27"
              strokeWidth={1.8}
              width="30"
              height="30"
              stroke={
                theme === TYPES.dark
                  ? COLORS.white
                  : focused
                    ? COLORS.white
                    : COLORS.white
              }>
              <Path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </Svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused }) => (focused ? <Text style={{ fontSize: 10, marginTop: hr * -5, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Home</Text> : <Text style={{ fontSize: 10, marginTop: hr * -8, marginBottom: hr * 10, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Home</Text>),
          tabBarIcon: ({ focused }) => (
            <Svg width="19" height="20" viewBox="0 0 19 20">
              <Path
                d="M2.27273 17.7143H5.68182V10.8571H12.5V17.7143H15.9091V7.42857L9.09091 2.28571L2.27273 7.42857V17.7143ZM2.27273 20C1.64773 20 1.1125 19.776 0.667047 19.328C0.221593 18.88 -0.000755646 18.3421 1.92931e-06 17.7143V7.42857C1.92931e-06 7.06667 0.0806835 6.72381 0.242047 6.4C0.403411 6.07619 0.62576 5.80952 0.909093 5.6L7.72727 0.457143C7.93561 0.304762 8.15341 0.190476 8.38068 0.114286C8.60795 0.0380951 8.8447 0 9.09091 0C9.33712 0 9.57386 0.0380951 9.80114 0.114286C10.0284 0.190476 10.2462 0.304762 10.4545 0.457143L17.2727 5.6C17.5568 5.80952 17.7795 6.07619 17.9409 6.4C18.1023 6.72381 18.1826 7.06667 18.1818 7.42857V17.7143C18.1818 18.3429 17.9591 18.8811 17.5136 19.3291C17.0682 19.7771 16.5333 20.0008 15.9091 20H10.2273V13.1429H7.95455V20H2.27273Z"
                fill={
                  theme === TYPES.dark
                    ? COLORS.white
                    : focused
                      ? COLORS.white
                      : COLORS.white
                }
              />
            </Svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Trade"
        component={Trade}
        options={{
          tabBarLabel: ({ focused }) => (focused ? <Text style={{ fontSize: 10, marginTop: hr * -5, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Trade</Text> : <Text style={{ fontSize: 10, marginTop: hr * -5, marginBottom: hr * 5, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Trade</Text>),
          tabBarIcon: ({ focused }) => (
            <Svg
              width="30"
              height="29"
              viewBox="0 0 30 29"
              fill="none"
              strokeWidth={1.8}
              stroke={
                theme === TYPES.dark
                  ? COLORS.white
                  : focused
                    ? COLORS.white
                    : COLORS.white
              }>
              <Path
                d="M8.18698 16.774L20.9999 16.7978L18.8363 20.4507M8 12.5H22M8.5 12.5L11 9M29 14.5C29 21.9558 22.732 28 15 28C7.26801 28 1 21.9558 1 14.5C1 7.04416 7.26801 1 15 1C22.732 1 29 7.04416 29 14.5Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarLabel: ({ focused }) => (focused ? <Text style={{ fontSize: 10, marginTop: hr * -5, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Chat</Text> : <Text style={{ fontSize: 10, marginTop: hr * -5, marginBottom: hr * 10, color: focused ? 'white' : theme === TYPES.dark ? COLORS.white : COLORS.white }}>Chat</Text>),
          tabBarIcon: ({ focused }) => (
            <Svg width="30" height="25" viewBox="0 0 53 55" fill="none">
              <Path
                d="M4 5C4 2.23858 6.23858 0 9 0H20C22.7614 0 25 2.23858 25 5V17C25 19.7614 22.7614 22 20 22H9C6.23858 22 4 19.7614 4 17V5Z"
                fill="#D9D9D9"
              />
              <Path
                d="M4 30C4 27.2386 6.23858 25 9 25H20C22.7614 25 25 27.2386 25 30V42C25 44.7614 22.7614 47 20 47H9C6.23858 47 4 44.7614 4 42V30Z"
                fill="#D9D9D9"
              />
              <Path
                d="M28 35.5C28 29.701 32.701 25 38.5 25C44.299 25 49 29.701 49 35.5V36.5C49 42.299 44.299 47 38.5 47C32.701 47 28 42.299 28 36.5V35.5Z"
                fill="#D9D9D9"
              />
              <Path
                d="M28 5C28 2.23858 30.2386 0 33 0H44C46.7614 0 49 2.23858 49 5V17C49 19.7614 46.7614 22 44 22H33C30.2386 22 28 19.7614 28 17V5Z"
                fill="#D9D9D9"
              />
              <Path
                d="M9 0.5H20C22.4853 0.5 24.5 2.51472 24.5 5V17C24.5 19.4853 22.4853 21.5 20 21.5H9C6.51472 21.5 4.5 19.4853 4.5 17V5C4.5 2.51472 6.51472 0.5 9 0.5ZM9 25.5H20C22.4853 25.5 24.5 27.5147 24.5 30V42C24.5 44.4853 22.4853 46.5 20 46.5H9C6.51472 46.5 4.5 44.4853 4.5 42V30C4.5 27.5147 6.51472 25.5 9 25.5ZM48.5 35.5V36.5C48.5 42.0228 44.0228 46.5 38.5 46.5C32.9772 46.5 28.5 42.0228 28.5 36.5V35.5C28.5 29.9772 32.9772 25.5 38.5 25.5C44.0228 25.5 48.5 29.9772 48.5 35.5ZM33 0.5H44C46.4853 0.5 48.5 2.51472 48.5 5V17C48.5 19.4853 46.4853 21.5 44 21.5H33C30.5147 21.5 28.5 19.4853 28.5 17V5C28.5 2.51472 30.5147 0.5 33 0.5Z"
                stroke={
                  theme === TYPES.dark
                    ? COLORS.black
                    : focused
                      ? COLORS.white
                      : COLORS.black
                }
                strokeWidth={3.5}
                fill={
                  theme === TYPES.dark
                    ? COLORS.white
                    : focused
                      ? COLORS.white
                      : COLORS.white
                }
              />
            </Svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
