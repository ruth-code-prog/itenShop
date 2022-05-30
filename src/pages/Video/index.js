import React, { useEffect, useState } from "react";
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
  ScrollView
} from "react-native";
import {
  VideoPlayer, Input
} from "../../components";
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../src/utils';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Video = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [videoLink, setVideoLink] = useState("");
  const [videoModal, setVideoModal] = useState("");

  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    FIREBASE.database()
      .ref("video/")
      .once("value")
      .then((res) => {
        const snapshotVal = res.val();
        const arr = snapshotVal.filter((val) => val);
        setData(arr);
        setAllData(arr);
      })
      .catch((err) => {
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
    <View style={styles.pages}>
      <ScrollView showsHorizontalScrollIndicator={false}>
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
        <ActivityIndicator size={24} color="#FFFFFF" />
      ) : (
        <FlatList
          horizontal
          keyExtractor={(_, index) => index.toString()}
          data={data}
          contentContainerStyle={styles.listContentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {{
                  setVideoLink(item?.link);
                  setVideoModal(true);
                }
              }}
              activeOpacity={0.8}
              style={styles.videoContainer}
            >
              <View>
              <Image source={{ uri: item?.image }} style={styles.thumbnail} />
              <Image source={require("../../assets/gif.gif")} style={{width:50, height:50 }} resizeMode={"contain"} />
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.subtitle}>{item?.page}</Text>
                <Text
                  numberOfLines={2}
                  lineBreakMode="tail"
                  style={styles.body}
                >
                  {item?.body}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          //numColumns={2}
          //columnWrapperStyle={styles.columnWrapperStyle}
          titleWrapperStyle={styles.titleWrapperStyle}
        />
      )}
      <VideoPlayer
        link={videoLink}
        visible={videoModal}
        onClose={() => setVideoModal(false)}
      />
      </ScrollView>
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  listContentContainer: {
    padding: 8,
    // justifyContent: "space-between",
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  titleWrapperStyle: {
    flex: 1,
  },
  videoContainer: {
    height: 390,
    width: 240,
    marginRight: 10,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
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
    width: 210, height: 240, borderRadius: 11,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color:  "#0000FF",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color:  "#000000",
    marginTop: 2,
  },
  body: {
    fontSize: 12,
    color:  "#0000FF",
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});