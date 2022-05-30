import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import FIREBASE from '../../config/FIREBASE';
import {
  colors,
  fonts,
  getData,
  numberWithCommas,
  responsiveHeight,
} from '../../utils';
import {Jarak, Tombol} from '../../components';

const Qris = () => {
  const [imageUrl1, setImageUrl1] = useState(undefined);
  const [textBayar, setTextBayar] = useState([]);

  useEffect(() => {
    getTextPembayaran();
  }, []);

  const getTextPembayaran = () => {
    FIREBASE.database()
      .ref('textBayar')
      .once('value')
      .then(res => {
        setTextBayar(res?.val());
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    FIREBASE.database()
      .ref('benefit/') //name in storage in firebase console
      .once('value')
      .then(res => {
        console.log('image: ', res.val());
        if (res.val()) {
          setImageUrl1(res.val());
        }
      })
      .catch(Error => {
        showError;
      });
  }, []);

  return (
    <View>
      <Jarak height={8} />
      <Text style={styles.textQRIS}>{textBayar}</Text>
      <Jarak height={8} />
      <Image style={styles.box1} source={{uri: imageUrl1}} />
    </View>
  );
};

export default Qris;

const styles = StyleSheet.create({
  box1: {
    width: 320,
    height: 320,
    borderRadius: 18,
  },
  box: {
    width: 280,
    height: 82,
  },
  textQRIS: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
  },
  textQRIS1: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
