import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import FilterPicker from './FilterPicker';
import Chip from './Chip';
import Label from './Label';

export default class ManyToMany extends Component {
  state = {
    visible: false
  };

  render() {
    const {
      selectedValues = [],
      onValueChange,
      title,
      items = {},
      style
    } = this.props;
    let availableItems = Object.values(items);
    availableItems = availableItems.filter(
      ({ key }) => selectedValues.indexOf(key) === -1
    );
    return (
      <View style={[{ flex: 0, marginBottom: '4%' }, style]}>
        <Label style={{ marginBottom: '3%' }}>{title}</Label>
        <View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.renderItems()}
            <Chip
              onPress={() => this.setState({ visible: true })}
              label={'+'}
              disabled={this.props.disabled}
            />
          </View>
        </View>
        <FilterPicker
          visible={this.state.visible}
          onValueChange={value => {
            let newSelectedValues = selectedValues;
            newSelectedValues.push(value);
            onValueChange(newSelectedValues);
            this.setState({ visible: false });
          }}
          onCancel={() => this.setState({ visible: false })}
          items={availableItems}
        />
      </View>
    );
  }

  renderItems() {
    const selectedValues = this.props.selectedValues || [];
    return selectedValues.map(id => {
      const value = this.props.items ? this.props.items[id] : null;
      if (value) {
        return (
          <Chip
            key={value.key}
            onClose={() => {
              const newValues = this.props.selectedValues.filter(
                item => value.key !== item
              );
              this.props.onValueChange(newValues);
            }}
            disabled={this.props.disabled}
            label={value.label}
          />
        );
      } else {
        return null;
      }
    });
  }
}
