import React from 'react';
import { Text } from 'react-native-ui-kitten';

export default ({ children, style, alternativeColor }) => {
  const extra = alternativeColor ? { color: alternativeColor } : {};
  return (
    <Text numberOfLines={2} style={[{ fontSize: 16, fontWeight: 'bold', ...extra  }, style]}>
      {children}
    </Text>
  );
};
