import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const TextOnly3 = ({padding, title, onPress, fontSize}) => {
  return (
    <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
      <Text style={styles.text(fontSize)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextOnly3;

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.ungu,
    padding: padding,
    borderRadius: 20,
  }),
  text: fontSize => ({
    height: 34,
    fontSize: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.primary.bold,
  }),
});
