import React, {useState, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import globalStyles from '../constants/styles';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import appTheme, {FONTS, SIZES} from '../constants/theme';

import ToggleSwitch from 'toggle-switch-react-native';

import FilterModal from './FilterModal';
import SortModal from './SortModal';
import {COLORS} from './../constants/theme';
import {useSelector} from 'react-redux';
import {axiosAll} from '../utility/axiosAll';
import axios from 'axios';
import requestUrls from '../constants/requestUrls';
import CheckBox from '@react-native-community/checkbox';

const VerifyProducts = ({navigation}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [rerender, setrerender] = useState(true);
  const [products, setProducts] = useState([]);
  const selectedProducts = [];
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState([]);

  const {userDetails} = useSelector(state => state.userReducer);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters]);

  function getProducts() {
    setLoading(true);
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.products}`, {
        params: {shopId: -1},
      })
      .then(response => {
        console.log(response);
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          let temp = response.data.products;
          let unVerifiedProducts = temp.filter(item => !item.verified);
          let newProducts = unVerifiedProducts.map(item => {
            return {...item, checked: false};
          });
          setProducts(newProducts);
          setLoading(false);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function filterProducts() {
    let filteredProducts = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < filters.length; j++) {
        if (products[i].categoryId === filters[j].value) {
          filteredProducts.push(products[i]);
        }
      }
    }
    setFilteredProducts(filteredProducts);
    setrerender(!rerender);
  }

  function handleToggle(id, checked) {
    let data = products;
    let productIndex = data.findIndex(item => item.productId === id);
    data[productIndex].checked = checked;
    setProducts(data);
    setrerender(!rerender);
  }

  function approveProducts() {
    setApproveLoading(true);
    let selectedProducts = '';
    products.forEach((item, index) => {
      if (item.checked) selectedProducts += `${item.productId},`;
    });
    selectedProducts = selectedProducts.slice(0, selectedProducts.length - 1);
    let data = {
      productIds: selectedProducts,
      isVerified: 1,
    };
    axios
      .post(`${requestUrls.baseUrl}${requestUrls.approveProductsAdmin}`, data)
      .then(response => {
        console.log(response);
        setApproveLoading(false);
        if (response.status === 201) {
          Alert.alert('Failed', response.data, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else if (response.status === 200) {
          Alert.alert('Success!', 'Products approved successfully.', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          getProducts();
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function productCard({item, index}) {
    return (
      <TouchableHighlight
        // onPress={() => {
        //   navigation.navigate('ProductDetails', {
        //     headerTitle: item.name,
        //     productInfo: item,
        //   });
        // }}
        style={[
          styles.cardContainer,
          {marginBottom: index === products.length - 1 ? 110 : 10},
        ]}>
        <View style={[styles.productCard]}>
          <Image source={{uri: item.photoLink}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[appTheme.FONTS.h3, {width: '75%'}]}>
                {item.name}
              </Text>
              <CheckBox
                tintColors={{true: COLORS.black, false: COLORS.lightGray}}
                value={item.checked}
                onValueChange={checked => handleToggle(item.productId, checked)}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                Quantity:
              </Text>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                {item.quantity}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                Selling price:
              </Text>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                ₹{item.sp}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                MRP:
              </Text>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                ₹{item.mrp}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                Category:
              </Text>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                {item.categoryName}
              </Text>
            </View>
            {/* <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {item.tags.map((tag, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 10,
                      backgroundColor: COLORS.lightGray,
                      marginRight: 5,
                      marginVertical: 10,
                      borderRadius: 15,
                    }}>
                    <Text>{tag}</Text>
                  </View>
                );
              })}
            </View> */}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  function productFilterAndSort() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 20,
        }}>
        {/* <TouchableOpacity onPress={() => setShowSortModal(true)}>
          <Icon name="sort-variant" color={appTheme.COLORS.gray} size={30} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Icon name="filter" color={appTheme.COLORS.gray} size={30} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {/* Filter */}
      {showFilterModal && (
        <FilterModal
          filterProducts={filterProducts}
          filters={filters}
          setFilters={setFilters}
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* {showSortModal && (
        <SortModal
          isVisible={showSortModal}
          onClose={() => setShowSortModal(false)}
        />
      )} */}

      {/* <Header name="Products"/> */}
      <View style={styles.productSection}>
        <View style={styles.productCards}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={filters.length > 0 ? filteredProducts : products}
            style={{paddingTop: 20, marginBottom: 150}}
            ListHeaderComponent={() => productFilterAndSort()}
            renderItem={({item, index}) => productCard({item, index})}
            keyExtractor={(item, index) => index}
            onRefresh={() => getProducts()}
            refreshing={loading}
          />

          {filters.length > 0 && filteredProducts.length === 0 && (
            <Text
              style={[
                appTheme.FONTS.body3,
                {textAlign: 'center', marginTop: appTheme.SIZES.padding},
              ]}>
              No Products to show here.
            </Text>
          )}

          {filters.length === 0 && products.length === 0 && (
            <Text
              style={[
                appTheme.FONTS.body3,
                {textAlign: 'center', marginTop: appTheme.SIZES.padding},
              ]}>
              No Products to show here.
            </Text>
          )}
        </View>
      </View>

      {products.length > 0 && filters.length === 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 65,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => approveProducts()}
            style={{
              margin: SIZES.padding,
              width: '100%',
              backgroundColor: COLORS.black,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}>
            <Text
              style={[
                FONTS.h2,
                {
                  color: COLORS.white,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                },
              ]}>
              Approve
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {products.length > 0 && filters.length > 0 && filterProducts.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 65,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => approveProducts()}
            style={{
              margin: SIZES.padding,
              width: '100%',
              backgroundColor: COLORS.black,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}>
            {approveLoading ? (
              <ActivityIndicator
                color={COLORS.white}
                animating={true}
                size="small"
              />
            ) : (
              <Text
                style={[
                  FONTS.h2,
                  {
                    color: COLORS.white,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  },
                ]}>
                Approve
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default VerifyProducts;

const styles = StyleSheet.create({
  productSection: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  productCards: {
    width: '100%',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    height: '100%',
    width: '35%',
    resizeMode: 'cover',
  },
  productInfo: {
    width: '65%',
    padding: 20,
  },
});
