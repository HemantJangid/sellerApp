import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './source/navigation/tabs';
import RootNavigator from './source/navigation/rootNavigator';

import {ApiServices} from './source/apis/apis';

ApiServices.getProducts();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Tabs /> */}
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
