import {createStackNavigator} from '@react-navigation/stack';
import ProductDetails from '../screens/ProductDetails';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductScreen from './../screens/ProductScreen';
import AddEditProduct from './../screens/AddEditProduct';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const ProductNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Products" headerMode="screen">
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.black
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white
          },
          headerLeft: () => null,
          headerRight: () => {
            return (
              <Icon
                style={{marginRight: 10}}
                name="plus"
                color="white"
                size={25}
                onPress={() =>
                  navigation.navigate('AddEditProduct', {
                    headerTitle: 'Add Product',
                  })
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
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
      <Stack.Screen
        name="AddEditProduct"
        component={AddEditProduct}
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

export default ProductNavigator;
