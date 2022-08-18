import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FIREBASE from '../../../config/FIREBASE';

const Saldo = () => {
    const [textChat, setTextChat] = useState([]);
    useEffect(() => {
        getTextChat();
      }, []);
    
      const getTextChat = () => {
        FIREBASE.database()
          .ref('ip')
          .once('value')
          .then(res => {
            setTextChat(res?.val());
          })
          .catch(err => {
            console.error(err);
          });
      };
    
  return (
    <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.valuePoint} numberOfLines={1}>{textChat}</Text>
        </View>
    </View>
  );
};

export default Saldo;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: -windowHeight * 0.02,
    flexDirection: 'row',
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informasiSaldo: {
    width: '50%',
  },
  labelSaldo: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
  valueSaldo: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
  },
  labelPoint: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Regular',
  },
  valuePoint: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Bold',
    color: "#000000",
  },
  buttonAksi: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});