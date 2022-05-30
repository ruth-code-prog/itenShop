import React, { useState } from "react";
import { Alert, Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { Button, Gap, Input } from "../..";
import FIREBASE from '../../../config/FIREBASE';
import { Tombol, Jarak } from "../../kecil";
import {colors, fonts} from '../../../utils';
import IcEye from '../../../assets/icons/eye.svg';
import IcEyeSlash from '../../../assets/icons/eye-slash.svg';
import {useNavigation} from '@react-navigation/native';

const ModalPassword = ({ visible, onSubmit, onClose, type, profile }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = () => {
    setLoading(true);
    if (password === String(profile?.drugPassword)) {
      navigation.navigate('DrugBerbayar', {
        profile,
      });
      onSubmit && onSubmit(password);
      setPassword('');
    } else {
      Alert.alert('Salah password');
    }
    setLoading(false);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.label}>Password Akses</Text>
          <Input
            onChangeText={(val) => setPassword(val)}
            value={password}
            label="Password Video Berbayar"
            secureTextEntry={!showPassword}
            right={!showPassword ? <IcEyeSlash /> : <IcEye /> }
            onPressRight={() => setShowPassword(!showPassword)}
            placeholder="Masukkan password"
          />
           <Jarak height={20} />
          <Tombol type="text3" onPress={handleSubmit} disable={loading} title="Submit" />
          <Jarak height={10} />
          <Tombol
            type="text4"
            onPress={() => onClose && onClose()}
            disable={loading}
            title="Tutup"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalPassword;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: colors.primary,
    width: Dimensions.get("screen").width - 40,
    padding: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: colors.white,
  }
});