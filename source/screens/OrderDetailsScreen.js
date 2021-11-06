import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import globalStyles from '../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import appTheme, {COLORS, FONTS, SIZES} from './../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import requestUrls from '../constants/requestUrls';
import axios from 'axios';

const OrderDetailsScreen = ({navigation, route, ...props}) => {
  const [orderInfo, setOrderInfo] = useState(route.params.orderInfo);
  const [rerender, setRerender] = useState(true);
  const {userDetails} = useSelector(state => state.userReducer);

  function handleOrder(action) {
    let data = {checkoutId: orderInfo.checkoutInfo.checkout, status: action};
    axios
      .post(`${requestUrls.baseUrl}${requestUrls.acceptOrDeclineOrder}`, data)
      .then(response => {
        // setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setOrderInfo({
            checkoutInfo: {
              ...orderInfo.checkoutInfo,
              status: action === 'APPROVE' ? 'A' : 'D',
            },
            userInfo: {...orderInfo.userInfo},
          });
          setRerender(!rerender);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <Header name="Profile" /> */}
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image
              source={{
                uri: orderInfo.checkoutInfo.photoLink,
              }}
              size={80}
            />
            {userDetails.name && userDetails.shopName && (
              <View style={{marginLeft: 20}}>
                <Title style={appTheme.FONTS.h2}>
                  {orderInfo.checkoutInfo.name}
                </Title>
                <Caption style={appTheme.FONTS.body3}>
                  Quantity: {orderInfo.checkoutInfo.quantity}
                </Caption>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.userInfoSection, {paddingTop: 20}]}>
          {orderInfo.checkoutInfo.mrp && (
            <View style={styles.row}>
              <Text
                style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
                MRP:
              </Text>
              <Text
                style={[
                  {color: appTheme.COLORS.gray, marginLeft: 20},
                  appTheme.FONTS.body3,
                ]}>
                {orderInfo.checkoutInfo.mrp}
              </Text>
            </View>
          )}
          {orderInfo.checkoutInfo.sp && (
            <View style={styles.row}>
              <Text
                style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
                Selling Price:
              </Text>
              <Text
                style={[
                  {color: appTheme.COLORS.gray, marginLeft: 20},
                  appTheme.FONTS.body3,
                ]}>
                {orderInfo.checkoutInfo.sp}
              </Text>
            </View>
          )}
          {orderInfo.userInfo.name && (
            <View style={styles.row}>
              <Text
                style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
                Ordered By:
              </Text>
              <Text
                style={[
                  {color: appTheme.COLORS.gray, marginLeft: 20},
                  appTheme.FONTS.body3,
                ]}>
                {orderInfo.userInfo.name}
              </Text>
            </View>
          )}
          {orderInfo.userInfo.mobile && (
            <View style={styles.row}>
              <Text
                style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
                Mobile:
              </Text>
              <Text
                style={[
                  {color: appTheme.COLORS.gray, marginLeft: 20},
                  appTheme.FONTS.body3,
                ]}>
                {orderInfo.userInfo.mobile}
              </Text>
            </View>
          )}
          {orderInfo.userInfo.emailAddress && (
            <View style={styles.row}>
              <Text
                style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
                Email Id:
              </Text>
              <Text
                style={[
                  {color: appTheme.COLORS.gray, marginLeft: 20},
                  appTheme.FONTS.body3,
                ]}>
                {orderInfo.userInfo.emailAddress}
              </Text>
            </View>
          )}
        </View>
        {/* 
      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: '#dddddd',
              borderRightWidth: 1,
            },
          ]}>
          <Title style={styles.fontregular}>₹140.50</Title>
          <Caption style={styles.fontregular}>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={styles.fontregular}>12</Title>
          <Caption style={styles.fontregular}>Orders</Caption>
        </View>
      </View> */}

        {/* <View style={styles.menuWrapper}>
        <TouchableRipple style={styles.menuItemContainer} onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon
              name="credit-card"
              color={appTheme.COLORS.primary}
              size={25}
            />
            <Text
              style={[
                appTheme.FONTS.body4,
                {marginLeft: 10, color: appTheme.COLORS.primary},
              ]}>
              Payment
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple style={styles.menuItemContainer} onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon
              name="account-check-outline"
              color={appTheme.COLORS.primary}
              size={25}
            />
            <Text
              style={[
                appTheme.FONTS.body4,
                {marginLeft: 10, color: appTheme.COLORS.primary},
              ]}>
              Support
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple style={styles.menuItemContainer} onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon
              name="cog-outline"
              color={appTheme.COLORS.primary}
              size={25}
            />
            <Text
              style={[
                appTheme.FONTS.body4,
                {marginLeft: 10, color: appTheme.COLORS.primary},
              ]}>
              Settings
            </Text>
          </View>
        </TouchableRipple>
      </View> */}
      </ScrollView>
      {orderInfo.checkoutInfo.status === 'N' && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 80,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Approve Order', 'Are you sure?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => handleOrder('APPROVE')},
              ]);
            }}
            style={{
              margin: SIZES.padding,
              backgroundColor: COLORS.black,
              padding: 10,
              borderRadius: 30,
            }}>
            {/* <Text
              style={[
                FONTS.h2,
                {
                  color: COLORS.white,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                },
              ]}>
              Approve
            </Text> */}
            <Icon name="check" color={COLORS.white} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Decline Order', 'Are you sure?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => handleOrder('DECLINE')},
              ]);
            }}
            style={{
              margin: SIZES.padding,
              backgroundColor: COLORS.black,
              padding: 10,
              borderRadius: 30,
            }}>
            {/* <Text
              style={[
                FONTS.h2,
                {
                  color: COLORS.white,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                },
              ]}>
              Decline
            </Text> */}
            <Icon name="cancel" color={COLORS.white} size={30} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingTop: 20,
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItemContainer: {
    backgroundColor: 'white',
    marginBottom: 2,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
