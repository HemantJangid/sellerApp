import {createStackNavigator} from '@react-navigation/stack';
import ProductDetails from '../screens/ProductDetails';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductScreen from './../screens/ProductScreen';
import AddEditProduct from './../screens/AddEditProduct';
import VerifyProducts from '../screens/VeriyProducts';
import { addUser } from '../redux/actions/user';
import { useDispatch } from 'react-redux';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const AdminProductsNavigator = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator initialRouteName="Products" headerMode="screen">
      <Stack.Screen
        name="Products"
        component={VerifyProducts}
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
                name="logout"
                color="white"
                size={25}
                onPress={() => {
                  dispatch(addUser({}));
                  navigation.navigate('LandingScreen');
                }}
              />
            );
          },
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
      /> */}
      {/* <Stack.Screen
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

export default AdminProductsNavigator;
