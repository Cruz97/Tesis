import React from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';

const Load = ({ loading, children, style, themedStyle }) => {
  if (loading) {
    return (
      <View style={themedStyle.container}>
        <View style={{}}>
                            {/* <Image   source={require('../../assets/img/logo-principals.png')} style={{ 
                                ...StyleSheet.absoluteFillObject,
                                tintColor: '#000',
                                opacity: 0.9,
                                width: 150,
                                height: 150,
                            
                            }} 
                            resizeMode='contain'/> */}
                            <Image style={{width: 250, height: 220}} resizeMode='contain' source={require('../../assets/img/img_menu.jpeg')}  />
                            
                        </View>             
        <ActivityIndicator size="large" color={'#0288D1'} />
      </View>
    );
  }
  return <View style={[themedStyle.container, style]}>{children}</View>;
};

export default withStyles(Load, theme => ({
  container: {
    //backgroundColor: theme['background-basic-color-2'],
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  colors: {
    primary: theme['color-primary-500']
  }
}));
