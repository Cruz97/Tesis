import React, { Component } from 'react';
import { Button, withStyles } from 'react-native-ui-kitten';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

class KanbanList extends Component {
  constructor(props) {
    super(props);
  }

  onChangeValue(value, field, index) {
    let items = this.props.items;
    let item = { ...items[index] };
    item[field] = value;
    items[index] = item;
    this.props.onChange(items, field, index);
  }

  renderItems({ item, index: _index }, rowMap) {
    const onChange = (value, field, index = _index) =>
      this.onChangeValue(value, field, index);
    return this.props.renderItem({ ...item, _index, onChange });
  }

  render() {
    const theme = this.props.themedStyle;
    const { limit = 25, items = [], renderButton } = this.props;
    return (
      <View style={[{ backgroundColor: 'transparent' }, this.props.style]}>
        <SwipeListView
          data={items}
          renderItem={this.renderItems.bind(this)}
          disableHiddenLayoutCalculation={true}
          recalculateHiddenLayout={true}
          renderHiddenItem={(data, rowMap) => (
            <Icon
              key={data.index}
              reverse
              name={'clear'}
              color={theme.table.primary}
              size={10}
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                flex: 1,
                paddingRight: '5%'
              }}
              onPress={() => {
                const newItems = [...this.props.items];
                newItems.pop(data.index);
                this.props.onChange(newItems);
              }}
            />
          )}
          disableRightSwipe
          disableLeftSwipe={this.props.disabled}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
        {!this.props.disabled && limit !== items.length && items.length > 0 ? (
          renderButton ? (
            renderButton()
          ) : (
            <Icon
              reverse
              name={'add'}
              color={this.props.themedStyle.table.primary}
              size={15}
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => this.props.onChange([...this.props.items, {}])}
            />
          )
        ) : (
          undefined
        )}
        {items.length === 0 ? (
          renderButton ? (
            renderButton()
          ) : (
            <Card style={{ margin: 1 }}>
              <Card.Content>
                <Button
                  onPress={() => this.props.onChange([...this.props.items, {}])}
                  appearance={'ghost'}
                  disabled={this.props.disabled}
                  size={'giant'}
                >
                  Añadir item
                </Button>
              </Card.Content>
            </Card>
          )
        ) : (
          undefined
        )}
      </View>
    );
  }
}

export default withStyles(KanbanList, theme => ({
  table: {
    cellTextColor: theme['background-basic-color-2'],
    headerTextColor: theme['text-alternate-color'],
    headerBackground: theme['background-alternative-color-3'],
    primary: theme['color-primary-500']
  }
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '2%'
  },

  right: {
    justifyContent: 'flex-end'
  }
});
