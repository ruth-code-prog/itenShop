import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

export default function HeadlineItem({onPress, image}) {
   
    return (
    <View style={styles.container} onPress={onPress}>
        <Image source={{uri: image}} style={styles.image} />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 8,
        marginRight: 12,
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 2,
        height: Dimensions.get('screen').height / 5,
      },
      image: {
        width: Dimensions.get('screen').width - 250,
        height: Dimensions.get('screen').height / 5, 
         },
})
