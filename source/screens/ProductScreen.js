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
} from 'react-native';
import globalStyles from '../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import appTheme, {FONTS} from '../constants/theme';

import ToggleSwitch from 'toggle-switch-react-native';

import FilterModal from './FilterModal';
import SortModal from './SortModal';
import {COLORS} from './../constants/theme';
import {useSelector} from 'react-redux';
import {axiosAll} from '../utility/axiosAll';
import axios from 'axios';
import requestUrls from '../constants/requestUrls';
import {TextInput} from 'react-native';

const ProductScreen = ({navigation}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [rerender, setrerender] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {userDetails} = useSelector(state => state.userReducer);

  useEffect(() => {
    navigation.addListener('focus', payload => {
      getProducts();
    });
  }, []);

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
        params: {shopId: userDetails.shopId, verified: 1},
      })
      .then(response => {
        console.log("products: ", response);
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setProducts(response.data.products);
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

  function handleToggle(id, isOn) {
    let data = products;
    let productIndex = data.findIndex(item => item.productId === id);
    data[productIndex].isLive = isOn;
    axios
      .post(`${requestUrls.baseUrl}${requestUrls.changeStatus}`, {
        productIds: `${data[productIndex].productId}`,
        isLive: data[productIndex].isLive ? 1 : 0,
      })
      .then(response => {
        if (response.status === 200) {
          console.log('successfull request');
        }
      }).catch = err => {
      console.log(err);
    };
    setProducts(data);
    setrerender(!rerender);
  }

  function changeQuantity(changeType, id) {
    let data = products;
    let productIndex = data.findIndex(item => item.productId === id);
    data[productIndex].quantity += changeType === 'increase' ? 1 : -1;
    axios
      .post(`${requestUrls.baseUrl}${requestUrls.changeQuantity}`, {
        productId: data[productIndex].productId,
        quantity: data[productIndex].quantity,
      })
      .then(response => {
        if (response.status === 200) {
          console.log('successfull request');
        }
      }).catch = err => {
      console.log(err);
    };
    setProducts(data);
    setrerender(!rerender);
  }

  function productCard({item, index}) {
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('ProductDetails', {
            headerTitle: item.name,
            productInfo: item,
          });
        }}
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
              <ToggleSwitch
                isOn={item.isLive}
                onColor="green"
                size="small"
                onToggle={isOn => handleToggle(item.productId, isOn)}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                Quantity:
              </Text>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: COLORS.lightGray,
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="minus"
                    color="black"
                    size={25}
                    onPress={() => changeQuantity('decrease', item.productId)}
                  />
                </View>
                <Text style={[FONTS.body3, {marginHorizontal: 10}]}>
                  {item.quantity}
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.lightGray,
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="plus"
                    color="black"
                    size={25}
                    onPress={() => changeQuantity('increase', item.productId)}
                  />
                </View>
              </View>
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
          justifyContent: 'space-between',
          marginVertical: 10,
          paddingHorizontal: 10,
        }}>
        {/* <TouchableOpacity onPress={() => setShowSortModal(true)}>
          <Icon name="sort-variant" color={appTheme.COLORS.gray} size={30} />
        </TouchableOpacity> */}
        <View
          style={{
            flexDirection: 'row',
            width: '88%',
            backgroundColor: COLORS.lightGray,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 8,
            height: 50,
            borderRadius: 30,
          }}>
          <TextInput
            key="searchText"
            style={[
              FONTS.body3,
              {
                height: 50,
                width: '88%',
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
                paddingLeft: 20,
              },
            ]}
            placeholder="Search"
            placeholderTextColor={COLORS.gray}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={() => {
              console.log('search: ', searchQuery);
            }}
          />
          {searchQuery.length !== 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
              }}
              style={{marginRight: 10}}>
              <Icon name="cancel" color={appTheme.COLORS.gray} size={20} />
            </TouchableOpacity>
          )}
        </View>
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

      {/* <Header name="Products" button="plus" navigation={navigation} /> */}
      {productFilterAndSort()}
      <View style={styles.productSection}>
        <View style={styles.productCards}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={filters.length > 0 ? filteredProducts : products}
            style={{
              marginBottom: 70
            }}
            // ListHeaderComponent={() => productFilterAndSort()}
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
    </>
  );
};

export default ProductScreen;

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
