import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary,} from 'react-native-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Share from 'react-native-share';
import {
  HomeProfile,
  Tombol,
  Input,
  Loading,
  ModalAddPenunjang,
  Jarak,
} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {colors, useFormSoul, getData} from '../../utils';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import RNFetchBlob from 'rn-fetch-blob';

const PenunjangUser = () => {
  const [form, setForm] = useFormSoul({
    title: '',
    image: null,
  });
  const [profile, setProfile] = useState({
    fullName: '',
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [uid, setUid] = useState('');
  const [modalImage, setModalImage] = useState(false);
  const [indexActive, setIndexActive] = useState(0);
  const [addPenunjangVisible, setAddPenunjangVisible] = useState(false);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    getData('user')
      .then(res => {
        const data = res;
        let arr = [];
        data?.image?.filter(val => val).map(val => arr.push({url: val}));
        setImageData(arr);
        setProfile(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      FIREBASE.auth().onAuthStateChanged(async data => {
        if (data) {
          getPenunjangData(data.uid);
          setUid(data?.uid);
        } else {
          AsyncStorage.clear();
        }
      });
    }, []),
  );

  const ImageLoading = ({item, index}) => {
    const [loadingImage, setLoadingImage] = useState(true);
    const [loadingShare, setLoadingShare] = useState(false);

    const shareImage = url => {
      setLoadingShare(true);
      const fs = RNFetchBlob.fs;
      let imagePath = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', item?.url)
        // the image is now dowloaded to device's storage
        .then(resp => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile('base64');
        })
        .then(base64Data => {
          // here's base64 encoded image
          console.log(base64Data);
          setLoadingShare(false);

          Share.open({
            url: `data:image/jpeg;base64, ${base64Data}`,
          })
            .then(res => {
              console.log('ree', res);
            })
            .catch(err => {
              err && console.error(err);
            });
          // remove the file from storage
          return fs.unlink(imagePath);
        })
        .catch(err => {
          setLoadingShare(false);
          console.error(err);
        });
    };
    return (
      <View style={{marginBottom: 24}}>
        <TouchableOpacity
          onPress={() => {
            setModalImage(true);
            setIndexActive(index);
          }}>
          <Image
            onLoadEnd={() => {
              setLoadingImage(false);
            }}
            source={{uri: item?.url}}
            style={styles.imageBox}
          />
          {loadingImage && (
            <View style={{marginVertical: 24}}>
              <ActivityIndicator color={colors.primary} size={40} />
            </View>
          )}
        </TouchableOpacity>
        {loadingShare ? (
          <ActivityIndicator size={24} />
        ) : (
          <TouchableOpacity
            onPress={() => shareImage(item?.url)}
            style={styles.btnShare}>
            <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
              Bagikan Foto
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };


  const getPenunjangData = uidParams => {
    FIREBASE.database()
      .ref(`user-penunjang/${uidParams}`)
      .once('value')
      .then(snapshot => {
        const dataSnapshot = snapshot.val() || {};
        let arr = [];

        Object.entries(dataSnapshot).map(val => {
          arr.push({
            url: val[1]?.image,
            title: val[1]?.title,
            id: val[0],
          });
        });

        setData(arr);
        setOriginalData(arr);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const showAlert = () => {
    Alert.alert('Pilih salah satu', '', [
      {
        text: 'Batal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Upload Langsung',

        onPress: () => {
          launchCamera({
            quality: 0.8,
            mediaType: 'photo',
            includeBase64: true,
          }).then(res => {
            if (!res.didCancel) {
              handleImage(res);
            }
          });
        },
      },
      {
        text: 'Dari Library',
        onPress: () => {
          launchImageLibrary({
            quality: 0.8,
            mediaType: 'photo',
            includeBase64: true,
          }).then(res => {
            if (!res.didCancel) {
              handleImage(res);
            }
          });
        },
      },
    ]);
  };

  const handleImage = res => {
    const {base64} = res?.assets[0] || {};
    setForm({image: `data:image/jpeg;base64, ${base64}`});
  };

  const handleUploadImage = () => {
    setUploadLoading(true);
    const ref = FIREBASE.database()
      .ref('user-penunjang/' + uid)
      .push({
        title: form.title,
        image: form.image,
      });

    ref
      .then(() => {
        setUploadLoading(false);
        Alert.alert('Berhasil mengupload data penunjang');
        setForm({title: '', image: null});
        setData([
          ...data,
          {
            title: form.title,
            url: form.image,
            id: ref.key,
          },
        ]);
        setOriginalData([
          ...originalData,
          {
            title: form.title,
            url: form.image,
            id: ref.key,
          },
        ]);
      })
      .catch(err => {
        setUploadLoading(false);
        console.error(err);
      })
      .finally(() => {
        setAddPenunjangVisible(false);
      });
  };

  const handleDelete = item => {
    Alert.alert('Apakah Anda yakin?', '', [
      {
        text: 'Batal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Hapus',

        onPress: () => {
          FIREBASE.database()
            .ref('user-penunjang/' + uid + `/${item?.id}`)
            .remove()
            .then(() => {
              let arr = [...data];
              arr = arr.filter(val => val?.id !== item?.id);
              setData(arr);
              setOriginalData(arr);
            });
        },
      },
    ]);
  };

  const handleSearch = val => {
    let arr = [...originalData];
    var searchRegex = new RegExp(val, 'i');
    arr = arr.filter(item => searchRegex?.test(item?.title));
    setData(arr);
  };

  const shareImage = url => {
    Share.open({
      url,
    })
      .then(res => {
        console.log('ree', res);
      })
      .catch(err => {
        err && console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        
        <HomeProfile profile={profile} />
        <Jarak height={20} />
        {imageData?.map((item, index) => (
          <ImageLoading index={index} key={index} item={item} />
        ))}
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <Input
            style={{paddingRight: 40}}
            onChangeText={val => handleSearch(val)}
            label={'Cari foto sesuai judul'}
          />
          <FontAwesomeIcon
            color={colors.white}
            style={{position: 'absolute', top: '58%', right: 32}}
            icon={faSearch}
          />
        </View>
        <Jarak height={20} />
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          contentContainerStyle={{paddingHorizontal: 20}}
          ItemSeparatorComponent={() => <Jarak height={20} />}
          renderItem={({item, index}) => (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setModalImage(true);
                  setIndexActive(index);
                }}>
                <Image style={styles.image} source={{uri: item?.url}} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item)}
                style={styles.btnDelete}>
                <Text style={{fontSize: 16, color: 'white'}}>Hapus</Text>
              </TouchableOpacity>
              <Jarak height={20} />
              <Text style={styles.title}>{item?.title}</Text>
              <TouchableOpacity
                onPress={() => shareImage(item?.url)}
                style={styles.btnShare}>
                <Text style={{fontSize: 16, color: 'white'}}>Bagikan Foto</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Jarak height={70} />
        <View style={{width: '100%', paddingHorizontal: 16}}>
          <Tombol
            type="text2"
            padding={14}
            title={'Tambah Foto'}
            onPress={() => setAddPenunjangVisible(true)}
          />
        </View>
      </ScrollView>
      <Modal visible={modalImage} transparent>
        <ImageViewer
          index={indexActive}
          enableSwipeDown
          onSwipeDown={() => setModalImage(false)}
          imageUrls={data}
        />
      </Modal>
      <ModalAddPenunjang
        visible={addPenunjangVisible}
        onAddImage={showAlert}
        onSubmit={handleUploadImage}
        uploadLoading={uploadLoading}
        form={form}
        setForm={setForm}
        onClose={() => setAddPenunjangVisible(false)}
      />
      {loading && <Loading />}
    </View>
  );
};

export default PenunjangUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112340',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  btnDelete: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  btnShare: {
    backgroundColor: colors.primary,
    padding: 8,
    marginTop: 8,
  },
  title: {
    color: '#FFFFFF',
  },
});
