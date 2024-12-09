// ./components/CustomTextInput.js

import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  error,
  helperText,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  style,
}) => (
  <>
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      maxLength={maxLength}
      mode="outlined"
      error={error}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={style}
      theme={{
        colors: { primary: '#228B22', underlineColor: 'transparent' },
      }}
    />
    {helperText && (
      <HelperText type="error" visible={error}>
        {helperText}
      </HelperText>
    )}
  </>
);

export default CustomTextInput;
