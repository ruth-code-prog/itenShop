import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  RefreshControl,
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
  const [textChat, setTextChat] = useState([]);
  const [headline, setHeadline] = useState([]);
  const [textChat2, setTextChat2] = useState([]);
  const [textChat3, setTextChat3] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getTextChat();
    getTextChat2();
    getTextChat3();
  }, []);

  const getTextChat = () => {
    FIREBASE.database()
      .ref('textChat')
      .once('value')
      .then(res => {
        setTextChat(res?.val());
      })
      .catch(err => {
        console.error(err);
      });
  };

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
        setRefreshing(true);
        if (res.val()) {
          setHeadline(res.val());
        }
        setRefreshing(true);
      wait(3000).then(() => setRefreshing(false));
      })
      .catch(Error => {
        showError;
      });
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const openHeadline = url => {
    Linking.openURL('https://' + url);
  };

  return (
    <>
    <View>
    <Text style={styles.label}>{textChat}</Text>
        <Text style={styles.textChat}>{textChat2}</Text>
      </View>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={headline} />
        }>
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
    marginTop: 2,
    flexDirection: 'row',
    marginBottom: 20,
  },
  textChat: {
    fontSize: 12,
    fontFamily: fonts.primary.regular,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
