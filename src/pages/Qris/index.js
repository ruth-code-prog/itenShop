import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useRef, useEffect, useState} from 'react';
import FIREBASE from '../../config/FIREBASE';
import {
    colors,
    fonts,
    getData,
    numberWithCommas,
    responsiveHeight,
  } from '../../utils';

const Qris = () => {
    const [imageUrl, setImageUrl] = useState(undefined);
    const [textBayar, setTextBayar] = useState([])

    useEffect(() => {
        getTextPembayaran();
      }, []);

    const getTextPembayaran = () => {
        FIREBASE.database()
          .ref("textBayar")
          .once("value")
          .then((res) => {
            setTextBayar(res?.val());
          })
          .catch((err) => {
            console.error(err);
          });
      };

    useEffect(() => {
        FIREBASE.database()
          .ref('QRIS/') //name in storage in firebase console
          .once('value')
          .then(res => {
            console.log('image: ', res.val());
            if (res.val()) {
              setImageUrl(res.val());
            }
          })
          .catch(Error => {
            showError;
          });
      }, []);
  return (
    <View>
      <Image style={styles.box} source={{uri: imageUrl}} />
      <Text style={styles.textQRIS}>{textBayar}</Text>
    </View>
  )
}

export default Qris

const styles = StyleSheet.create({
    box: {
        width: 300,
        height: 400,
        borderRadius: 18
    },
    textQRIS: {
        fontSize: 18,
        fontFamily: fonts.primary.bold,
        color: '#FFFFFF',
        textAlign: "center"
      },
})