import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import ProfileScreen from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';
import NotificationScreen from '../screens/NotificationScreen';
import constants from '../constants/constants';
import ProductScreen from './../screens/ProductScreen';
import ProductNavigator from './productNavigator';
import ProfileNavigator from './profileNavigator';
import orderNavigator from './orderNavigator';
import VerifyProducts from '../screens/VeriyProducts';
import VerifyShops from '../screens/VerifyShops';
import AdminProductsNavigator from './adminProductsNavigator';
import AdminShopsNavigator from './adminShopsNavigator';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
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
      <Tab.Screen
        name="AdminProductsNavigator"
        component={AdminProductsNavigator}
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
        name="AdminShopsNavigator"
        component={AdminShopsNavigator}
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
                Stores
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

export default AdminTabs;
