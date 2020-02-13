import {
  createIconSetFromFontello,
  createIconSetFromIcoMoon
} from 'react-native-vector-icons';
import faConfig from '../assets/fonts/fa';
import fasConfig from '../assets/fonts/fas';
import falConfig from '../assets/fonts/fal';
import fadConfig from '../assets/fonts/fad';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text as NativeText,
  TouchableHighlight,
  View
} from 'react-native';

const FA = createIconSetFromFontello(faConfig);
const FAS = createIconSetFromFontello(fasConfig);
const FAL = createIconSetFromFontello(falConfig);
const FAD = createIconSetFromIcoMoon(fadConfig, 'FAD', 'fad.ttf');

const AwesomeIcon = props => {
  const {
    type,
    name = 'fal-question',
    size,
    color,
    iconStyle,
    underlayColor,
    reverse,
    raised,
    containerStyle,
    reverseColor,
    disabled,
    disabledStyle,
    onPress,
    buttonStyle,
    Component = onPress ? TouchableHighlight : View,
    ...attributes
  } = props;

  let IconComponent = FAL;
  if (name.startsWith('fa-')) {
    IconComponent = FA;
  } else if (name.startsWith('fas-')) {
    IconComponent = FAS;
  } else if (name.startsWith('fal-')) {
    IconComponent = FAL;
  } else if (name.startsWith('fad-')) {
    IconComponent = FAD;
  }

  const getBackgroundColor = () => {
    if (reverse) {
      return color;
    }

    return raised ? 'white' : 'transparent';
  };

  return (
    <View style={containerStyle && containerStyle}>
      <Component
        {...attributes}
        underlayColor={reverse ? color : underlayColor || color}
        style={StyleSheet.flatten([
          (reverse || raised) && styles.button,
          (reverse || raised) && {
            borderRadius: size + 4,
            height: size * 2 + 4,
            width: size * 2 + 4
          },
          raised && styles.raised,
          {
            backgroundColor: getBackgroundColor(),
            alignItems: 'center',
            justifyContent: 'center'
          },
          disabled && styles.disabled,
          disabled && disabledStyle,
          buttonStyle && buttonStyle
        ])}
        {...onPress && { disabled }}
        onPress={onPress}
      >
        <IconComponent
          testID="iconIcon"
          style={StyleSheet.flatten([
            { backgroundColor: 'transparent' },
            iconStyle && iconStyle
          ])}
          size={size}
          name={name.replace(/fa(s|l|d|)-/g, '')}
          color={reverse ? reverseColor : color}
        />
      </Component>
    </View>
  );
};

AwesomeIcon.defaultProps = {
  underlayColor: 'white',
  reverse: false,
  raised: false,
  size: 24,
  color: 'black',
  reverseColor: 'white',
  disabled: false
};

const styles = StyleSheet.create({
  button: {
    margin: 7
  },
  raised: {
    ...Platform.select({
      android: {
        elevation: 3
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      }
    })
  },
  disabled: {
    backgroundColor: '#D1D5D8'
  }
});

export default AwesomeIcon;
