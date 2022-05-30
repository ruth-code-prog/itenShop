import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconBack, IconKeranjang, IconSubmit } from '../../../assets'
import { colors } from '../../../utils'
import TextIcon from './TextIcon'
import TextOnly from './TextOnly'
import TextOnly2 from './TextOnly2'
import TextOnly3 from './TextOnly3'
import TextOnly4 from './TextOnly4'
import TombolLoading from './TombolLoading'

const Tombol = (props) => {

    const Icon = () => {
        if(icon === "keranjang") {
            return <IconKeranjang />
        }else if(icon === "arrow-left") {
            return <IconBack />
        }else if (icon === 'submit') {
            return <IconSubmit />;
          }

        return <IconKeranjang />
    }

    const { icon, totalKeranjang, padding, type, onPress, loading, disable } = props;

    //Loading
    if(loading) {
        return <TombolLoading {...props} />
    }
    
    if(type === "text") {
        return <TextOnly {...props} />
    }
    if(type === "text2") {
            return <TextOnly2 {...props} />
    }
    if(type === "text3") {
            return <TextOnly3 {...props} />
    }
    if(type === "text4") {
            return <TextOnly4 {...props} />
    }
    if (disable) {
        return (
          <View style={styles.disableBg}>
            <Text style={styles.disableText}>{title}</Text>
          </View>
        );
    }
    else if(type === "textIcon") {
        return <TextIcon {...props}/>
    }

    return (
        <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
            <Icon />

            {totalKeranjang && (
                <View style={styles.notif}>
                    <Text style={styles.textNotif}>{totalKeranjang}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default Tombol

const styles = StyleSheet.create({
    container: (padding) => ({
        backgroundColor: colors.white,
        padding: padding,
        borderRadius: 5
    }),
    notif: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        borderRadius: 3,
        padding: 3
    },
    textNotif: {
        fontSize: 8,
        color: colors.white
    },
    disableBg: {
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#EDEEF0',
      },
      disableText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#B1B7C2',
      },
})
