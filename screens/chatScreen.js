import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Chat from '../components/Chat';
import Input from '../components/Input';
import auth from '@react-native-firebase/auth';
import SendButton from '../components/SendButton';
import SignOutButton from '../components/SignOutButton';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = () => {
  const [text, setText] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const timestamp = firestore.FieldValue.serverTimestamp();

  const sendMessage = async e => {
    const {uid, photoURL} = auth().currentUser;

    // Dont allow empty/large messages
    if (text.length > 1 && text.length < 40) {
      try {
        e.preventDefault();
        setLoading(true);

        await firestore()
          .collection('chats')
          .doc()
          .set({
            owner: uid,
            imageUrl: photoURL,
            text: text,
            createdAt: timestamp,
          })
          .then(() => {
            setText('');
            setLoading(false);
          })
          .catch(err => {
            setLoading(false);
            Alert.alert('Error', err);
          });
      } catch (err) {
        setLoading(false);
        Alert.alert('Error', err);
      }
    } else {
      setLoading(false);
      Alert.alert('Chat not sent', 'Must be between 1 and 40 characters');
    }
  };

  const handleSignOut = async () => await auth().signOut();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'asc')
      .limitToLast(15)
      .onSnapshot(querySnapshot => {
        const chatsArr = [];
        querySnapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();

          chatsArr.push({id, ...data});
        });
        setChats(chatsArr);
        setLoading(false);
      });

    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    const username = auth().currentUser.displayName;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{username}</Text>
          <SignOutButton handleClick={handleSignOut} />
        </View>

        <View style={styles.chatStyle}>
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
  chatStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    margin: 0,
    padding: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    // overflowY: 'scroll',
  },
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
    // elevation: 6,
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 0,
    paddingBottom: 0,
    backgroundColor: '#151718',
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
    backgroundColor: '#ffa600',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ChatScreen;
