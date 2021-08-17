import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import constants from '../constants/constants';
import globalStyles from '../constants/styles';
import {Picker} from '@react-native-picker/picker';
import {back} from 'react-native/Libraries/Animated/Easing';
import appTheme from '../constants/theme';

const HomeScreen = () => {
  const products = [
    {
      name: 'Handbag',
      image:
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 280,
      selling_price: 250,
      quantity: 50,
    },
    {
      name: 'Handbag',
      image:
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 280,
      selling_price: 250,
      quantity: 50,
    },
    {
      name: 'Handbag',
      image:
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 280,
      selling_price: 250,
      quantity: 50,
    },
    {
      name: 'Handbag',
      image:
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 280,
      selling_price: 250,
      quantity: 50,
    },
    {
      name: 'Handbag',
      image:
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 280,
      selling_price: 250,
      quantity: 50,
    },
    {
      name: 'Handbag',
      image:
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 280,
      selling_price: 250,
      quantity: 50,
    },
    {
      name: 'Handbag',
      image:
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 280,
      selling_price: 250,
      quantity: 50,
    },
    {
      name: 'Handbag',
      image:
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 280,
      selling_price: 250,
      quantity: 50,
    },
  ];

  return (
    <View style={globalStyles.screenContainer}>
      {/* Hello  */}
      <View style={styles.helloSection}>
        <Text style={appTheme.FONTS.h1}>Hi, John-store</Text>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7vk9e7SNQQL-ttkGz_eVFyf3neQYBUZuCA&usqp=CAU',
          }}
          style={styles.sellerImage}
        />
      </View>

      {/* Analytics Section  */}
      <View style={styles.analyticsSection}>
        <Text style={appTheme.FONTS.h2}>Analytics</Text>
        <View style={styles.analyticsCards}>
          <View style={[styles.analyticsCard, appTheme.CARDS.card1]}>
            <Text style={[appTheme.FONTS.h2, {color: appTheme.COLORS.white}]}>
              92
            </Text>
            <Text style={[appTheme.FONTS.h3, {color: appTheme.COLORS.white}]}>
              20,237
            </Text>
            <Text
              style={[appTheme.FONTS.body5, {color: appTheme.COLORS.white}]}>
              Sales
            </Text>
          </View>
          <View style={[styles.analyticsCard, appTheme.CARDS.card2]}>
            <Text style={[appTheme.FONTS.h2, {color: appTheme.COLORS.white}]}>
              92
            </Text>
            <Text style={[appTheme.FONTS.h3, {color: appTheme.COLORS.white}]}>
              20,237
            </Text>
            <Text
              style={[appTheme.FONTS.body5, {color: appTheme.COLORS.white}]}>
              Orders
            </Text>
          </View>
          <View style={[styles.analyticsCard, appTheme.CARDS.card3]}>
            <Text style={[appTheme.FONTS.h2, {color: appTheme.COLORS.white}]}>
              92
            </Text>
            <Text style={[appTheme.FONTS.h3, {color: appTheme.COLORS.white}]}>
              20,237
            </Text>
            <Text
              style={[appTheme.FONTS.body5, {color: appTheme.COLORS.white}]}>
              Customers
            </Text>
          </View>
        </View>
      </View>

      {/* Earnings Section  */}
      <View style={styles.earningsSection}>
        <Text style={appTheme.FONTS.h2}>Earnings</Text>
        <View style={styles.totalBalance}>
          <Text style={[appTheme.FONTS.h3, {color: 'grey'}]}>
            Total balance
          </Text>
          <Text style={appTheme.FONTS.h2}>₹5,892.00</Text>
        </View>
        <View style={styles.earningCard}>
          <View style={styles.earningCardHeading}>
            <Text style={appTheme.FONTS.h3}>Earning in</Text>
            <Text style={[appTheme.FONTS.h3, {color: '#185ADB'}]}> March</Text>
          </View>
          <View style={styles.earningDescription}>
            <Text style={appTheme.FONTS.body2}>₹1,680.00</Text>
            <Image
              source={{
                uri: 'https://cdn.iconscout.com/icon/free/png-64/bar-graph-1851145-1569210.png',
              }}
              style={styles.earningGraphImage}></Image>
          </View>
        </View>
      </View>

      {/* Recently added Section  */}
      {/* <View style={styles.recentlyAddedSection}>
        <Text style={styles.recentlyAddedHeading}>Recently added items</Text>
        <View style={styles.recentlyAddedCardsContainer}>
          <FlatList
            style={styles.flatListContainer}
            horizontal={true}
            data={products}
            renderItem={({item, index}) => {
              let len = products.length;
              return (
                <TouchableHighlight
                  // onPress={() =>
                  //   props.navigation.navigate('SubProgramDetails', item)
                  // }
                  key={index}
                  style={[
                    styles.cardContainer,
                    index === 0
                      ? {marginLeft: 20, marginRight: 10}
                      : {marginHorizontal: 10},
                    index === len - 1 && index !== 0
                      ? {marginLeft: 10, marginRight: 20}
                      : {marginHorizontal: 10},
                  ]}>
                  <View style={styles.cardContainer} key={index}>
                    <View
                      style={[
                        styles.cardImage,
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          zIndex: 2,
                        },
                      ]}></View>
                    <Image
                      style={styles.cardImage}
                      source={{uri: item.image}}></Image>
                    <View style={styles.cardInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>Price: {item.price}</Text>
                      <Text style={styles.itemQuantity}>
                        Quantity: {item.quantity}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </View>
      </View> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  helloSection: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sellerImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  analyticsSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  analyticsCards: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  analyticsCard: {
    width: '30%',
    padding: 15,
    borderRadius: 10,
  },
  earningsSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  totalBalance: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  earningCard: {
    width: '100%',
    backgroundColor: '#E8F6EF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  earningCardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earningDescription: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  earningGraphImage: {
    height: 50,
    width: 50,
  },
  recentlyAddedSection: {
    marginTop: 10,
  },
  recentlyAddedHeading: {
    paddingTop: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize',
  },
  recentlyAddedCardsContainer: {
    marginTop: 10,
    height: 230,
    width: '100%',
  },
  flatListContainer: {
    flex: 1,
    width: '100%',
    height: 200,
  },
  cardContainer: {
    height: 200,
    borderRadius: 10,
    width: 170,
    marginVertical: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  cardInfo: {
    textAlign: 'center',
    zIndex: 3,
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  itemName: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  itemPrice: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    marginTop: 5,
  },
  itemQuantity: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    marginTop: 5,
  },
  cardImage: {
    position: 'absolute',
    height: 200,
    width: 170,
    resizeMode: 'cover',
  },
});
