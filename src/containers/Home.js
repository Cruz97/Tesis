import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, withStyles } from 'react-native-ui-kitten';


class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  state = {
    events: []
  };

  

  componentDidMount() {
    this.didFocudSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        
      }
    );
  }

  componentWillUnmount() {
    this.didFocudSubscription.remove();
  }


  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: '2%',
          paddingTop: '1%',
          backgroundColor: this.props.themedStyle.colors.backgroundColor
        }}
      >
        
      </View>
    );
  }
}

export default withStyles(Home, theme => ({
  colors: {
    active: theme['color-primary-500'],
    disabled: theme['background-alternative-color-3'],
    backgroundColor: theme['background-basic-color-2']
  }
}));
