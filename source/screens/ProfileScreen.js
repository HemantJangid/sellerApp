import React from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
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
import appTheme from './../constants/theme';
import {useDispatch, useSelector} from 'react-redux';

const ProfileScreen = () => {
  const {userDetails} = useSelector(state => state.userReducer);
  return (
    <ScrollView style={styles.container}>
      {/* <Header name="Profile" /> */}
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          {userDetails.name && userDetails.shopName && (
            <View style={{marginLeft: 20}}>
              <Title style={appTheme.FONTS.h2}>{userDetails.shopName}</Title>
              <Caption style={appTheme.FONTS.body3}>{userDetails.name}</Caption>
            </View>
          )}
        </View>
      </View>

      <View style={[styles.userInfoSection, {paddingTop: 20}]}>
        {userDetails.address && (
          <View style={styles.row}>
            <Text
              style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
              Address:
            </Text>
            <Text
              style={[
                {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                appTheme.FONTS.body3,
              ]}>
              {userDetails.address}
            </Text>
          </View>
        )}
        {userDetails.mobile && (
          <View style={styles.row}>
            <Text
              style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
              Mobile:
            </Text>
            <Text
              style={[
                {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                appTheme.FONTS.body3,
              ]}>
              {userDetails.mobile}
            </Text>
          </View>
        )}
        {userDetails.emailAddress && (
          <View style={styles.row}>
            <Text
              style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
              Email Id:
            </Text>
            <Text
              style={[
                {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                appTheme.FONTS.body3,
              ]}>
              {userDetails.emailAddress}
            </Text>
          </View>
        )}
        {userDetails.broaderCategory && (
          <View style={styles.row}>
            <Text
              style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
              Category:
            </Text>
            <Text
              style={[
                {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                appTheme.FONTS.body3,
              ]}>
              {userDetails.broaderCategory}
            </Text>
          </View>
        )}
        {userDetails.gst && (
          <View style={styles.row}>
            <Text
              style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
              GST:
            </Text>
            <Text
              style={[
                {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                appTheme.FONTS.body3,
              ]}>
              {userDetails.gst}
            </Text>
          </View>
        )}
        {userDetails.quota && (
          <View style={styles.row}>
            <Text
              style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
              Quota:
            </Text>
            <Text
              style={[
                {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                appTheme.FONTS.body3,
              ]}>
              {userDetails.quota}
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
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
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
