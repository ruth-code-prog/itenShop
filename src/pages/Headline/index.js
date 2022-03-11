import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import {HeadlineItem, Jarak} from '../../components';
import {
  colors,
  fonts,
  getData,
  numberWithCommas,
  responsiveHeight,
} from '../../utils';

const Headline = () => {
  const [headline, setHeadline] = useState([]);
  const [textChat2, setTextChat2] = useState([]);
  const [textChat3, setTextChat3] = useState([]);

  useEffect(() => {
    getTextChat2();
    getTextChat3();
  }, []);

  const getTextChat2 = () => {
    FIREBASE.database()
      .ref('textChat2')
      .once('value')
      .then(res => {
        setTextChat2(res?.val());
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getTextChat3 = () => {
    FIREBASE.database()
      .ref('textChat3')
      .once('value')
      .then(res => {
        setTextChat3(res?.val());
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    FIREBASE.database()
      .ref('headline/')
      .once('value')
      .then(res => {
        if (res.val()) {
          setHeadline(res.val());
        }
      })
      .catch(Error => {
        showError;
      });
  }, []);

  const openHeadline = url => {
    Linking.openURL('https://' + url);
  };

  return (
    <>
    <View>
        <Text style={styles.textChat}>{textChat2}</Text>
      </View>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {headline.map(item => {
            return (
              <TouchableOpacity
                onPress={() => openHeadline(item.link)}
                key={item.id}>
                <HeadlineItem
                  key={`headline-${item.id}`}
                  headline={item.headline}
                  image={item.image}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <Text style={styles.textChat}>{textChat3}</Text>
      </View>
    </>
  );
};

export default Headline;
const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 20,
  },
  textChat: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: '#FFFFFF',
  },
});
