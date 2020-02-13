import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';
import FilterPicker from './FilterPicker';
import Label from './Label';

export default class ManyToOne extends Component {
  state = {
    visible: false
  };

  render() {
    const {
      row,
      selectedValue,
      onValueChange,
      title,
      items = {},
      placeholder = '',
      style,
      textStyle,
      buttonStyle,
      renderItem
    } = this.props;
    const rowStyle = row ? styles.row : {};
    return (
      <View style={[{ flex: 0 }, rowStyle, style]}>
        {title ? <Label alternativeColor={this.props.labelColor}>{title}</Label> : undefined}
        <Button
          onPress={() => this.setState({ visible: true })}
          appearance={'ghost'}
          disabled={this.props.disabled}
          textStyle={[{ fontSize: 16 }, textStyle]}
          style={[
            { flex: row ? 1 : 0, marginLeft: row ? '3%' : 0, paddingBottom: 5 },
            buttonStyle
          ]}
        >
          {items[selectedValue]
            ? items[selectedValue].label
            : `Asignar ${!placeholder && title ? title.replace(':', '') : placeholder}`}
        </Button>
        <FilterPicker
          visible={this.state.visible}
          onValueChange={value => {
            onValueChange(value);
            this.setState({ visible: false });
          }}
          renderItem={renderItem}
          onCancel={() => this.setState({ visible: false })}
          items={Object.values(items)}
        />
      </View>
    );
  }
}

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};
