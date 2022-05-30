import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PushNotification from 'react-native-push-notification';
import NotifService from '../../../NotifService';
import handler from '../../../NotificationHandler';
import {Jarak} from '../../components';

const NotifSplash = () => {
    const [pushNotification, setPushNotification] = useState(false);

    useEffect(() => {
        getPushNotification();
      }, []);
    
      const getPushNotification = () => {
        if (!pushNotification) {
          setPushNotification(true);
        }
      };
    
      useEffect(() => {
          PushNotification.localNotification({
            channelId: 'itenShop',
            message: 'Easy Way to Make Your Life Better', // (required)
            date: new Date(Date.now() + 1 * 1000), // in 60 secs
          });
        });

  return (
    <View>
      <Text style={styles.title}>Version: 36</Text>
    </View>
  )
}

export default NotifSplash

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        color: "#6D3492",
        textAlign: "center",
    },
})