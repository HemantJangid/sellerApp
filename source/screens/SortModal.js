import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectMultiple from 'react-native-select-multiple';

import {RadioButton} from 'react-native-paper';

import {COLORS, FONTS, SIZES} from '../constants/theme';
// import {Checkbox} from 'react-native-paper';

const categories = [
  {label: 'Shoes', value: 'shoes'},
  {label: 'Shirts', value: 'shirts'},
  {label: 'T-Shirts', value: 't-shirts'},
  {label: 'Jeans', value: 'jeans'},
  {label: 'Mobiles', value: 'mobiles'},
  {label: 'Television', value: 'television'},
];

const SortModal = ({isVisible, onClose}) => {
  const [showSortModal, setShowSortModal] = useState(isVisible);
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [sortBy, setSortBy] = useState();

  useEffect(() => {
    if (showSortModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showSortModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 550],
  });


  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack}}>
        <TouchableWithoutFeedback onPress={() => setShowSortModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>

        <Animated.ScrollView
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
          showsVerticalScrollIndicator={false}
          >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text style={FONTS.h2}>Sort By</Text>
            <TouchableOpacity onPress={() => setShowSortModal(false)}>
              <Icon name="close-circle" color={COLORS.black} size={30} />
            </TouchableOpacity>
          </View>

          {/* Sort */}
          <View>
            <RadioButton.Group
              onValueChange={newValue => setSortBy(newValue)}
              value={sortBy}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="both" color={COLORS.gray} />
                <Text style={FONTS.body3}>Created Time</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="active" color={COLORS.gray} />
                <Text style={FONTS.body3}>Modified Time</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="inactive" color={COLORS.gray} />
                <Text style={FONTS.body3}>Alphabetical</Text>
              </View>
            </RadioButton.Group>
          </View>
        </Animated.ScrollView>
      </View>
    </Modal>
  );
};

export default SortModal;
