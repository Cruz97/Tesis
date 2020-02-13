import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DarkCard = ({ background, style, onPress, children }) => {
  return (
    <TouchableOpacity
      style={[{ flex: 1, borderRadius: 15 }, style]}
      activeOpacity={0.65}
      onPress={onPress}
    >
      {background ? (
        <Image
          source={background}
          resizeMode={'cover'}
          style={{
            width: null,
            height: null,
            borderRadius: 15,
            ...StyleSheet.absoluteFillObject
          }}
        />
      ) : (
        undefined
      )}
      <View
        style={{
          flex: 1,
          borderRadius: 15,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          ...StyleSheet.absoluteFillObject
        }}
      />
      {children}
    </TouchableOpacity>
  );
};

export default DarkCard;
