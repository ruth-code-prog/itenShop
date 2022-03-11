import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Jarak, Tombol} from '../../components';
import {useNavigation} from '@react-navigation/native';

const Daftar = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Tombol
        type="text2"
        title="Daftar"
        padding={12}
        fontSize={18}
        onPress={() => navigation.navigate('Register1')}
      />
    </View>
  );
};

export default Daftar;

const styles = StyleSheet.create({});
