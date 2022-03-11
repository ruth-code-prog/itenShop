import React, {
  Component,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Animated,
  PanResponder,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  BannerSlider,
  HeaderComponent,
  ListJerseys,
  ListLiga,
  PopupPoint,
  Tombol,
} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {Jarak} from '../../components';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getListLiga} from '../../actions/LigaAction';
import {limitJersey} from '../../actions/JerseyAction';
import Notif from '../Notif';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import FIREBASE from '../../config/FIREBASE';
import RunningText from '../RunningText';
import Video from '../Video';
import Info from '../Info';
import PanRen from '../PanRen';
import Headline from '../Headline';
import CardMultiFungsi from '../CardMultiFungsi';

const Home = props => {
  const [bannerData, setBannerData] = useState([]);
  const [pointPopup, setPointPopup] = useState(false);
  const [point, setPoint] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const [textChat, setTextChat] = useState([])

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    getTextChat();
  }, []);

const getTextChat = () => {
    FIREBASE.database()
      .ref("textChat")
      .once("value")
      .then((res) => {
        setTextChat(res?.val());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  useFocusEffect(
    useCallback(() => {
      dispatch(getListLiga());
      dispatch(limitJersey());
      getImage();
    }, []),
  );

  useEffect(() => {
    checkUser();
  }, []);

  const getImage = () => {
    FIREBASE.database()
      .ref('desain_banner')
      .once('value', snapshot => {
        const data = snapshot.val();
        let arr = [];
        data.map(val => arr.push(val?.uri));

        setBannerData(arr);
      });
  };

  const checkUser = () => {
    getData('user').then(res => {
      if (res) {
        setPoint(res?.point);
        if (!pointPopup) {
          setPointPopup(true);
        }
      }
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderComponent navigation={navigation} page="Home" />
        <BannerSlider data={bannerData} />
        <RunningText />
        <View style={styles.pilihLiga}>
          <Text style={styles.label}>Kategori</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ListLiga navigation={navigation} />
          </ScrollView>
        </View>

        <View style={styles.pilihJersey}>
        <Jarak height={10} />
          <Text style={styles.label}>
            Pilih <Text style={styles.boldLabel}>Produk & Layanan</Text> Yang
            Anda Inginkan
          </Text>
          <ScrollView
            style={styles.card}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <ListJerseys navigation={navigation} />
          </ScrollView>
          <Text style={styles.label}>{textChat}</Text>
          <Headline />
          <CardMultiFungsi />
          <Jarak height={22} />
          <Text style={styles.label}>Video Menarik untuk Anda</Text>
          <Video />
        </View>
        <PanRen />
        <Info />
        <View style={styles.pilihJersey}>
        <Tombol
            onPress={() => Linking.openURL('https://wa.me/+62895600394345')}
            title="Chat Founder"
            type="text2"
            padding={14}
          />
          <Notif />
        <Jarak height={10} />
        </View>
        <Text style={styles.version}>Iten Shop Version: 19</Text>
      </ScrollView>
      <PopupPoint
        point={point}
        visible={pointPopup}
        onClose={() => setPointPopup(false)}
      />
    </View>
  );
};

export default connect()(Home);

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.biru},
  pilihLiga: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  pilihJersey: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  version: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#FBFCFC',
    textAlign: 'center',
  },
});
