import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import ChatScreen from './screens/chatScreen';
import LoginScreen from './screens/loginScreen';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else if (!user) {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    }; // unsubscribe on unmount
  }, []);

  const backgroundStyle = {
    backgroundColor: '#151718',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          backgroundColor: '#151718',
        }}>
        {user && <ChatScreen />}
        {!user && <LoginScreen />}
      </View>
    </SafeAreaView>
  );
};

export default App;
