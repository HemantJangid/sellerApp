import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';
import NotificationScreen from '../screens/NotificationScreen';
import constants from '../constants/constants';
import ProductScreen from './../screens/ProductScreen';
import ProductNavigator from './productNavigator';
import ProfileNavigator from './profileNavigator';
import orderNavigator from './orderNavigator';
import {COLORS} from '../constants/theme';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          borderRadius: 10,
          backgroundColor: COLORS.black,
          height: 70,
        },
      }}>
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Image
                source={{
                  uri: 'https://cdn.iconscout.com/icon/free/png-64/home-2456534-2036064.png',
                }}
                resizeMode="contain"
                style={[
                  styles.tabBarIconImage,
                  {
                    tintColor: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <FontAwesomeIcon
                name="boxes"
                color={
                  focused
                    ? constants.focusedTabBarIcon
                    : constants.unfocusedTabBarIcon
                }
                size={25}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={orderNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <FontAwesomeIcon
                name="shopping-bag"
                color={
                  focused
                    ? constants.focusedTabBarIcon
                    : constants.unfocusedTabBarIcon
                }
                size={25}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Orders
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Image
                source={{
                  uri: 'https://cdn.iconscout.com/icon/free/png-64/notification-2456531-2036061.png',
                }}
                resizeMode="contain"
                style={[
                  styles.tabBarIconImage,
                  {
                    tintColor: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Notification
              </Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Icon
                name="account"
                color={
                  focused
                    ? constants.focusedTabBarIcon
                    : constants.unfocusedTabBarIcon
                }
                size={25}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarIconImage: {
    width: 25,
    height: 25,
  },
  tabBarIconText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
});

export default Tabs;
