import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import ProfileScreen from '../screens/ProfileScreen';
import {useDispatch} from 'react-redux';
import {addUser} from '../redux/actions/user';
import {COLORS, FONTS} from '../constants/theme';
import {Text, TouchableOpacity, View} from 'react-native';

const Stack = createStackNavigator();

const ProfileNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white,
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  dispatch(addUser({}));
                  navigation.navigate('LandingScreen');
                }}>
                <Text style={[FONTS.body3, {color: COLORS.white}]}>Logout</Text>
                <FontAwesomeIcon
                  style={{marginHorizontal: 10}}
                  name="sign-out-alt"
                  color="white"
                  size={25}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
