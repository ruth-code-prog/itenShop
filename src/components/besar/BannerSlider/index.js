import React, {Component, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Slider1, Slider2} from '../../../assets';
import {SliderBox} from 'react-native-image-slider-box';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';
import {useRoute, useNavigation} from '@react-navigation/core';

const BannerSlider = ({data, links}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SliderBox
        onCurrentImagePressed={index => {
          if (links[index]) {
            navigation.navigate('WebviewPage', {
              url: links[index],
            });
          }
        }}
        images={data}
        autoplay
        circleLoop
        sliderBoxHeight={responsiveHeight(150)}
        ImageComponentStyle={styles.slider}
        dotStyle={styles.dotStyle}
        dotColor={colors.primary}
        resizeMode="stretch"
        imageLoadingColor={colors.white2}
      />
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: -15,
  },
  slider: {
    borderRadius: 10,
    width: responsiveWidth(354),
  },
  dotStyle: {
    width: 10,
    height: 5,
    borderRadius: 5,
  },
});

