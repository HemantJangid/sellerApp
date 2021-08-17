import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';
import NotificationScreen from '../screens/NotificationScreen';
import constants from '../constants/constants';
import ProductScreen from './../screens/ProductScreen';
import ProductNavigator from './productNavigator';

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
          backgroundColor: '#ffffff',
          height: 70,
        },
      }}>
      <Tab.Screen
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
      />
      <Tab.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Image
                source={{
                  uri: 'https://image.flaticon.com/icons/png/128/1768/1768327.png',
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
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Image
                source={{
                  uri: 'https://cdn.iconscout.com/icon/free/png-64/bag-2456546-2036076.png',
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
                Orders
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
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
      />
      <Tab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Image
                source={{
                  uri: 'https://cdn.iconscout.com/icon/free/png-64/profile-1481935-1254808.png',
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
