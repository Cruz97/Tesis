import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { mapping, light as defaultTheme } from '@eva-design/eva';
import SafeAreaView from 'react-native-safe-area-view';

import AppNavigator from './src/containers';
import { myTheme } from './src/assets/styles/Theme';



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



export default class App extends Component {

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
