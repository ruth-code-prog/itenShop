import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, getData} from '../../../utils';
import {ILUsernull} from '../../../assets';

const HomeProfile = ({onPress}) => {
  const [profile, setProfile] = useState({
    avatar: ILUsernull,
    nama: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData('user')
      .then(res => {
        const data = res;
        data.avatar = {uri: res.avatar};
        setProfile(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <Text style={styles.name}>{profile?.nama}</Text>
      <Image source={profile.avatar} style={styles.avatar} />
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flex: 1},
  avatar: {width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12},
  name: {
    fontStyle: 'italic',
    fontSize: 16,
    paddingBottom: 6,
    fontFamily: fonts.primary[600],
    color: '#E5B654',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 86 / 2,
    marginRight: 12,
    marginTop: 2,
  },
});
