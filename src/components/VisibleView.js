import React from 'react';
import { Animated } from 'react-native';

const VisibleView = ({ isVisible, children, style }) => {
  if (isVisible) {
    if (style) {
      return (
        <Animated.View
          style={[{ backgroundColor: 'transparent' }, style]}
          collapsable
        >
          {children}
        </Animated.View>
      );
    }
    return children;
  }
  return <Animated.View />;
};

export default VisibleView;
