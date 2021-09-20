import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SendButton = ({handleChat}) => {
  return (
    <>
      <TouchableOpacity onPress={handleChat} style={styles.button}>
        <Icon name="send" size={30} color="#030303" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleEmoji} style={styles.button2}>
        <Icon name="firebase" size={35} color="#f2c336" />
      </TouchableOpacity> */}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    padding: 0,
    margin: 0,
    marginLeft: 8,
    marginRight: 0,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 500,
    backgroundColor: '#00aeff',
  },
  // button2: {
  //   width: 50,
  //   height: 45,
  //   padding: 0,
  //   margin: 0,
  //   marginLeft: 0,
  //   marginRight: 0,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 500,
  // },
  // text: {
  //   fontWeight: '700',
  //   fontSize: 14,
  //   color: '#ffb700',
  // },
});

export default SendButton;
