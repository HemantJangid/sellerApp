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
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import appTheme, {FONTS} from '../constants/theme';

import ToggleSwitch from 'toggle-switch-react-native';

import FilterModal from './FilterModal';
import SortModal from './SortModal';
import {COLORS} from './../constants/theme';

const ProductScreen = ({navigation}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [rerender, setrerender] = useState(true);

  const data = [
    {
      id: 1,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 2,
      name: 'Handbag',
      images: [
        'https://5.imimg.com/data5/WB/SS/MY-59654262/ladies-designer-handbag-500x500.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 3,
      name: 'Handbag',
      images: [
        'https://m.media-amazon.com/images/I/7164mGGMT-L._AC_SL1500_.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 4,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 5,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 6,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'inactive',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 7,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 8,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'inactive',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 9,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'inactive',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 10,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 11,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
  ];

  const [products, setProducts] = useState(data);

  function handleToggle(id, isOn) {
    let data = products;
    let productIndex = data.findIndex(item => item.id === id);
    data[productIndex].status = isOn ? 'active' : 'inactive';
    setProducts(data);
    setrerender(!rerender);
  }

  function changeQuantity(changeType, id) {
    let data = products;
    let productIndex = data.findIndex(item => item.id === id);
    data[productIndex].quantity += changeType === 'increase' ? 1 : -1;
    setProducts(data);
    setrerender(!rerender);
  }

  function productCard({item, index}) {
    return (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('ProductDetails', {
            headerTitle: item.name,
          })
        }
        style={[
          styles.cardContainer,
          {marginBottom: index === products.length - 1 ? 110 : 10},
        ]}>
        <View style={[styles.productCard]}>
          <Image source={{uri: item.images[0]}} style={styles.productImage} />
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
                isOn={item.status === 'active'}
                onColor="green"
                size="small"
                onToggle={isOn => handleToggle(item.id, isOn)}
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
                    onPress={() => changeQuantity('decrease', item.id)}
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
                    onPress={() => changeQuantity('increase', item.id)}
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
                ₹{item.selling_price}
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
                {item.category}
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
          marginBottom: 20,
        }}>
        <TouchableOpacity onPress={() => setShowSortModal(true)}>
          <Icon name="sort-variant" color={appTheme.COLORS.gray} size={30} />
        </TouchableOpacity>
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
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {showSortModal && (
        <SortModal
          isVisible={showSortModal}
          onClose={() => setShowSortModal(false)}
        />
      )}

      {/* <Header name="Products" button="plus" navigation={navigation} /> */}
      <View style={styles.productSection}>
        <View style={styles.productCards}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={products}
            style={{paddingTop: 20}}
            ListHeaderComponent={() => productFilterAndSort()}
            renderItem={({item, index}) => productCard({item, index})}
            keyExtractor={(item, index) => index}
          />
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
