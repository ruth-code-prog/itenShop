import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {Gap, Input, Loading} from '../..';
import {colors, useFormSoul} from '../../../utils';
import {Tombol, Jarak} from '../../kecil';

const ModalAddPenunjang = ({
  loading,
  onAddImage,
  onSubmit,
  uploadLoading,
  visible,
  onClose,
  form,
  setForm,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Tambah Foto</Text>
          <Input
            value={form.title}
            onChangeText={val => setForm({title: val})}
            label={'Masukkan Judul'}
          />
          {form?.image && (
            <View style={{alignItems: 'center'}}>
              <Jarak height={20} />
              <Image style={styles.image} source={{uri: form?.image}} />
            </View>
          )}
          <Jarak height={20} />
          <Tombol
            type="text2"
            padding={14}
            onPress={() => onAddImage && onAddImage()}
            title={form?.image ? 'Ubah Gambar' : 'Upload Gambar'}
          />
          <Jarak height={20} />
          <Tombol
            type="text3"
            onPress={() => onSubmit && onSubmit()}
            disable={form.title === '' || !form.image}
            loading={uploadLoading}
            title={'Kirim'}
          />

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

export default ModalAddPenunjang;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.primary,
    width: Dimensions.get('screen').width - 40,
    padding: 20,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    height: 34,
    width: 34,
    borderRadius: 200,
    backgroundColor: '#F4A460',
    alignItems: 'center',
    justifyContent: 'center',
    right: -8,
    top: -12,
    position: 'absolute',
    zIndex: 9999,
    right: 14,
    top: 2,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
