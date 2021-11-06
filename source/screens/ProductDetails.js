import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../constants/styles';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Swiper from 'react-native-swiper';
import requestUrls from '../constants/requestUrls';
import axios from 'axios';
import {COLORS, FONTS} from '../constants/theme';

const ProductDetails = ({navigation, route, ...props}) => {
  navigation.setOptions({title: route.params.headerTitle});
  const [productInfo, setProductInfo] = useState(route.params.productInfo);
  const [rerender, setRerender] = useState(true);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    getAllPhotos();
  }, []);

  function getAllPhotos() {
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.productImages}`, {
        params: {
          productId: productInfo.productId,
        },
      })
      .then(response => {
        if (response.status === 200) {
          setProductImages(response.data);
          setRerender(!rerender);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function getProductAttrs() {
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.productAttributes}`, {
        params: {
          productId: productInfo.productId,
        },
      })
      .then(response => {
        if (response.status === 200) {
          setProductImages(response.data);
          setRerender(!rerender);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  return (
    <>
      {/* <Header name={productInfo.name} /> */}

      <ScrollView
        style={[globalStyles.screenContainer, {marginBottom: 70}]}
        showsVerticalScrollIndicator={false}>
        {/* <View style={styles.productSection}></View> */}
        {productImages && (
          <View style={styles.ImageSwiperContainer}>
            <Swiper
              style={styles.wrapper}
              showsButtons={false}
              key={(item, index) => index}>
              {productImages.map((image, index) => {
                return (
                  <View style={styles.productImageWrapper} key={index}>
                    <Image
                      source={{uri: image.photoAddress}}
                      style={styles.productImage}
                    />
                  </View>
                );
              })}
            </Swiper>
          </View>
        )}
        <View style={styles.infoContainer}>
          <View style={styles.HeaderContainer}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.productName}>{productInfo.name}</Text>
                {/* <TouchableOpacity
                  onPress={() => {
                    console.log('going to product edit');
                    navigation.navigate('AddEditProduct', {
                      product: productInfo,
                      headerTitle: 'Edit Product',
                    });
                  }}
                  style={{}}>
                  <Text
                    style={[FONTS.body4, {textDecorationLine: 'underline'}]}>
                    Edit Product
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    console.log('going to product edit');
                    navigation.navigate('AddEditProduct', {
                      product: productInfo,
                      headerTitle: 'Edit Product'
                    });
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.black,
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                  }}>
                  <Icon name="pencil" color={COLORS.white} size={30} />
                </TouchableOpacity>
              </View>
              <Text style={styles.productPrice}>Mrp: ₹{productInfo.mrp}</Text>
              <Text style={styles.productPrice}>
                Selling Price: ₹{productInfo.sp}
              </Text>
            </View>
            <View></View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.productDescription}>
              {productInfo.productSpecification}
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
