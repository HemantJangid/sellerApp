import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import globalStyles from '../constants/styles';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import Header from '../components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import {useFormik} from 'formik';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import appTheme, {COLORS, FONTS} from '../constants/theme';
import {resolvePlugin} from '@babel/core';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {TextField} from 'rn-material-ui-textfield';
import requestUrls from '../constants/requestUrls';
import {axiosAll} from '../utility/axiosAll';

const AddEditProduct = ({navigation, route, ...props}) => {
  const {userDetails} = useSelector(state => state.userReducer);
  const [categories, setCategories] = useState([]);
  const [rerender, setRerender] = useState(true);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);
  navigation.setOptions({title: route.params.headerTitle});

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.categories}`)
      .then(response => {
        if (response.status === 200) {
          let temp = response.data;
          let categories = temp.categories;
          let uniqueCategories = [];
          for (let i = 0; i < categories.length; i++) {
            let addCategory = true;
            for (let j = 0; j < uniqueCategories.length; j++) {
              if (
                categories[i].categoryName === uniqueCategories[j].categoryName
              ) {
                addCategory = false;
                break;
              }
            }
            if (addCategory) uniqueCategories.push(categories[i]);
          }
          uniqueCategories.push({
            categoryId: -1,
            categoryName: 'Other',
          });
          setCategories(uniqueCategories);
          setRerender(!rerender);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function handleImageUpload() {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 5,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(images => {
        console.log(images);
        let tempImages = [];
        for (let i = 0; i < images.length; i++) {
          let image = {
            uri: images[i].path,
            type: images[i].mime,
            name: images[i].path.substr(images[i].path.lastIndexOf('/') + 1),
          };
          tempImages.push(image);
        }
        setProductImages(tempImages);
        setRerender(!rerender);
      })
      .catch(e => console.log(e));
  }

  // const initialValues = {
  //   shopId: userDetails.shopId,
  //   categoryId: route.params.product ? route.params.product.categoryId : 4,
  //   categoryName: '',
  //   subCategory: '',
  //   vertical: '',
  //   productName: route.params.product
  //     ? route.params.product.name
  //     : 'new product',
  //   mrp: route.params.product ? route.params.product.mrp : 450,
  //   sp: route.params.product ? route.params.product.sp : 200,
  //   quantity: route.params.product ? route.params.product.quantity : 50,
  //   productSpecification: route.params.product
  //     ? route.params.product.productSpecification
  //     : 'New Product by hemant for testing',
  //   // productSpecificationKey: '',
  //   // productSpecificationValue: '',
  // };

  const initialValues = {
    shopId: userDetails.shopId,
    categoryId: route.params.product ? route.params.product.categoryId : '',
    categoryName: '',
    subCategory: '',
    vertical: '',
    productName: route.params.product ? route.params.product.name : '',
    mrp: route.params.product ? route.params.product.mrp : '',
    sp: route.params.product ? route.params.product.sp : '',
    quantity: route.params.product ? route.params.product.quantity : '',
    productSpecification: route.params.product
      ? route.params.product.productSpecification
      : '',
    // productSpecificationKey: '',
    // productSpecificationValue: '',
  };

  const onSubmit = values => {
    setLoading(true);
    var data = new FormData();
    Object.keys(values).forEach(key => data.append(key, values[key]));
    productImages.map((image, index) => {
      data.append('photos', image);
    });
    data.append('photoLength', productImages.length);

    if (route.params.product) {
      values['productId'] = route.params.product.productId;
      console.log(values);
      axios({
        method: 'post',
        url: `${requestUrls.baseUrl}${requestUrls.updateProduct}`,
        data: values,
      }).then(response => {
        console.log(response);
        setLoading(false);
        if (response.status === 201) {
          Alert.alert('Add Product Failed', response.data, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else if (response.status === 200) {
          Alert.alert('Success', 'Product updated successfully', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          navigation.navigate('Products');
        }
      }).catch = err => {
        Alert.alert('Add Product Failed', err, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        console.log(err);
      };
    } else {
      axios({
        method: 'post',
        url: `${requestUrls.baseUrl}${requestUrls.addProduct}`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then(response => {
        setLoading(false);
        if (response.status === 201) {
          Alert.alert('Add Product Failed', response.data, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else if (response.status === 200) {
          Alert.alert('Success', 'Product added successfully', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          navigation.goBack();
        }
      }).catch = err => {
        Alert.alert('Add Product Failed', err, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        console.log(err);
      };
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const renderCategory = category => {
    return (
      <Text
        style={[
          appTheme.FONTS.body3,
          {
            paddingVertical: 10,
            paddingLeft: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#696969',
          },
        ]}>
        {category.categoryName}
      </Text>
    );
  };

  function getCategory(id) {
    let category;
    categories.forEach((item, index) => {
      console.log(id, item.id);
      if (item.id === id) {
        category = item;
      }
    });
    return category && category.categoryName ? category.categoryName : '';
  }

  return (
    <>
      {/* <Header name={productInfo.name} /> */}
      <ScrollView
        style={[globalStyles.screenContainer, {marginBottom: 70}]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.action}>
            <TextField
              label="Name"
              onChangeText={formik.handleChange('productName')}
              value={formik.values.productName}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.productName &&
                formik.touched.productName &&
                String(formik.errors.productName)
              }
              onBlur={formik.handleBlur('productName')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Mrp"
              onChangeText={formik.handleChange('mrp')}
              value={formik.values.mrp}
              keyboardType="number-pad"
              inputContainerStyle={{
                width: '100%',
                borderBottomColor: COLORS.lightGray,
                borderBottomWidth: 1,
              }}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.mrp &&
                formik.touched.mrp &&
                String(formik.errors.mrp)
              }
              onBlur={formik.handleBlur('mrp')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Selling Price"
              onChangeText={formik.handleChange('sp')}
              keyboardType="number-pad"
              value={formik.values.sp}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.sp &&
                formik.touched.sp &&
                String(formik.errors.sp)
              }
              onBlur={formik.handleBlur('sp')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Quantity"
              onChangeText={formik.handleChange('quantity')}
              keyboardType="number-pad"
              value={formik.values.quantity}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.quantity &&
                formik.touched.quantity &&
                String(formik.errors.quantity)
              }
              onBlur={formik.handleBlur('quantity')}
            />
          </View>
          <View style={styles.action}>
            {/* <FontAwesome name="user-o" color="#696969" size={20} /> */}
            <TextField
              label="Description"
              onChangeText={formik.handleChange('productSpecification')}
              value={formik.values.productSpecification}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.productSpecification &&
                formik.touched.productSpecification &&
                String(formik.errors.productSpecification)
              }
              onBlur={formik.handleBlur('productSpecification')}
            />
          </View>
          <View
            style={[
              styles.action,
              {
                marginTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.lightGray,
              },
            ]}>
            {/* <Text style={[FONTS.body4]}>Category</Text> */}
            {/* <FontAwesome name="user-o" color="#696969" size={20} /> */}
            <Dropdown
              style={[
                {
                  width: appTheme.SIZES.width - 50,
                  height: 'auto',
                  marginTop: 13,
                },
              ]}
              data={categories}
              search={false}
              labelField="categoryName"
              placeholder="Select Category"
              placeholderStyle={[FONTS.body3, {color: COLORS.gray}]}
              valueField="categoryId"
              selectedTextStyle={[
                appTheme.FONTS.body3,
                {color: appTheme.COLORS.black},
              ]}
              value={formik.values.categoryId}
              onChange={item => {
                formik.setFieldValue('categoryId', item.categoryId);
              }}
              renderItem={category => renderCategory(category)}
            />
          </View>
          {formik.values.categoryId === -1 && (
            <>
              <View style={styles.action}>
                <TextField
                  label="Category Name"
                  onChangeText={formik.handleChange('categoryName')}
                  value={formik.values.categoryName}
                  inputContainerStyle={{width: '100%'}}
                  style={[FONTS.body3]}
                  labelTextStyle={[FONTS.body3]}
                  tintColor={COLORS.black}
                  error={
                    formik.errors.categoryName &&
                    formik.touched.categoryName &&
                    String(formik.errors.categoryName)
                  }
                  onBlur={formik.handleBlur('categoryName')}
                />
              </View>
              <View style={styles.action}>
                <TextField
                  label="Sub Category"
                  onChangeText={formik.handleChange('subCategory')}
                  value={formik.values.subCategory}
                  inputContainerStyle={{width: '100%'}}
                  style={[FONTS.body3]}
                  labelTextStyle={[FONTS.body3]}
                  tintColor={COLORS.black}
                  error={
                    formik.errors.subCategory &&
                    formik.touched.subCategory &&
                    String(formik.errors.subCategory)
                  }
                  onBlur={formik.handleBlur('subCategory')}
                />
              </View>
              <View style={styles.action}>
                <TextField
                  label="Vertical"
                  onChangeText={formik.handleChange('vertical')}
                  value={formik.values.vertical}
                  inputContainerStyle={{width: '100%'}}
                  style={[FONTS.body3]}
                  labelTextStyle={[FONTS.body3]}
                  tintColor={COLORS.black}
                  error={
                    formik.errors.vertical &&
                    formik.touched.vertical &&
                    String(formik.errors.vertical)
                  }
                  onBlur={formik.handleBlur('vertical')}
                />
              </View>
            </>
          )}

          {!route.params.product && (
            <View style={{paddingTop: 20}}>
              <Text
                style={[appTheme.FONTS.body2, {fontFamily: 'Montserrat-Bold'}]}>
                Photos
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                {productImages.length > 0 &&
                  productImages.map((image, index) => {
                    return (
                      <View style={{marginBottom: 20}}>
                        <TouchableOpacity
                          onPress={() => {
                            let temp = productImages;
                            temp.splice(index, 1);
                            setProductImages(temp);
                            setRerender(!rerender);
                          }}
                          style={{
                            position: 'absolute',
                            zIndex: 2,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: 15,
                            top: 5,
                            right: 21,
                          }}>
                          <Icon
                            name="close"
                            color={appTheme.COLORS.white}
                            size={25}
                          />
                        </TouchableOpacity>
                        <Image
                          key={index}
                          source={{
                            uri: image.uri,
                          }}
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 10,
                            marginRight: 15,
                            // marginTop: 20,
                          }}
                        />
                      </View>
                    );
                  })}
                <TouchableOpacity
                  onPress={() => handleImageUpload()}
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: appTheme.COLORS.lightGray,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginTop: 10,
                  }}>
                  <Text
                    style={[
                      {
                        fontSize: 64,
                        fontFamily: 'Montserrat-Regular',
                        color: appTheme.COLORS.gray,
                        marginTop: -8,
                      },
                    ]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.commandButton}
            onPress={formik.handleSubmit}>
            {loading ? (
              <ActivityIndicator
                color={COLORS.white}
                animating={true}
                size="small"
              />
            ) : (
              <Text style={[{color: appTheme.COLORS.white}, appTheme.FONTS.h2]}>
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default AddEditProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdown: {
    // backgroundColor: 'white',
    width: '100%',
    borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: appTheme.COLORS.black,
    alignItems: 'center',
    marginTop: 20,
  },
  action: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
