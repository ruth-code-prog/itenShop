import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function CardMultiFungsiItem({onPress, image}) {
  return (
    <View style={styles.container} onPress={onPress}>
      <Image source={{uri: image}} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2772E7',
    borderRadius: 10,
    marginTop: 10,
  },
  image: {
    width: 263,
    height: 44,
  },
});
