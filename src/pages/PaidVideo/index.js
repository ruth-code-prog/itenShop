import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, ModalPassword, VideoPlayer, Jarak} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, getData, heightMobileUI} from '../../utils';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const PaidVideo = ({navigation}) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [videoLink, setVideoLink] = useState('');
  const [videoModal, setVideoModal] = useState('');
  const [modalPassword, setModalPassword] = useState(false);

  const [selectedPassword, setSelectedPassword] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    FIREBASE.database()
      .ref('video_berbayar')
      .once('value')
      .then(res => {
        const snapshotVal = res.val();
        const arr = snapshotVal.filter(val => val);
        setData(arr);
        setAllData(arr);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleFilter = val => {
    setLoading(true);
    let arr = [...allData];
    var searchRegex = new RegExp(val, 'i');
    arr = arr.filter(item => searchRegex?.test(item?.title));
    setData(arr);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <View>
      <View style={{padding: 4, paddingTop: 8}}>
        <Text style={styles.label}>Cari Video</Text>
        <Input
          onChangeText={val => handleFilter(val)}
          placeholder="Masukkan Judul Video"
        />
         <FontAwesomeIcon
            color={colors.white}
            style={{position: 'absolute', top: '70%', right: 30}}
            icon={faSearch}
          />
      </View>
      {loading ? (
        <ActivityIndicator size={24} color={colors.white} />
      ) : (
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={data}
          contentContainerStyle={styles.listContentContainer}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (item?.password) {
                  setSelectedPassword(item?.password);
                  setSelectedLink(item?.link);
                  setModalPassword(true);
                } else {
                  setVideoLink(item?.link);
                  setVideoModal(true);
                }
              }}
              activeOpacity={0.8}
              style={styles.videoContainer}>
              <Image source={{uri: item?.image}} style={styles.thumbnail} />
              <View
                style={{
                  height: 80,
                  backgroundColor: colors.white,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text
                  numberOfLines={2}
                  lineBreakMode="tail"
                  style={styles.body}>
                  {item?.body}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
      )}
      <VideoPlayer
        link={videoLink}
        visible={videoModal}
        onClose={() => setVideoModal(false)}
      />
      <ModalPassword
        type="simple"
        visible={modalPassword}
        onSubmit={password => {
          if (password !== selectedPassword) {
            Alert.alert('Password yang ada masukkan salah');
          } else {
            setModalPassword(false);
            setVideoLink(selectedLink);
            setVideoModal(true);
          }
        }}
        onClose={() => {
          setModalPassword(false);
        }}
      />
    </View>
  );
};

export default PaidVideo;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
  listContentContainer: {
    padding: 10,
    // justifyContent: "space-between",
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  videoContainer: {
    paddingTop: 16,
    borderRadius: 20,
    width: Dimensions.get('screen').width / 2 - 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  thumbnail: {
    height: 140,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    paddingLeft: 4,
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.biru,
  },
  body: {
    fontSize: 12,
    color: colors.dark,
    paddingLeft: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
