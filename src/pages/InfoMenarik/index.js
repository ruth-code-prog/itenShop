import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {Ilustrasi, Logo} from '../../assets';
import {Button, Gap} from '../../components';
import {colors, fonts} from '../../utils';
import FIREBASE from '../../config/FIREBASE';

const InfoMenarik = () => {
    const [imageUrl1, setImageUrl1] = useState(undefined);
    useEffect(() => {
        FIREBASE.database()
          .ref('InfoMenarik/') //name in storage in firebase console
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
    <ImageBackground source={{uri: imageUrl1}} style={styles.page}>
    </ImageBackground>
  );
};

export default InfoMenarik;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginTop: 91,
    color: colors.white,
    fontFamily: fonts.primary[600],
  },
  body: {
    fontSize: 20,
    marginTop: 91,
    color: colors.white,
    fontFamily: fonts.primary[600],
  },
  fitur: {
    fontSize: 16,
    marginTop: 20,
    color: colors.white,
    fontFamily: fonts.primary[600],
  },
});
