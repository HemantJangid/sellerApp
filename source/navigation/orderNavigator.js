import {createStackNavigator} from '@react-navigation/stack';
import ProductDetails from '../screens/ProductDetails';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductScreen from './../screens/ProductScreen';
import AddEditProduct from './../screens/AddEditProduct';
import OrderScreen from '../screens/OrderScreen';
import OrderDetails from '../screens/OrderDetailsScreen';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const orderNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Orders" headerMode="screen">
      <Stack.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.black
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black
          },
          headerTitleContainerStyle: {
            left: 50
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default orderNavigator;
