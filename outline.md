## React Native Firechat outline

1. Create a new React Native project via [React Native Docs](https://reactnative.dev/docs/next/environment-setup)

2. Create a new Firebase project
3. Enable Google Authentication and Firestore
4. Add a new Firebase Android app
5. Follow the Android SDK installation instructions
6. Download the google-services.json file and add it into the project's android/app folder
7. Install the packages for firebase, google sign in, and vector icons:

```sh
npm i @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-google-signin/google-signin react-native-vector-icons
```

8. Create new folders for 'components' and 'screens'
9. In the screens folder, add 'chatScreen.js' and 'loginScreen.js'
10. In the components folder, add 4 new component folders 'Chat', 'Input', 'SendButton', and 'SignOutButton' each with their own respective files inside each folder called 'index.js'
11. Add the code for each component
12. Add the code for each screen
13. Add the auth state/auth state logic and code for App.js

** Make sure to add the webclientID into the initialization code for Google Sign In which can be found in the Google Auth settings in the firebase dashboard **
