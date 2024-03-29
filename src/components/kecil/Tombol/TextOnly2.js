import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const TextOnly2 = ({padding, title, onPress, fontSize}) => {

    return (
        <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
            <Text style={styles.text(fontSize)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TextOnly2

const styles = StyleSheet.create({
    container: (padding) => ({
        backgroundColor: colors.green2,
        padding: padding,
        borderRadius: 5
    }),
    text: (fontSize) => ({
        color: colors.white,
        textAlign: 'center',
        fontSize: fontSize ? fontSize : 13,
        fontFamily: fonts.primary.bold
    })
})
