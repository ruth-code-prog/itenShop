import React, {Component, useCallback, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import FIREBASE from '../../config/FIREBASE';

const RunningTextWebview = props => {
  const [runningText, setRunningText] = useState(null);

  useEffect(() => {
    getRunningText();
  }, []);

  const getRunningText = () => {
    FIREBASE.database()
      .ref('runningTextWebview')
      .once('value')
      .then(res => {
        setRunningText(res?.val());
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={styles.runningText}>
      <Image
        style={styles.runningTextLogo}
        source={require('../../assets/megaphone.png')}
      />
      {runningText ? (
            <View style={{flex: 1}}>
              <TextTicker
                style={{
                  fontSize: 16,
                  color: '#000000',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  //width: Dimensions.get("screen").width - 40,
                }}
                duration={20000}
                loop
                // bounce
                repeatSpacer={50}>
                {runningText}
              </TextTicker>
            </View>
          ) : null}
    </View>
  )
}

export default RunningTextWebview

const styles = StyleSheet.create({
  runningText: {
    paddingHorizontal: 2,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  runningTextLogo: {
    height: 44,
    width: 44,
    marginRight: 0,
  },
})
