import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import RunningTextWebview from '../RunningTextWebview';

const WebviewPage = ({route, navigation}) => {
  const {url} = route?.params || {};
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.pages}>
      <View>
        <RunningTextWebview />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/backIcon.png')}
            style={{width: 45, height: 45, marginLeft: 10}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={40} />
        </View>
      ) : (
        <WebView
          onLoad={() => setLoading(false)}
          style={{flex: 1}}
          source={{uri: url}}
        />
      )}
    </View>
  );
};

export default WebviewPage;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    fontSize: 24,
    color: 'black',
    margin: 18,
  },
  loading: {
    alignSelf: 'center',
    margin: 20,
  },
});
