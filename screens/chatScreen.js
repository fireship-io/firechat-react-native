import React, {useEffect, useState} from 'react';
import Input from '../components/Input';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import SendButton from '../components/SendButton';
import SignOutButton from '../components/SignOutButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Chat from '../components/Chat';

const ChatScreen = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState('');
  const timestamp = firestore.FieldValue.serverTimestamp();

  const sendMessage = async e => {
    if (text.length > 1 && text.length < 40) {
      try {
        e.preventDefault();
        setLoading(true);

        await firestore()
          .collection('chats')
          .doc()
          .set({
            owner: auth().currentUser.uid,
            imageUrl: auth().currentUser.photoURL,
            text: text,
            createdAt: timestamp,
          })
          .catch(err => {
            setLoading(false);
            Alert.alert('Error', err);
          })
          .finally(() => {
            setText('');
            setLoading(false);
          });
      } catch (err) {
        Alert.alert('Error', err);
        setLoading(false);
      }
    } else {
      setLoading(false);
      Alert.alert('Chat must be between 1 and 40 characters!');
    }
  };

  // const sendEmoji = async e => {
  //   e.preventDefault();
  //   setLoading(true);

  //   await firestore()
  //     .collection('chats')
  //     .doc()
  //     .set({
  //       owner: auth().currentUser.uid,
  //       imageUrl: auth().currentUser.photoURL,
  //       text: '🔥',
  //       createdAt: timestamp,
  //     })
  //     .catch(err => {
  //       setLoading(false);
  //       Alert.alert('Error', err);
  //     })
  //     .finally(() => {
  //       setText('');
  //       setLoading(false);
  //     });
  // };

  const handleSignOut = async () => await auth().signOut();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'asc')
      .limitToLast(15)
      .onSnapshot(querySnapshot => {
        const chatsArr = [];
        querySnapshot.forEach(doc => {
          chatsArr.push({id: doc.id, ...doc.data()});
        });
        setChats(chatsArr);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{auth().currentUser.displayName}</Text>
          <SignOutButton handleClick={handleSignOut} />
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
            margin: 0,
            padding: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            overflowY: 'scroll',
          }}>
          {chats && (
            <FlatList
              data={chats}
              renderItem={({item}) => <Chat key={item.id} chat={item} />}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input text={text} setText={setText} />
          <SendButton handleChat={sendMessage} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    paddingBottom: '15%',
    paddingTop: 0,
    backgroundColor: '#151718',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    height: 60,
    elevation: 6,
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 0,
    paddingBottom: 0,
    backgroundColor: '#191a1d',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1e2123',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    color: '#030303',
    marginRight: 'auto',
    marginLeft: 8,
    padding: 4,
  },
  textContainer: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    margin: 0,
    padding: 8,
    elevation: 6,
    backgroundColor: '#ffb700',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ChatScreen;
