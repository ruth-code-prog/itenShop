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
import {CardMultiFungsiItem, Jarak} from '../../components';
import {
  colors,
  fonts,
  getData,
  numberWithCommas,
  responsiveHeight,
} from '../../utils';

const CardMultiFungsi = () => {
  const [headline, setHeadline] = useState([]);

  useEffect(() => {
    FIREBASE.database()
      .ref('multifungsi/')
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
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {headline.map(item => {
            return (
              <TouchableOpacity
                onPress={() => openHeadline(item.link)}
                key={item.id}>
                <CardMultiFungsiItem
                  key={`headline-${item.id}`}
                  headline={item.headline}
                  image={item.image}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
  );
};

export default CardMultiFungsi;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 28,
    padding: 0,
    marginBottom: 4,
  },
  textChat: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: '#FFFFFF',
  },
});
