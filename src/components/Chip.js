import React from 'react';
import { Chip as ChipPaper } from 'react-native-paper';
import { styled } from 'react-native-ui-kitten';

const ChipComponent = ({
  label,
  themedStyle,
  disabled,
  onClose,
  ...restProps
}) => (
  <ChipPaper
    {...restProps}
    disabled={disabled}
    onClose={disabled ? undefined : onClose}
    mode={'outlined'}
    selectedColor={themedStyle.borderColor}
    theme={{
      colors: {
        surface: themedStyle.backgroundColor,
        disabled: themedStyle.textColor
      }
    }}
    textStyle={{
      fontSize: 16,
      fontWeight: themedStyle.textFontWeight
      // marginVertical: '2%'
    }}
  >
    {label}
  </ChipPaper>
);

ChipComponent.styledComponentName = 'Button';
const FilterPicker = styled(ChipComponent);

export default props => <FilterPicker {...props} appearance={'outline'} />;
