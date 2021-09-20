import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const Input = ({text, setText}) => {
  return (
    <TextInput
      placeholder="Enter message"
      value={text}
      onChangeText={setText}
      style={styles.textInput}
      placeholderTextColor="#595959"
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '75%',
    padding: 12,
    margin: 0,
    paddingBottom: 0,
    paddingTop: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: 0,
    backgroundColor: '#282a2d',
    color: '#ffa600',
    fontWeight: '500',
    letterSpacing: 0.25,
    fontSize: 18,
    borderRadius: 500,
    alignItems: 'center',
  },
});

export default Input;
