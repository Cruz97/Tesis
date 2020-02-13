import React from 'react';
import { View } from 'react-native';
import { Text, Toggle } from 'react-native-ui-kitten';
import Label from './Label';

export default class Boolean extends React.Component {
  render() {
    const { checked, disabled, onValueChange, title } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 2
        }}
      >
        {title ? (
          <View style={{ flex: 1.5 }}>
            <Label alternativeColor={this.props.labelColor}>{title}</Label>
          </View>
        ) : (
          undefined
        )}
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Toggle
            checked={checked}
            onChange={value => onValueChange(value)}
            disabled={disabled}
          />
        </View>
      </View>
    );
  }
}
