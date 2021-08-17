import {createStackNavigator} from '@react-navigation/stack';
import ProductDetails from '../screens/ProductDetails';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductScreen from './../screens/ProductScreen';
import AddEditProduct from './../screens/AddEditProduct';

const Stack = createStackNavigator();

const ProductNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Products" headerMode="screen">
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
          headerRight: () => {
            return (
              <Icon
                style={{marginRight: 10}}
                name="plus"
                color="black"
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
      />
    </Stack.Navigator>
  );
};

export default ProductNavigator;
