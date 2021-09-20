import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Chat = ({chat}) => {
  const {owner} = chat;

  return owner === auth().currentUser.uid ? (
    <Sent chat={chat} />
  ) : (
    <Received chat={chat} />
  );
};

const Received = ({chat}) => {
  const styles = StyleSheet.create({
    text: {
      fontWeight: '500',
      letterSpacing: 0.5,
      fontSize: 18,
      color: '#131313',
      padding: 0,
      textAlign: 'left',
      maxWidth: '75%',
    },
    image: {
      width: 45,
      height: 45,
      marginRight: 5,
      marginLeft: 0,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchable: {
      height: 'auto',
      minWidth: 10,
      maxWidth: '100%',
      borderRadius: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginRight: 'auto',
      padding: 4,
      elevation: 6,
      backgroundColor: '#00c3ff',
    },
  });

  const {id, imageUrl, text} = chat;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 75,
        margin: 0,
        marginRight: 'auto',
      }}>
      <TouchableOpacity key={id} style={styles.touchable}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Sent = ({chat}) => {
  const styles = StyleSheet.create({
    text: {
      fontWeight: '500',
      letterSpacing: 0.5,
      fontSize: 18,
      color: '#131313',
      padding: 0,
      textAlign: 'right',
      maxWidth: '75%',
    },
    image: {
      width: 45,
      height: 45,
      marginRight: 0,
      marginLeft: 5,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchable: {
      height: 'auto',
      minWidth: 10,
      maxWidth: '100%',
      borderRadius: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: 0,
      marginLeft: 'auto',
      padding: 4,
      elevation: 6,
      backgroundColor: '#ffa600',
    },
  });

  const {id, text} = chat;

  const handleDelete = async () => {
    await firestore().collection('chats').doc(id).delete();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 75,
        margin: 0,
        marginLeft: 'auto',
      }}>
      <TouchableOpacity
        key={id}
        onPress={handleDelete}
        style={styles.touchable}>
        <Text style={styles.text}>{text}</Text>
        <Image
          style={styles.image}
          source={{uri: auth().currentUser.photoURL}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
