import React from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  // Initialize google sign in
  GoogleSignin.configure({
    webClientId:
      // Pulled from the firebase console
      '1081896986894-mrouhl6pb5kq29u5ui4hetk9n3fntd1v.apps.googleusercontent.com',
  });

  const handleLogin = async () => {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#151718',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {width: 225, height: 60},
});

export default LoginScreen;
