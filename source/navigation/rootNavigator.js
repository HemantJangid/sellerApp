import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

// import SplashScreen from './SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import Tabs from './tabs';
import OtpScreen from './../screens/OtpScreen';

const RootStack = createStackNavigator();

const RootNavigator = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="OtpScreen" component={OtpScreen} />
    <RootStack.Screen name="Tabs" component={Tabs} />
  </RootStack.Navigator>
);

export default RootNavigator;
