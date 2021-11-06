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

const VerifyShops = ({navigation}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [rerender, setrerender] = useState(true);
  const [shops, setShops] = useState([]);
  const [approveLoading, setApproveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredShops, setFilteredShops] = useState([]);
  const [filters, setFilters] = useState([]);

  const {userDetails} = useSelector(state => state.userReducer);

  useEffect(() => {
    getShops();
  }, []);

  useEffect(() => {
    filtershops();
  }, [filters]);

  function getShops() {
    setLoading(true);
    axios.get(`${requestUrls.baseUrl}${requestUrls.shops}`).then(response => {
      setLoading(false);
      console.log(response);
      if (response.status === 201) {
      } else if (response.status === 200) {
        let temp = response.data;
        let unVerifiedshops = temp.filter(item => !item.verified);
        let newshops = unVerifiedshops.map(item => {
          return {...item, checked: false};
        });
        setShops(newshops);
        setLoading(false);
      }
    }).catch = err => {
      console.log(err);
    };
  }

  function filtershops() {
    let filteredShops = [];
    for (let i = 0; i < shops.length; i++) {
      for (let j = 0; j < filters.length; j++) {
        if (shops[i].categoryId === filters[j].value) {
          filteredShops.push(shops[i]);
        }
      }
    }
    setFilteredShops(filteredShops);
    setrerender(!rerender);
  }

  function handleToggle(id, checked) {
    let data = shops;
    let shopIndex = data.findIndex(item => item.shopId === id);
    data[shopIndex].checked = checked;
    setShops(data);
    setrerender(!rerender);
  }

  function approveshops() {
    setApproveLoading(true);
    let selectedShops = '';
    shops.forEach((item, index) => {
      if (item.checked) selectedShops += `${item.shopId},`;
    });
    selectedShops = selectedShops.slice(0, selectedShops.length - 1);
    let data = {
      shopIds: selectedShops,
      isVerified: 1,
    };
    axios
      .post(`${requestUrls.baseUrl}${requestUrls.approveShopsAdmin}`, data)
      .then(response => {
        setApproveLoading(false);
        console.log(response);
        if (response.status === 201) {
          Alert.alert('Failed', response.data, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else if (response.status === 200) {
          Alert.alert('Success!', 'Products approved successfully.', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          getShops();
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function shopCard({item, index}) {
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
          {marginBottom: index === shops.length - 1 ? 110 : 10},
        ]}>
        <View style={[styles.shopCard]}>
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
                onValueChange={checked => handleToggle(item.shopId, checked)}
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
                GST:
              </Text>
              <Text
                style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
                {item.gst}
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
                {item.broaderCategory}
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

  //   function productFilterAndSort() {
  //     return (
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           justifyContent: 'flex-end',
  //           marginBottom: 20,
  //         }}>
  //         {/* <TouchableOpacity onPress={() => setShowSortModal(true)}>
  //           <Icon name="sort-variant" color={appTheme.COLORS.gray} size={30} />
  //         </TouchableOpacity> */}
  //         <TouchableOpacity onPress={() => setShowFilterModal(true)}>
  //           <Icon name="filter" color={appTheme.COLORS.gray} size={30} />
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }

  return (
    <>
      {/* Filter */}
      {/* {showFilterModal && (
        <FilterModal
          filtershops={filtershops}
          filters={filters}
          setFilters={setFilters}
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )} */}

      {/* {showSortModal && (
        <SortModal
          isVisible={showSortModal}
          onClose={() => setShowSortModal(false)}
        />
      )} */}

      {/* <Header name="Shops" /> */}
      <View style={styles.shopsection}>
        <View style={styles.shopCards}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={filters.length > 0 ? filteredShops : shops}
            style={{paddingTop: 20, marginBottom: 150}}
            // ListHeaderComponent={() => productFilterAndSort()}
            renderItem={({item, index}) => shopCard({item, index})}
            keyExtractor={(item, index) => index}
            onRefresh={() => getShops()}
            refreshing={loading}
          />

          {filters.length > 0 && filteredShops.length === 0 && (
            <Text
              style={[
                appTheme.FONTS.body3,
                {textAlign: 'center', marginTop: appTheme.SIZES.padding},
              ]}>
              No shops to show here.
            </Text>
          )}

          {filters.length === 0 && shops.length === 0 && (
            <Text
              style={[
                appTheme.FONTS.body3,
                {textAlign: 'center', marginTop: appTheme.SIZES.padding},
              ]}>
              No shops to show here.
            </Text>
          )}
        </View>
      </View>

      {shops.length > 0 && filters.length === 0 && (
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
            onPress={() => approveshops()}
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

      {shops.length > 0 && filters.length > 0 && filtershops.length > 0 && (
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
            onPress={() => approveshops()}
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

export default VerifyShops;

const styles = StyleSheet.create({
  shopsection: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  shopCards: {
    width: '100%',
  },
  shopCard: {
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
