import React, { Component } from 'react';
import { View } from 'react-native';
//import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { styled, Button } from 'react-native-ui-kitten';
import Label from './Label';
import { Icon } from 'react-native-elements';

class DatePicker extends Component {
  static styledComponentName = 'Input';
  state = {
    visible: false
  };

  showDatePicker() {
    this.setState({ visible: true });
  }

  hideDatePicker() {
    this.setState({ visible: false });
  }

  onChangeDate(date) {
    const currentDate = date.toString();
    this.props.onSelectDate(currentDate);
    this.hideDatePicker();
  }

  renderDate(date) {
    let newDate = date;
    if (newDate) {
      let format = '';
      if (this.props.mode === 'time') {
        format = 'HH:mm';
      } else {
        format = this.props.mode === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm';
      }
      newDate = moment(newDate).format(format);
    }
    return newDate;
  }

  render() {
    const { visible } = this.state;
    const { button, mode = 'datetime' } = this.props;
    const date = this.renderDate(this.props.currentDate);
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.title ? <Label>{this.props.title}</Label> : undefined}
        <Button
          onPress={() => this.showDatePicker()}
          appearance={button ? 'filled' : 'ghost'}
          disabled={this.props.disabled}
          textStyle={[{ fontSize: 16, ...(button && { color: '#FFF' }) }, this.props.textStyle]}
          style={[{ flex: 2, paddingBottom: 10, ...(button && { backgroundColor: this.props.theme['color-primary-500'] }) }, this.props.buttonStyle]}
          icon={
            button
              ? () => (
                  <Icon
                    name={
                      mode === 'datetime' || mode === 'date'
                        ? 'today'
                        : 'access-time'
                    }
                    color={'#FFF'}
                    size={20}
                    containerStyle={{
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  />
                )
              : undefined
          }
        >
          {date || 'Asignar fecha'}
        </Button>
        {/* <DateTimePicker
          date={new Date(this.props.currentDate)}
          mode={this.props.mode}
          isVisible={visible}
          onConfirm={value => this.onChangeDate(value)}
          onCancel={() => this.hideDatePicker()}
        /> */}
      </View>
    );
  }
}

export default styled(DatePicker);

const styles = {
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  }
};
