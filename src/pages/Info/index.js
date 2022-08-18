import React, {useEffect, useState} from 'react';
import {StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator
  } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Jarak, Loading } from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, getData} from '../../utils';

const Info = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [modalImage, setModalImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [indexActive, setIndexActive] = useState(0);

  const closeModal = () => {
    if (modalImage) {
      setModalImage(false)
    }
  }

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
          wait(3000).then(() => setRefreshing(false));
        });

        setData(arr);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    getNotifImage();
  }, []);

  return (
    <View style={styles.page}>
        <Jarak height={16}/>
        <Text style={styles.title}>
          More Information
        </Text>
        <Jarak height={20} />
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getNotifImage} />
          }
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{paddingHorizontal: 20}}
          ItemSeparatorComponent={() => <Jarak height={20} />}
          ListFooterComponent={() => <Jarak height={200} />}
          renderItem={({item, index}) => (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setModalImage(true);
                  setIndexActive(index);
                }}>
                <Image
                  width={200}
                  height={200}
                  style={styles.image}
                  source={{uri: item?.url}}
                />
              </TouchableOpacity>
              <Text style={styles.keteranganGambar}>{item?.title}</Text>
              <Text style={styles.subtitleGambar}>{item?.subtitle}</Text>
            </View>
          )}
          ListEmptyComponent={() =>
            loading ? (
              <View style={{alignItems: 'center'}}>
                {refreshing ? <ActivityIndicator /> : null}
              </View>
            ) : null
          }
        />
      <Modal visible={modalImage} transparent onRequestClose={closeModal}>
        <ImageViewer
          index={indexActive}
          enableSwipeDown
          onSwipeDown={() => setModalImage(false)}
          imageUrls={data}
        />
      </Modal>
      
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.biru,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FBFCFC',
    paddingLeft: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FBFCFC',
    textAlign: 'center',
  },
  KalkulatorDosisObat: {
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBFCFC',
  },
  DosisObatEmergency: {
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBFCFC',
  },
  image: {
    height: 280,
    width: 280,
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
  }
});
