import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Jarak} from '../..';

const CardAlamat = ({alamat, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alamat Saya :</Text>
      <Text style={styles.alamat}>{alamat} </Text>
      <Jarak height={60} />
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.ubahAlamat}>Ubah Alamat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardAlamat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    marginBottom: 5,
    color:"#000000",
  },
  alamat: {
    fontFamily: fonts.primary.regular,
    fontSize: 14,
    color:"#000000",
  },
  ubahAlamat: {
    fontFamily: fonts.primary.bold,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'right',
    color:"#000000",
  },
});
