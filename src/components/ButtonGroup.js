import React, { Component } from 'react';
import { Picker, View, ScrollView } from 'react-native';
import Label from './Label';
import { withStyles, Button } from 'react-native-ui-kitten';
import { hexToRGBA } from '../utils/Colors';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      style,
      title,
      selectedValue,
      onValueChange,
      items = [],
      showValue,
      selectedKey,
      row,
      themedStyle,
      disabled
    } = this.props;
    let { width = 0 } = this.state;
    const lenFields = Object.keys(items).length || 1;
    width = width * (lenFields < 4 ? 1 / lenFields : 0.3);
    return (
      <View
        onLayout={event => {
          const { width, height } = event.nativeEvent.layout;
          this.setState({ width, height });
        }}
        style={[{ flex: 0 }, style]}
      >
        {title ? <Label>{title}</Label> : undefined}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.row}>
            {Object.entries(items).map(([key, value], index) => {
              const item = showValue ? value[showValue] : value;
              const itemKey = selectedKey ? value[selectedKey] : key;
              const selected = selectedValue === itemKey;
              return (
                <Button
                  key={key}
                  appearance={'ghost'}
                  disabled={disabled}
                  onPress={() => onValueChange(itemKey, index)}
                  textStyle={{
                    color: selected
                      ? themedStyle.colors.active
                      : hexToRGBA(themedStyle.colors.disabled, 0.65)
                  }}
                  style={{
                    width,
                    borderWidth: 0.25,
                    borderColor: 'transparent',
                    ...(index < items.length - 1 && {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0
                    }),
                    ...(index > 0 && {
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0
                    }),
                    paddingHorizontal: 0
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default withStyles(ButtonGroup, theme => ({
  colors: {
    active: theme['color-primary-500'],
    disabled: theme['background-alternative-color-3']
  }
}));
