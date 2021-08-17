import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import globalStyles from '../constants/styles';
import {Avatar} from 'react-native-paper';
import Header from '../components/Header';
import appTheme from '../constants/theme';

const orders = [
  {
    customerName: 'Dave',
    customerLocation: 'Mahalaxmi Nagar',
    orderValue: 4200,
  },
  {
    customerName: 'Dave',
    customerLocation: 'Mahalaxmi Nagar',
    orderValue: 4200,
  },
  {
    customerName: 'Dave',
    customerLocation: 'Mahalaxmi Nagar',
    orderValue: 4200,
  },
];

function CurrentOrders() {
  return (
    <>
      <Header name="Orders" />
      <View style={styles.currentOrderSection}>
        <Text style={appTheme.FONTS.h2}>Current Orders</Text>
        <View style={styles.orderCards}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={orders}
            renderItem={({item, index}) => {
              return (
                <TouchableHighlight
                  // onPress={() =>
                  //   props.navigation.navigate('SubProgramDetails', item)
                  // }
                  key={index}
                  style={styles.cardContainer}>
                  <View style={[styles.orderCard]}>
                    <Avatar.Text size={64} label="5" />
                    <View style={styles.orderInfo}>
                      <Text style={appTheme.FONTS.h3}>{item.customerName}</Text>
                      <Text
                        style={[
                          appTheme.FONTS.body4,
                          {color: appTheme.COLORS.gray},
                        ]}>
                        {item.customerLocation}
                      </Text>
                      <Text
                        style={[
                          appTheme.FONTS.body4,
                          {color: appTheme.COLORS.gray},
                        ]}>
                        Order Value: ₹{item.orderValue}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    </>
  );
}

function PastOrders() {
  return (
    <View style={styles.PastOrderSection}>
      <Text style={appTheme.FONTS.h2}>Past Orders</Text>
      <View style={styles.noOrderSection}>
        <Text style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
          Nothing to show here
        </Text>
      </View>
    </View>
  );
}

const OrderScreen = () => {
  return (
    <>
      <ScrollView style={[globalStyles.screenContainer, {marginBottom: 70}]}>
        <CurrentOrders />
        <PastOrders />
      </ScrollView>
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize',
  },
  currentOrderSection: {
    padding: 20,
  },
  orderCards: {
    marginTop: 20,
    width: '100%',
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  orderInfo: {
    marginLeft: 20,
  },
  PastOrderSection: {
    paddingHorizontal: 20,
  },
  noOrderSection: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
