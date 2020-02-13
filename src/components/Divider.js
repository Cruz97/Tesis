import React from 'react';
import { Divider as EDivider } from 'react-native-elements';
import { withStyles } from 'react-native-ui-kitten';
import { hexToRGBA } from '../utils/Colors';

const Divider = ({ themedStyle }) => (
  <EDivider
    style={{ backgroundColor: hexToRGBA(themedStyle.divider.line, 0.6) }}
  />
);

export default withStyles(Divider, theme => ({
  divider: {
    line: theme['color-basic-600']
  }
}));
