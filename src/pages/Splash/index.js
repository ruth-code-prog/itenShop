import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Ilustrasi, Logo} from '../../assets';
import FIREBASE from '../../config/FIREBASE';
import {getData, storeData} from '../../utils';
import NotifSplash from '../NotifSplash';

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
        }, 3000);
      });
  };

  render() {
    return (
      <View style={styles.pages}>
        <Logo />
        <NotifSplash />
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
});