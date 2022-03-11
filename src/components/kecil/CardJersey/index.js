import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, responsiveWidth, responsiveHeight} from '../../../utils';
import Tombol from '../Tombol';

const CardJersey = ({jersey, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('JerseyDetail', {jersey})}>
        <Image source={{uri: jersey.gambar[0]}} style={styles.gambar} />
        <Text style={styles.text}>{jersey.nama} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardJersey;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card: {
    backgroundColor: colors.white2,
    width: responsiveWidth(159),
    height: responsiveHeight(280),
    alignItems: 'center',
    padding: 0,
    borderRadius: 20,
    marginBottom: 10,
  },
  gambar: {
    width: 138,
    height: 156,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  text: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#000000',
  },
});
