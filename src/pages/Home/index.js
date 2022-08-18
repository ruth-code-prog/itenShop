import AsyncStorage from '@react-native-async-storage/async-storage';
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
  RefreshControl,
  FlatList,
  Modal,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {
  BannerSlider,
  HeaderComponent,
  ListJerseys,
  ListLiga,
  PopupPoint,
  Tombol,
  ModalDrug,
  ModalPenunjang,
  FloatingIcon,
  Saldo,
} from '../../components';
import Swiper from 'react-native-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';
import {colors, fonts, getData} from '../../utils';
import {Jarak} from '../../components';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getListLiga} from '../../actions/LigaAction';
import {getListJersey, limitJersey} from '../../actions/JerseyAction';
import Notif from '../Notif';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import FIREBASE from '../../config/FIREBASE';
import RunningText from '../RunningText';
import Ewallet from '../Ewallet';
import Video from '../Video';
import NewsVideo from '../NewsVideo';
import PaidVideo from '../PaidVideo';
import CardMultiFungsi from '../CardMultiFungsi';
import {BannerAd, TestIds} from '@react-native-admob/admob';
import Clipboard from '@react-native-clipboard/clipboard';
import Info from '../Info';
import ClipboardToast from 'react-native-clipboard-toast';
import DrugBerbayar from '../DrugBerbayar';
import Headline from '../Headline';

