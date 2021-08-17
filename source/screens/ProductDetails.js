import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';
import globalStyles from '../constants/styles';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Swiper from 'react-native-swiper';

const ProductDetails = ({navigation, ...props}) => {
  navigation.setOptions({title: props.route.params.headerTitle});
  const productInfo = {
    name: 'Handbag',
    description:
      'Handbag for ladies with large capacity:30 cm(Length)*13cm(Width)*23cm(Height ), a good size for carrying all your womanly needs ,pockets for phone etc, et Lots of internal pockets to separate things making them easy to find.',
    images: [
      'https://m.media-amazon.com/images/I/7164mGGMT-L._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71ma+h8YsmS._AC_SY450_.jpg',
      'https://m.media-amazon.com/images/I/81NPOJcuydS._AC_SY450_.jpg',
    ],
    price: 280,
    selling_price: 250,
    quantity: 50,
    status: 'active',
    color: 'red',
  };
  return (
    <>
      {/* <Header name={productInfo.name} /> */}
      <ScrollView style={[globalStyles.screenContainer, {marginBottom: 70}]}>
        {/* <View style={styles.productSection}></View> */}
        <View style={styles.ImageSwiperContainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            key={(item, index) => index}>
            {productInfo.images.map((image, index) => {
              return (
                <View style={styles.productImageWrapper}>
                  <Image source={{uri: image}} style={styles.productImage} />
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.HeaderContainer}>
            <View>
              <Text style={styles.productName}>{productInfo.name}</Text>
              <Text style={styles.productPrice}>₹{productInfo.price}</Text>
            </View>
            <View></View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.productDescription}>
              {productInfo.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize',
  },
  ImageSwiperContainer: {
    width: '95%',
    height: 400,
    marginHorizontal: '2.5%',
    marginTop: 15,
    borderRadius: 10,
  },
  wrapper: {},
  productImageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: 'grey',
    marginTop: 5,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
  productDescription: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    marginTop: 10,
  },
});
