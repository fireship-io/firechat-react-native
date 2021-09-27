## firechat-react-native

### Project structure

#### Connect to the dev server using adb reverse

1. Enable debugging over USB

> To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to Settings → About phone → Software information and then tapping the Build number row at the bottom seven times. You can then go back to Settings → Developer options to enable "USB debugging"

2. (optional) Plug in your device via USB (Physical device)

3. Check that your device is properly connecting to ADB

```zsh
$ emulator -list-avds


$ adb devices
# List of devices attached
# emulator-5554 offline   # Google emulator
# 14ed2fcc device         # Physical device (usb)
```

4. Connect to the development server

```zsh
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

3. Run the app

```zsh
$ npm run android # Debug build
$ npm run android --variant=release # Release build

# or

$ npx react-native run-android # Debug build
$ npx react-native run-android --variant=release # Release build
```

```
firechat-react-native
├── README.md
├── node_modules
├── package.json
├── metro.config.js
├── package.json
├── index.js
├── App.js
├── app.json
├── screens
│   ├── chatScreen.js
│   └── loginScreen.js
└── components
    ├── Chat
    │   └── index.js
    ├── Input
    │   └── index.jsx
    ├── SendButton
    │   └── index.js
    └── SignOutButton
        └── index.js
```

# Generating SHA

To retrieve correct SHA1 run `keytool -exportcert -list -v -alias androiddebugkey -storepass android -keystore android/app/debug.keystore`