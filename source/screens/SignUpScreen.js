import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import globalStyles from '../constants/styles';
import appTheme, {COLORS, FONTS, SIZES} from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import {useFormik} from 'formik';
import Header from '../components/Header';
import ImageCropPicker from 'react-native-image-crop-picker';
import requestUrls from '../constants/requestUrls';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as yup from 'yup';
import {TextField} from 'rn-material-ui-textfield';
import {ActivityIndicator} from 'react-native-paper';

const SignUpScreen = ({navigation, ...props}) => {
  const [profileImage, setProfileImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(true);
  const [address, setAddress] = useState({
    address: 'Select address on map',
    latitude: '',
    longitude: '',
  });

  function handleImageUpload() {
    ImageCropPicker.openPicker({})
      .then(image => {
        setProfileImage(image);
        var data = new FormData();
        data.append('thefile', {
          uri: image.path,
          name: 'image.png',
          type: image.mime,
        });
        setRerender(!rerender);
      })
      .catch(e => console.log(e));
  }

  const initialValues = {
    shopOwnerName: '',
    mobile: '',
    shopName: '',
    emailAddress: '',
    broaderCategory: '',
    gst: '',
    password: 'admin',
  };

  let validationSchema = yup.object().shape({
    shopOwnerName: yup.string().required(),
    mobile: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    shopName: yup.string().required(),
    emailAddress: yup.string().required().email(),
    broaderCategory: yup.string().required(),
    gst: yup.string().required(),
    // password: yup.string().required(),
  });

  const onSubmit = values => {
    setLoading(true);
    let signupData = {
      ...values,
      address: address.address,
      lat: address.latitude,
      lang: address.longitude,
      photoLength: 1,
    };

    var data = new FormData();
    Object.keys(signupData).forEach(key => data.append(key, signupData[key]));
    data.append('photos', {
      uri: profileImage.path,
      name: profileImage.path.substr(profileImage.path.lastIndexOf('/') + 1),
      type: profileImage.mime,
    });

    axios({
      method: 'post',
      url: `${requestUrls.baseUrl}${requestUrls.signUp}`,
      data: data,
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(response => {
      setLoading(false);
      if (response.status === 201) {
        Alert.alert('Sign Up', response.data, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else if (response.status === 200) {
        Alert.alert(
          'Sign Up',
          'Your shop is registered successfully. Sign In to proceed further.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
        formik.resetForm();
        setAddress({
          address: 'Select address on map',
          latitude: '',
          longitude: '',
        });
        navigation.goBack();
      }
    }).catch = err => {
      console.log(err);
    };
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleSelectAddress = () => {
    navigation.navigate('SelectAddressScreen', {
      setAddress,
      address,
    });
  };

  return (
    <>
      <Header name="SignUp" />
      <ScrollView style={[globalStyles.screenContainer]}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => handleImageUpload()}
            style={{
              height: 150,
              width: 150,
              backgroundColor: appTheme.COLORS.lightGray,
              borderRadius: 75,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 40,
            }}>
            <Image
              source={{
                uri: profileImage && profileImage.path && profileImage.path,
              }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 75,
              }}
            />
          </TouchableOpacity>
          <View style={styles.action}>
            <TextField
              label="Shop Owner Name"
              onChangeText={formik.handleChange('shopOwnerName')}
              value={formik.values.shopOwnerName}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.shopOwnerName &&
                formik.touched.shopOwnerName &&
                String(formik.errors.shopOwnerName)
              }
              onBlur={formik.handleBlur('shopOwnerName')}
            />
          </View>
          <View style={styles.action}>
            {/* <FontAwesome name="user-o" color="#696969" size={20} /> */}
            <TextField
              label="Shop Name"
              onChangeText={formik.handleChange('shopName')}
              value={formik.values.shopName}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.shopName &&
                formik.touched.shopName &&
                String(formik.errors.shopName)
              }
              onBlur={formik.handleBlur('shopName')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Phone Number"
              keyboardType="phone-pad"
              onChangeText={formik.handleChange('mobile')}
              value={formik.values.mobile}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.mobile &&
                formik.touched.mobile &&
                String(formik.errors.mobile)
              }
              onBlur={formik.handleBlur('mobile')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Email Address"
              onChangeText={formik.handleChange('emailAddress')}
              value={formik.values.emailAddress}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.emailAddress &&
                formik.touched.emailAddress &&
                String(formik.errors.emailAddress)
              }
              onBlur={formik.handleBlur('emailAddress')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Broader Category"
              onChangeText={formik.handleChange('broaderCategory')}
              value={formik.values.broaderCategory}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.broaderCategory &&
                formik.touched.broaderCategory &&
                String(formik.errors.broaderCategory)
              }
              onBlur={formik.handleBlur('broaderCategory')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Gst"
              onChangeText={formik.handleChange('gst')}
              value={formik.values.gst}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.gst &&
                formik.touched.gst &&
                String(formik.errors.gst)
              }
              onBlur={formik.handleBlur('gst')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Address"
              value={address.address}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              // error={
              //   'address is required'
              // }
            />
            <TouchableOpacity
              onPress={handleSelectAddress}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
              }}>
              <Text style={[FONTS.body4, {textDecorationLine: 'underline'}]}>
                Pick on map
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.action}>
            <TextField
              label="Password"
              onChangeText={formik.handleChange('password')}
              value={formik.values.password}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              secureTextEntry={true}
              error={
                formik.errors.password &&
                formik.touched.password &&
                String(formik.errors.password)
              }
              onBlur={formik.handleBlur('password')}
            />
          </View> */}
          <TouchableOpacity
            style={styles.commandButton}
            onPress={formik.handleSubmit}>
            {loading ? (
              <ActivityIndicator
                color={COLORS.white}
                animating={true}
                size="small"
              />
            ) : (
              <Text style={[{color: appTheme.COLORS.white}, appTheme.FONTS.h2]}>
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: appTheme.COLORS.black,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  action: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    // paddingBottom: 5,
    flex: 1,
  },
});
