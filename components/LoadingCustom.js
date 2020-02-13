import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { ButtonGroup, Icon, Overlay} from 'react-native-elements';
import {myTheme} from '../src/assets/styles/Theme';
import { Layout, withStyles } from 'react-native-ui-kitten';
import * as Progress from 'react-native-progress';

export class LoadingCustom extends Component {
    render() {
        const {
            themedStyle,
            loadVisible,
            onBackdropPress,
            source,
            title,
            subtitle,
            textButton,
            onPress,
            progress, info
         } = this.props;
        return (
            <Overlay
            isVisible={loadVisible}
            windowBackgroundColor="rgba(0, 0, 0, .6)"
            overlayBackgroundColor="white"
            //onBackdropPress={onBackdropPress}
            width={320}
            
            height="auto"
            overlayStyle={{padding:20, paddingVertical:50, borderRadius: 10, alignItems: 'center'}}
            >
                    {/* <Text>{progress}</Text> */}
                <Progress.Bar 
                   progress={progress}  
                   width={250}  
                   height={10}
                   color={themedStyle.progress.primary}
                   />
        
            </Overlay>
        )
    }
}

export default withStyles(LoadingCustom, myTheme => ({
    colors: {
      primary: myTheme['color-material-primary-300'],
      ligth: myTheme['color-material-primary-100'],
      icon: '#fff'
    },
    text: {
        primary: myTheme['color-material-primary-400']
    },
    progress: {
        primary: myTheme['color-success-500']
    }
  }));

