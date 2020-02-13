import React from 'react';
import {View, Button, StyleSheet, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MyMembresy from '../containers/MyMembresy';
import Certificates from '../containers/Certificates';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MyDrawerNavigator = createDrawerNavigator(
  {
    MyMembresy: {
      screen: MyMembresy,
    },
    Certificates: {
      screen: Certificates,
    },
  },
  {
      initialRouteName: 'MyMembresy',
    },
);

export default createAppContainer(MyDrawerNavigator);
