import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PushNotification from 'react-native-push-notification';
import NotifService from '../../../NotifService';
import handler from '../../../NotificationHandler';

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
            message: 'Mempermudah Kehidupan Anda Sekeluarga', // (required)
            date: new Date(Date.now() + 1 * 1000), // in 60 secs
          });
        });

  return (
    <View>
      <Text style={styles.title}>Mempermudah Kehidupan Anda Sekeluarga</Text>
    </View>
  )
}

export default NotifSplash

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        color: "#6D3492"
    },
})