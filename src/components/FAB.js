import React from 'react';
import { Icon } from 'react-native-elements';
import { withStyles } from 'react-native-ui-kitten';
import { hexToRGBA } from '../utils/Colors';

const FAB = ({ onPress, icon, themedStyle, disabled, style, size = 30, containerStyle }) => (
  <Icon
    reverse
    name={icon}
    color={hexToRGBA(
      disabled ? themedStyle.colors.disabled : themedStyle.colors.active,
      0.75
    )}
    size={size}
    containerStyle={[
      { position: 'absolute', margin: 16, right: 0, bottom: 0 },
      style
    ]}
    style={containerStyle}
    onPress={disabled ? undefined : onPress}
  />
);

export default withStyles(FAB, theme => ({
  colors: {
    active: theme['color-info-700'],
    disabled: theme['color-basic-700']
  }
}));
