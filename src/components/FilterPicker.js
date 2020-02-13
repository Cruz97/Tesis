import React, { Component } from 'react';
import { Button, Text, withStyles } from 'react-native-ui-kitten';
import { createFilter } from 'react-native-search-filter';
import { hexToRGBA } from '../utils/Colors';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { LabelInput } from './index';
import Divider from './Divider';

class FilterPicker extends Component {
  state = {
    searchTerm: '',
    selection: []
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      JSON.stringify(this.props.selection) !==
      JSON.stringify(nextProps.selection)
    ) {
      this.setState({ selection: nextProps.selection });
    }
    return true;
  }

  render() {
    const {
      visible,
      onValueChange,
      onCancel,
      items,
      themedStyle: theme,
      renderItem,
      multiselection
    } = this.props;
    let { filters = [] } = this.props;
    filters = [...filters, 'key', 'label', 'searchKey'];
    const filtered = items.filter(createFilter(this.state.searchTerm, filters));
    const selection = this.state.selection;
    return (
      <Overlay
        isVisible={visible}
        onBackdropPress={() => {
          onCancel();
          if (this.props.selection && !this.props.selection.length) {
            this.setState({ selection: [] });
          }
        }}
        overlayBackgroundColor={theme.overlay.overlayColor}
        windowBackgroundColor={hexToRGBA('#000000', 0.6)}
        width="90%"
        height="90%"
      >
        <View style={{ flex: 1 }}>
          <LabelInput
            hideLine
            value={this.state.searchTerm}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            placeholder={'Buscar...'}
          />
          <Divider />
          <Divider />
          <FlatList
            data={filtered}
            initialNumToRender={20}
            renderItem={({ item: record, index }) => {
              const selectedIndex = selection.indexOf
                ? selection.indexOf(record.key)
                : -1;
              const selected = selectedIndex !== -1;
              return (
                <TouchableOpacity
                  onPress={
                    !multiselection
                      ? () => onValueChange(record.key)
                      : () => {
                          const newSelection = [...selection];
                          if (selected) {
                            newSelection.pop(selectedIndex);
                          } else {
                            newSelection.push(record.key);
                          }
                          this.setState({ selection: newSelection });
                        }
                  }
                  key={index}
                >
                  {renderItem ? (
                    renderItem(record)
                  ) : (
                    <View
                      style={[
                        styles.emailItem,
                        {
                          flexDirection: 'row',
                          justifyContent: selected
                            ? 'space-between'
                            : 'flex-start'
                          // alignItems: 'center'
                        }
                      ]}
                    >
                      <Text>{record ? record.label : ''}</Text>
                      {selected ? <Icon name={'done'} /> : null}
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => `index_${index}`}
          />
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              onPress={() => {
                onCancel();
                if (
                  multiselection &&
                  this.props.selection &&
                  !this.props.selection.length
                ) {
                  this.setState({ selection: [] });
                }
              }}
              appearance={'ghost'}
              textStyle={{ fontSize: 16 }}
              style={{ paddingBottom: 2 }}
            >
              Cancelar
            </Button>
            {multiselection ? (
              <Button
                onPress={() => {
                  onValueChange(this.state.selection);
                  this.setState({ selection: [] });
                }}
                appearance={'ghost'}
                textStyle={{ fontSize: 16 }}
                style={{ paddingBottom: 2 }}
              >
                Ok
              </Button>
            ) : null}
          </View>
        </View>
      </Overlay>
    );
  }
}

export default withStyles(FilterPicker, theme => ({
  overlay: {
    overlayColor: theme['background-basic-color-2']
  }
}));

const styles = {
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
};
