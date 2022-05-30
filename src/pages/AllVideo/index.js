import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {
  Component,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import {colors, fonts, getData} from '../../utils';
import {Jarak} from '../../components';
import Video from '../Video';
import NewsVideo from '../NewsVideo';
import PaidVideo from '../PaidVideo';
import FIREBASE from '../../config/FIREBASE';
import {YellowBox} from 'react-native';

export default function AllVideo() {
  const [textChatEdu, setTextChatEdu] = useState([]);

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ]);
  
  useEffect(() => {
    getTextChatEdu();
  }, []);

  const getTextChatEdu = () => {
    FIREBASE.database()
      .ref('textChatEdu')
      .once('value')
      .then(res => {
        setTextChatEdu(res?.val());
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.label}>Video Menarik untuk Anda</Text>
      <Video />
      <Text style={styles.label}>Indo News Trending</Text>
      <NewsVideo />
      <Text style={styles.label}>Video Berbayar</Text>
      <Text style={styles.label2}>{textChatEdu}</Text>
      <PaidVideo />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.biru},
  pilihJersey: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  label2: {
    fontSize: 12,
    fontFamily: fonts.primary.bold,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});
