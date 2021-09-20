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
    fontSize: 14,
    fontWeight: '600',
    color: '#030303',
  },
});

export default SignOutButton;
