import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Header from '../components/Header';
import globalStyles from '../constants/styles';
import appTheme from './../constants/theme';

const NotificationScreen = () => {
  const notifications = [
    {
      title: 'New Order',
      description: 'New order recieved from Dave New order recieved from Dave ',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description:
        'New order recieved from Dave New order recieved from Dave  New order recieved from Dave ',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description: 'New order recieved from Dave',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description: 'New order recieved from Dave',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description: 'New order recieved from Dave',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description: 'New order recieved from Dave',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description: 'New order recieved from Dave',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description: 'New order recieved from Dave',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description: 'New order recieved from Dave',
      time: 'Tuesday, 3:14 PM',
    },
    {
      title: 'New Order',
      description: 'New order recieved from Dave',
      time: 'Tuesday, 3:14 PM',
    },
  ];
  return (
    <>
      <Header name="Notifications" />
      <View style={globalStyles.screenContainer}>
        <View style={styles.notificationsSection}>
          <View style={styles.notificationCards}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{paddingTop: 20}}
              data={notifications}
              renderItem={({item, index}) => {
                return (
                  <TouchableHighlight
                    // onPress={() =>
                    //   props.navigation.navigate('SubProgramDetails', item)
                    // }
                    key={index}
                    style={[
                      styles.cardContainer,
                      {
                        marginBottom:
                          index === notifications.length - 1 ? 110 : 10,
                      },
                    ]}>
                    <View style={[styles.notificationCard]}>
                      <Avatar.Text size={64} label="D" />
                      <View style={styles.notificationInfo}>
                        <Text style={appTheme.FONTS.h3}>{item.title}</Text>
                        <Text
                          style={[
                            appTheme.FONTS.body4,
                            {color: appTheme.COLORS.gray},
                          ]}>
                          {item.time}
                        </Text>
                        <Text
                          style={[
                            appTheme.FONTS.body5,
                            {color: appTheme.COLORS.gray},
                          ]}>
                          {item.description}
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
      </View>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  notificationsSection: {
    paddingHorizontal: 20,
  },
  notificationCards: {
    width: '100%',
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
  },
  notificationInfo: {
    marginLeft: 20,
    width: '75%',
  },
});
