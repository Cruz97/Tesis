import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Avatar, Icon, Input, Button, colors } from 'react-native-elements';
import { withStyles } from 'react-native-ui-kitten';

const ButtonCustom = ({onPress,title, buttonStyle, icon, primary, secondary, bRadius,themedStyle, titleStyle,colorcustom, style}) => (
    <Button onPress={()=> {}}
            style={style}
            buttonStyle={[buttonStyle,{
                
                backgroundColor: primary ? themedStyle.colors.primary : colorcustom
            }]
            

            }
            title={title}
            titleStyle={{
              marginLeft: 10,
              ...titleStyle
            }}
            onPress={onPress}
            icon = {
             icon
            }
           // iconContainerStyle={{marginRight: 20}}
                        >
    </Button>
  );

// const style = StyleSheet.create({
//     btn:{
//         borderRadius: 20,
//     }
// })

// export default ButtonCustom

export default withStyles(ButtonCustom, theme => ({
    colors: {
      primary: theme['color-success-600'],
      secondary: theme['color-primary-600'],
      icon: '#fff'
    }
  }));
  
