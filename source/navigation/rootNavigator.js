import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

// import SplashScreen from './SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import Tabs from './tabs';
import OtpScreen from './../screens/OtpScreen';
import {useSelector} from 'react-redux';
import LandingScreen from '../screens/LandingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SelectAddressScreen from '../screens/SelectAddressScreen';
import AdminTabs from './adminTabs';

const RootStack = createStackNavigator();

const RootNavigator = ({navigation}) => {
  const {userDetails} = useSelector(state => state.userReducer);
  return (
    <RootStack.Navigator
      headerMode="None"
      initialRouteName={
        userDetails.userId
          ? userDetails.role === 'ADMIN'
            ? 'AdminTabs'
            : 'Tabs'
          : 'LandingScreen'
      }
    >
      {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
      <RootStack.Screen name="LandingScreen" component={LandingScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
      <RootStack.Screen name="OtpScreen" component={OtpScreen} />
      <RootStack.Screen
        name="SelectAddressScreen"
        component={SelectAddressScreen}
      />
      <RootStack.Screen name="AdminTabs" component={AdminTabs} />
      <RootStack.Screen name="Tabs" component={Tabs} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
