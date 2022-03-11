import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import FIREBASE from '../../config/FIREBASE';

const PanRen = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [imageUrl, setImageUrl] = useState(undefined);

  useEffect(() => {
    FIREBASE.database()
      .ref('promote/') //name in storage in firebase console
      .once('value')
      .then(res => {
        console.log('image: ', res.val());
        if (res.val()) {
          setImageUrl(res.val());
        }
      })
      .catch(Error => {
        showError;
      });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
     <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <Image style={styles.box} source={{uri: imageUrl}} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    borderRadius: 20,
    marginTop: -670,
    marginLeft: 280,
  },
});

export default PanRen;
