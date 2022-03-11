import React, {useEffect, useState} from 'react';
import {StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Jarak } from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, getData} from '../../utils';

const Info = () => {
  const [data, setData] = useState([]);
  const [modalImage, setModalImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [indexActive, setIndexActive] = useState(0);

  const getNotifImage = () => {
    FIREBASE.database()
      .ref('info')
      .once('value')
      .then(snapshot => {
        const dataSnapshot = snapshot.val() || {};
        let arr = [];

        Object.entries(dataSnapshot).map(val => {
          arr.push({
            url: val[1]?.image,
            title: val[1]?.title,
            subtitle: val[1]?.subtitle,
            id: val[0],
          });
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
  }, []);

  return (
    <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Jarak height={30} />
        <Text style={styles.title}>
          More Information
        </Text>
        <Text style={styles.subtitle}>
          Warning!
        </Text>
        <Text style={styles.subtitle}>
          "Zoom In: Click Image",
        </Text>
        <Text style={styles.subtitle}>"Zoom Out: Swipe Down Image"</Text>
        <Jarak height={20} />
        <FlatList
          data={data}
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
              <Text style={styles.keteranganGambar}>{item?.subtitle}</Text>
            </View>
          )}
          ListEmptyComponent={() =>
            loading ? (
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator size={40} color={colors.white2} />
              </View>
            ) : null
          }
        />
      </ScrollView>
      <Modal visible={modalImage} transparent>
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
  header: {
    paddingHorizontal: 12,
    //paddingTop: 8,
    marginBottom: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FBFCFC',
    paddingLeft: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
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
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  keteranganGambar: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#FBFCFC',
    textAlign: 'center',
  }
});
