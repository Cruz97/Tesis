import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from '@react-native-firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyBRoF6ypW3TitHAk13ajGnqv_994lQ1IKw",
    authDomain: "adopcionapppets.firebaseapp.com",
    databaseURL: "https://adopcionapppets.firebaseio.com",
    projectId: "adopcionapppets",
    storageBucket: "adopcionapppets.appspot.com",
    messagingSenderId: "253581692222",
    appId: "1:253581692222:web:e82005284fdb2ac504b06f",
    measurementId: "G-5W6YH22YWX"
  };
firebase.initializeApp(firebaseConfig,'TesisAdopcion');

AppRegistry.registerComponent(appName, () => App);
