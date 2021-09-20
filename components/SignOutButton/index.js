import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const SignOutButton = ({handleClick}) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <Text style={styles.text}>Sign out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 14,
    color: '#030303',
  },
});

export default SignOutButton;
