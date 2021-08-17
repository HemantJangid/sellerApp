import React from 'react';
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
} from 'react-native';
import globalStyles from '../constants/styles';
import {Avatar} from 'react-native-paper';
import Header from '../components/Header';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const AddEditProduct = ({navigation, ...props}) => {
  navigation.setOptions({title: props.route.params.headerTitle});
  const productInfo = {
    name: 'Handbag',
    images: [
      'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
    ],
    price: 280,
    selling_price: 250,
    quantity: 50,
    status: 'active',
  };
  return (
    <>
      {/* <Header name={productInfo.name} /> */}
      <ScrollView style={[globalStyles.screenContainer, {marginBottom: 70}]}>
        <View style={styles.container}>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#696969" size={20} />
            <TextInput
              placeholder="Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[styles.textInput]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#696969" size={20} />
            <TextInput
              placeholder="Price"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[styles.textInput]}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" color="#696969" size={20} />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              style={[styles.textInput]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="#696969" size={20} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCorrect={false}
              style={[styles.textInput]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="globe" color="#696969" size={20} />
            <TextInput
              placeholder="Country"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[styles.textInput]}
            />
          </View>
          <View style={styles.action}>
            <Icon name="map-marker-outline" color="#696969" size={20} />
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[styles.textInput]}
            />
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>Submit</Text>
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
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#696969',
    // paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: '#05375a',
  },
});
