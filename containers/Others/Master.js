import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
// import Header from '../components/comp_master/Header';
//import Body from '../components/comp_master/Body';
//mport Footer from '../components/comp_master/Footer';
import MenuDrawer from '../navigation/MenuDrawer';

class Master extends Component {
  render() {
    return (
      <SafeAreaView style={style.master}>
        <MenuDrawer />
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  master: {
    flex: 1,
  },
  header: {},
  body: {},
  footer: {},
});

export default Master;
