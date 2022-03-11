import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FIREBASE from '../../../config/FIREBASE';
import {colors} from '../../../utils';

const PopupPoint = ({visible, onClose, point}) => {
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    FIREBASE.database()
      .ref('popup_banner')
      .once('value', snapshot => {
        setImageUri(snapshot.val());
      });
  };

  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => onClose && onClose()}
            activeOpacity={0.8}
            style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image style={styles.image} source={{uri: imageUri}} />
          <Text style={styles.text}>Point Anda: {point}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default PopupPoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width - 80,
    borderRadius: 40,
  },
  text: {
    position: 'absolute',
    bottom: 20,
    fontSize: 24,
    color: colors.white,
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: -8,
    top: -12,
    zIndex: 9999,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000000",
  },
});