const Home = props => {
  const [bannerData, setBannerData] = useState([]);
  const [pointPopup, setPointPopup] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [point, setPoint] = useState(0);
  const bannerRef = useRef(null);
  const [data, setData] = useState([]);
  const [modalImage, setModalImage] = useState(false);
  const [indexActive, setIndexActive] = useState(0);
  const [drugModal, setDrugModal] = useState(false);
  const [userHomeData, setUserHomeData] = useState({});
  const [penunjangModal, setPenunjangModal] = useState(false);
  const [floatingIconUrl, setFloatingIcon] = useState('');
  const [showFloating, setShowFloating] = useState(false);
  const [links, setLinks] = useState([]);
  const pagesScrollRef = useRef(null);

  const searchState = useSelector(state => state?.JerseyReducer);

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

  const getUserHomeData = uid => {
    FIREBASE.database()
      .ref('users/' + uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          setUserHomeData(snapshot.val());
        }
      });
  };

  const closeModal = () => {
    if (modalImage) {
      setModalImage(false);
    }
  };

  const getNotifImage = () => {
    FIREBASE.database()
      .ref('info')
      .once('value')
      .then(snapshot => {
        setRefreshing(true);
        const dataSnapshot = snapshot.val() || {};
        let arr = [];

        Object.entries(dataSnapshot).map(val => {
          arr.push({
            url: val[1]?.image,
            title: val[1]?.title,
            subtitle: val[1]?.subtitle,
            id: val[0],
          });
          setRefreshing(true);
          wait(2000).then(() => setRefreshing(false));
        });

        setData(arr);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getNotifImage();
    getFloatingIcon();
  }, []);

  const getFloatingIcon = () => {
    FIREBASE.database()
      .ref('floating_icon_home')
      .once('value', snapshot => {
        setFloatingIcon(snapshot.val());
        setShowFloating(true);
      });
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getListLiga());
      dispatch(limitJersey());
      getImage();
    }, []),
  );

  useEffect(() => {
    dispatch(getListJersey(searchState?.idLiga, searchState?.keyword));
  }, [searchState?.keyword]);

  useEffect(() => {
    checkUser();
  }, []);

  const getImage = () => {
    FIREBASE.database()
      .ref('desain_banner')
      .once('value', snapshot => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        const data = snapshot.val();
        let arr = [];
        let arrLinks = [];
        data.map(val => arr.push(val?.uri));
        arrLinks = data?.map(val => val?.link);

        setBannerData(arr);
        setLinks(arrLinks);
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
    <>
      <ScrollView
        onScrollBeginDrag={() => setShowFloating(false)}
        onScrollEndDrag={() => setShowFloating(true)}
        ref={pagesScrollRef}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getImage} />
        }>
        <View style={styles.page}>
          <HeaderComponent navigation={navigation} page="Home" />
          <View style={styles.pilihJersey}>
            {searchState?.keyword ? (
              <Text style={styles.labelSearch}>
                Cari :{' '}
                <Text style={styles.boldLabel}>{searchState?.keyword}</Text>
              </Text>
            ) : (
              <View />
            )}

            {searchState?.keyword ? (
              <ListJerseys navigation={navigation} />
            ) : (
              <View />
            )}
          </View>
          <BannerSlider
            data={bannerData}
            links={links}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getImage} />
            }
          />
          <Saldo />
          <RunningText />
          <View style={styles.pilihLiga}>
            <Text style={styles.label}>Kategori</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <ListLiga navigation={navigation} />
            </ScrollView>
          </View>

          <View style={styles.pilihJersey}>
            <Ewallet />
            <Jarak height={8} />
            <Text style={{color: '#FFFFFF', fontStyle: 'italic', fontSize: 12}}>
              ~Chat Admin setelah Top Up E-Wallet Ethan Shop~
            </Text>
            <Jarak height={20} />
            <Headline />
            <View style={{flexDirection: 'row'}}>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AllVideo')}>
                  <Image
                    source={require('../../assets/images/vid.png')}
                    style={styles.chat}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                  <Image
                    source={require('../../assets/images/gallery.png')}
                    style={{width: 116, height: 116}}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={modalImage} transparent onRequestClose={closeModal}>
              <ImageViewer
                index={indexActive}
                enableSwipeDown
                onSwipeDown={() => setModalImage(false)}
                imageUrls={data}
              />
            </Modal>
          </View>

          <View style={styles.pilihJersey}>
            <Tombol
              onPress={() => setDrugModal(true)}
              title="Pustaka Obat"
              type="text2"
              padding={14}
            />
            <Jarak height={20} />

            <Tombol
              onPress={() => Linking.openURL('https://wa.me/+62895600394345')}
              title="Chat Founder"
              type="text2"
              padding={14}
            />

            <Jarak height={20} />

            <Tombol
              onPress={() => Linking.openURL('https://wa.me/+62895600394345')}
              title="Chat Admin"
              type="text2"
              padding={14}
            />

            <Jarak height={8} />
            <Text style={styles.version}>Ethan Shop Version: 47</Text>
            <Jarak height={20} />
          </View>
          <ModalDrug
            visible={drugModal}
            profile={userHomeData}
            onSubmit={() => setDrugModal(false)}
            onClose={() => setDrugModal(false)}
          />
          <ModalPenunjang
            visible={penunjangModal}
            profile={userHomeData}
            onSubmit={() => setPenunjangModal(false)}
            onClose={() => setPenunjangModal(false)}
          />
          <Notif />
          {refreshing ? <ActivityIndicator /> : null}
          <PopupPoint
            point={point}
            visible={pointPopup}
            onClose={() => setPointPopup(false)}
          />
        </View>
      </ScrollView>
      <FloatingIcon
        onClose={() => setShowFloating(false)}
        onPress={() => navigation.navigate('InfoMenarik')}
        visible={showFloating}
        imageUri={floatingIconUrl}
      />
    </>
  );
};

export default connect()(Home);

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.biru},
  buttonContainer: {
    width: 250,
    flex: 1,
    justifyContent: 'center',
  },
  clipboardToastContainer: {
    backgroundColor: '#34D5B5',
    padding: 10,
    borderRadius: 5,
  },
  clipboardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  pilihLiga: {
    marginHorizontal: 14,
    marginTop: 2,
  },
  pilihJersey: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  imageInfo: {
    height: 280,
    width: 280,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FBFCFC',
    paddingLeft: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  keteranganGambar: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#FBFCFC',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subtitleGambar: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#FBFCFC',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  labelSearch: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 12,
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
