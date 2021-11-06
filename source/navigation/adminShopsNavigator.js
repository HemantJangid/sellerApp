import {createStackNavigator} from '@react-navigation/stack';
import ProductDetails from '../screens/ProductDetails';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductScreen from './../screens/ProductScreen';
import AddEditProduct from './../screens/AddEditProduct';
import VerifyShops from '../screens/VerifyShops';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const AdminShopsNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Shops" headerMode="screen">
      <Stack.Screen
        name="Shops"
        component={VerifyShops}
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
      {/* <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
      <Stack.Screen
        name="AddEditProduct"
        component={AddEditProduct}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AdminShopsNavigator;
