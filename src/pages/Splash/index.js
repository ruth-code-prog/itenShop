import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Ilustrasi, Logo} from '../../assets';
import FIREBASE from '../../config/FIREBASE';
import {getData, storeData} from '../../utils';
import NotifSplash from '../NotifSplash';
import {Jarak} from '../../components';

export default class Splash extends Component {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    getData('user')
      .then(res => {
        if (res) {
          FIREBASE.database()
            .ref(`users/${res?.uid}`)
            .once('value', snapshot => {
              storeData('user', snapshot.val());
            });
        }
      })
      .finally(() => {
        setTimeout(() => {
          this.props.navigation.replace('MainApp');
        }, 4000);
      });
  };

  render() {
    return (
      <View style={styles.pages}>
        <Logo />
        <Text style={styles.title}>Easy Way to Make Your Life Better</Text>
        <View style={styles.notifSplash}>
        <NotifSplash />
        <Jarak height={30} />
        <Image source={require('../../assets/images/Mohes.png')}
              style={{width: 130, height: 130}}
              resizeMode={'contain'} />
        <Jarak height={30} />
        <Image source={require('../../assets/images/pse.png')}
              style={{width: 130, height: 130}}
              resizeMode={'contain'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  ilustrasi: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  title: {
    fontWeight: "bold",
    color: "#6D3492",
    textAlign: "center",
  },
});