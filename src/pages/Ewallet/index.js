import React, {useCallback,useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import {
  HomeProfile, Loading,
} from "../../components";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, getData, numberWithCommas} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {useFocusEffect} from '@react-navigation/core';
import CurrencyFormatter from "react-native-currency-formatter";

const Ewallet = () => {
    const [saldo, setSaldo] = useState([]);
    const [userHomeData, setUserHomeData] = useState({});
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
      photo: ILNullPhoto,
      nama: '',
    });

     useEffect(() => {
    getUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      FIREBASE.auth().onAuthStateChanged(async data => {
        if (data) {
          getUserHomeData(data.uid);
        } else {
          AsyncStorage.clear();
        }
      });
    }, []),
  );

  const getUserData = () => {
    getData('user')
      .then(res => {
        const data = res;
        let arr = [];
        data?.image?.filter(val => val).map(val => arr.push({url: val}));
        setProfile(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const getUserHomeData = uid => {
    FIREBASE.database()
      .ref('users/' + uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          setUserHomeData(snapshot.val());
        }
      });
  };


  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    FIREBASE.database().ref('user');
    getData('user').then(res => {
      if (res) {
        setSaldo(res?.saldo);
        if (!saldo) {
          setSaldo(true);
        }
      }
    });
  };
  

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{borderRadius: 15, marginTop: 20}}
      colors={['#12c2e9', '#c471ed', '#f64f59']}>
        {loading && <Loading />}
      <View
        style={{
          padding: 20,
          borderRadius: 15,
        }}>
          <Text style={{color: '#FFFFFF'}}>Card Owner</Text>
          <HomeProfile profile={profile} />
        <Text style={{color: '#FFFFFF'}}>Balance</Text>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 28,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {CurrencyFormatter(saldo)}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            
            
            <Text style={{color: '#FFFFFF'}}>(E-Wallet Ethan Shop)</Text>
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Image
              source={require('../../assets/images/itenShop.png')}
              style={{width: 50, height: 50}}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Ewallet;
