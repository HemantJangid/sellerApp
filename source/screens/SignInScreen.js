import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import globalStyles from './../constants/styles';
import {COLORS, FONTS, SIZES} from './../constants/theme';

const SignInScreen = ({navigation}) => {
  const [number, setNumber] = useState('');

  function onChangeNumber(number) {
    setNumber(number);
  }

  function handleSubmit() {
    if (number.length > 0) {
      navigation.navigate('OtpScreen');
    }
  }

  return (
    <View
      style={[globalStyles.screenContainer, {backgroundColor: COLORS.gray}]}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: SIZES.padding,
          borderTopLeftRadius: SIZES.padding,
          borderTopRightRadius: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <Text style={FONTS.body2}>Enter your mobile number to continue</Text>
        <TextInput
          onChangeText={number => onChangeNumber(number)}
          value={number}
          keyboardType="numeric"
          style={[
            FONTS.body2,
            {
              marginTop: SIZES.padding,
              backgroundColor: COLORS.lightGray1,
              color: COLORS.black,
              borderRadius: SIZES.radius,
              padding: SIZES.padding,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            marginTop: SIZES.padding,
            backgroundColor:
              number.length > 0 ? COLORS.black : COLORS.lightGray,
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
          }}>
          <Text
            style={[
              FONTS.h2,
              {
                color: number.length > 0 ? COLORS.white : COLORS.gray,
                textAlign: 'center',
                textTransform: 'uppercase',
              },
            ]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
