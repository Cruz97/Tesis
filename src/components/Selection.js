import React, { Component } from 'react';
import { Picker, View } from 'react-native';
import Label from './Label';
import { withStyles } from 'react-native-ui-kitten';

class Selection extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selected:''
    // };
  }

  render() {
    const {
      style,
      title,
      selectedValue,
      items,
      onValueChange,
      disabled
    } = this.props;
    return (
      <View style={[{ flex: 0 }, 
      style]}>
        <Label>{title}</Label>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          {
            Array.from(items).map((item)=>{
              return(
                <Picker.Item
              label={item.value}
              value={item.value}
              key={item.key}
              >

              </Picker.Item>
              )
            })
          }
        </Picker>
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

export default withStyles(Selection, theme => ({
  label: {
    active: theme['color-primary-500'],
    disabled: theme['color-basic-700']
  }
}));
