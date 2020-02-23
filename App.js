import React, { Component, Fragment, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { mapping, light as defaultTheme } from '@eva-design/eva';
import SafeAreaView from 'react-native-safe-area-view';
import PushController from './PushController';
import AppNavigator from './src/containers';
import { myTheme } from './src/assets/styles/Theme';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';



const ob = {
  //uuid: '',
  //uuid: '',
  id: 1,
  membresy: null,
  name: 'JOSE',
  lastname: 'CRUZ',
  password: 'jc1997'
}


const theme = {
  ...defaultTheme,
  ...myTheme
};

const uuid = "193ddc00-07de-11ea-a7d3-172419e690f3" 
const user = "jcruz"
const password = "jcruz123"
//const datalocal = 'AppSettings'

// useEffect(() => {
//   this.checkPermission();
//   this.messageListener();
//  }, []);


export default class App extends Component {

  

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
   }

   requestPermission = async () => {
    try {
     await firebase.messaging().requestPermission();
     // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
   }

  //  messageListener = async () => {
    
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     const { title, body } = notification;
  //     alert(title +' '+ body);
  //   });
   
  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     const { title, body } = notificationOpen.notification;
  //     alert(title +' '+ body);
  //   });
   
  //   const notificationOpen = await firebase.notifications().getInitialNotification();
  //   if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification;
  //     alert(title +' '+ body);
  //   }
   
  //   // this.messageListener = firebase.messaging().onMessage((message) => {
  //   //  alert(JSON.stringify(message));
  //   // });
  //  }

   getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      let refToken = firebase.database().ref('token');
      refToken.set({
        "id": fcmToken
      });
     alert("Your Firebase Token is:" + fcmToken);
    } else {
     alert("Failed No token received");
    }
   }

  componentDidMount(){
      firebase.messaging().getToken()
    .then(fcmToken => {
      if (fcmToken) {
        let refToken = firebase.database().ref('token');
      refToken.set({
        "id": fcmToken
      });
        alert(fcmToken)
        // user has a device token
      } else {
        // user doesn't have a device token yet
      } 
    });

    if(!firebase.messaging().isRegisteredForRemoteNotifications){
      firebase.messaging().registerForRemoteNotifications().then((value)=>{
        //alert(JSON.stringify(value,null,4))
      })

      
    }
    firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
      //console.log('Message handled in the background!', remoteMessage);
    });
    
  }

  render() {
    console.disableYellowBox = true;
    return (
      <ApplicationProvider mapping={mapping} theme={theme}>
        
        <StatusBar backgroundColor={theme['color-basic-1000']} />
        <SafeAreaView style={{ flex: 1 }}>
        
          <AppNavigator/>
        </SafeAreaView>
      </ApplicationProvider>
    );
  }
}
