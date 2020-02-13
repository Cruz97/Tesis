import React, { Component } from 'react';
import { Button, Text, withStyles } from 'react-native-ui-kitten';
import { View, ScrollView, StyleSheet } from 'react-native';
import { DataTable, TouchableRipple } from 'react-native-paper';
import LabelInput from '../components/LabelInput';
import { Boolean, ManyToOne } from './index';
import { Icon } from 'react-native-elements';
import DatePicker from './DatePicker';
import moment from 'moment';

export class Cell extends DataTable.Cell {
  render() {
    const { children, style, numeric, textStyle, textProps, ...rest } = this.props;

    return (
      <TouchableRipple
        {...rest}
        style={[styles.container, numeric && styles.right, style]}
      >
        {typeof children === 'string' ? (
          <Text numberOfLines={2} style={[{ fontSize: 18 }, textStyle]} {...textProps}>
            {children}
          </Text>
        ) : (
          children
        )}
      </TouchableRipple>
    );
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.fields = props.fields;
  }

  state = {
    amount: 0,
    width: 0,
    height: 0
  };

  renderHeader() {
    const theme = this.props.themedStyle;
    return this.fields.map(({ header, type, invisible }, index) =>
      !invisible ? (
        <Cell
          key={index}
          textStyle={{
            color: theme.table.headerTextColor,
            fontSize: 14,
            fontWeight: 'bold'
          }}
        >
          {header}
        </Cell>
      ) : undefined
    );
  }

  render() {
    const { width } = this.state;
    const fields = this.fields.filter(({ invisible }) => !invisible);
    const lenFields = fields.length || 1;
    const cellWidth =
      width * (lenFields < 3 ? 1 / lenFields : 0.3333) * lenFields;
    const theme = this.props.themedStyle;
    return (
      <View
        onLayout={event => {
          const { width, height } = event.nativeEvent.layout;
          this.setState({ width, height });
        }}
        style={[
          { backgroundColor: theme.table.backgroundColor },
          this.props.style
        ]}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DataTable
            style={{
              flex: 0,
              width: cellWidth,
              backgroundColor: theme.table.backgroundColor
            }}
          >
            <DataTable.Header
              style={{
                paddingHorizontal: 0,
                paddingLeft: 16,
                backgroundColor: theme.table.headerBackground
              }}
            >
              {this.renderHeader()}
            </DataTable.Header>
            <ScrollView>{this.renderRows()}</ScrollView>
          </DataTable>
        </ScrollView>
        {!this.props.disabled ? (
          <Button
            onPress={() => this.props.onChange([...this.props.items, {}])}
            appearance={'ghost'}
            disabled={this.props.disabled}
            textStyle={{ fontSize: 16 }}
          >
            Añadir linea
          </Button>
        ) : (
          undefined
        )}
      </View>
    );
  }

  renderRows() {
    const theme = this.props.themedStyle;
    return this.props.items.map((row, index) => (
      <DataTable.Row
        style={{ paddingHorizontal: 0, paddingLeft: 16, alignItems: 'center' }}
        key={index}
        onPress={
          this.props.onPressRow ? () => this.props.onPressRow(row) : undefined
        }
      >
        {this.renderColumns(row, index)}
        {!this.props.disabled ? (
          <Cell
            style={{
              position: 'absolute',
              height: '100%',
              justifyContent: 'flex-end',
              right: 3
            }}
          >
            <Icon
              reverse
              name={'close'}
              color={theme.table.primary}
              size={9}
              containerStyle={{}}
              onPress={() => {
                const items = this.props.items.filter((_, i) => i !== index);
                this.props.onChange(items);
              }}
            />
          </Cell>
        ) : (
          undefined
        )}
      </DataTable.Row>
    ));
  }

  renderColumns(row, indexRow) {
    return this.fields.map(
      (
        {
          name,
          type = 'string',
          header,
          readonly = false,
          required = false,
          defaultValue = '',
          invisible = false
        },
        indexColumn
      ) => {
        if (!invisible) {
          const onChange = value => this.onChangeValue(value, name, indexRow);
          let componentToRender =
            row[name] !== undefined ? row[name] : defaultValue;
          let Field = null;
          let props = { disabled: this.props.disabled || readonly };
          switch (type) {
            case 'string':
            case 'numeric':
            case 'monetary':
              componentToRender = componentToRender.toString();
              const showSymbol =
                type === 'monetary' &&
                !componentToRender.includes('$') &&
                componentToRender;
              if (!readonly) {
                Field = LabelInput;
                props.hideLine = true;
                props.style = { flex: 0 };
                if (type === 'numeric' || type === 'monetary') {
                  props.keyboardType = 'numeric';
                  props.value = (showSymbol ? '$ ' : '') + componentToRender;
                  props.onChangeText = (value = '0') => {
                    let valueNumber = parseFloat(value.replace('$ ', ''));
                    onChange(!isNaN(valueNumber) ? valueNumber : 0);
                  };
                } else {
                  props.value = componentToRender;
                  props.onChangeText = onChange;
                }
              } else {
                if (type === 'numeric' || type === 'monetary') {
                  componentToRender =
                    (showSymbol ? '$ ' : '') + componentToRender;
                }
              }
              break;
            case 'time':
            case 'date':
            case 'datetime':
              Field = DatePicker;
              props.currentDate = moment(componentToRender);
              props.onSelectDate = onChange;
              props.mode = type;
              props.textStyle = { marginHorizontal: 0 };
              props.buttonStyle = { paddingLeft: 0 };
              break;
            case 'boolean':
              Field = Boolean;
              props.notLabel = true;
              props.checked = componentToRender;
              props.onValueChange = onChange;
              break;
            case 'many2one':
              Field = ManyToOne;
              props.selectedValue = componentToRender;
              props.onValueChange = onChange;
              props.placeholder = header;
              props.textStyle = { marginHorizontal: 0 };
              props.buttonStyle = { paddingLeft: 0 };
              props.items = this.props.data[name] || {};
              break;
          }

          if (Field) {
            componentToRender = <Field {...props} />;
          }

          return (
            <Cell key={`${indexRow} - ${indexColumn}`}>
              {componentToRender}
            </Cell>
          );
        }
        return undefined;
      }
    );
  }

  onChangeValue(value, field, index) {
    let items = this.props.items;
    let item = { ...items[index] };
    item[field] = value;
    items[index] = item;
    this.props.onChange(items, field, index);
  }
}

export default withStyles(Table, theme => ({
  table: {
    backgroundColor: theme['background-basic-color-1'],
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
