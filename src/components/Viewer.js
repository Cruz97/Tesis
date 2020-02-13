import React, { Component } from 'react';
import { View } from 'react-native';
import { ViewPager, withStyles } from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import {hexToRGBA} from '../utils/Colors';

class Viewer extends Component {
  state = {
    selectedIndex: 0
  };

  onIndexChange = selectedIndex => {
    this.setState({ selectedIndex });
  };

  render() {
    const { themedStyle } = this.props;
    return (
      <View style={this.props.style}>
        <ViewPager
          style={{ flex: 1.1, marginBottom: '1%' }}
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onIndexChange}
        >
          {this.props.children}
        </ViewPager>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {this.props.children.map((i, index) => (
            <Icon
              key={index}
              size={7}
              name={'brightness-1'}
              color={
                index === this.state.selectedIndex
                  ? themedStyle.colors.active
                  : hexToRGBA(themedStyle.colors.disabled, 0.5)
              }
            />
          ))}
        </View>
      </View>
    );
  }
}

export default withStyles(Viewer, theme => ({
  colors: {
    active: theme['color-primary-500'],
    disabled: theme['background-alternative-color-3']
  }
}));
