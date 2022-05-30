import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import Jarak from '../Jarak';

const Input = ({label, value, onChangeText, secureTextEntry, disable, keyboardType, placeholder, isDark,
  right,
  onPressRight,}) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  const colorLabel = {
    color: isDark ? colors.black : colors.white,
  };

  return (
    <View>
      <Jarak height={10} />
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
        selectionColor="white"
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="white"
      />{right && (
        <TouchableOpacity
          onPress={() => {
            onPressRight && onPressRight();
          }}
          style={styles.right}
          activeOpacity={onPressRight ? 0.6 : 1}>
          {right}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 12,
    color: "#FFFFFF"
  }),
  label: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 6,
  },
  right: {
    position: 'absolute',
    right: 16,
    top: '50%',
  },
});