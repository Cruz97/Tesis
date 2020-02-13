import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';
import {
  LabelInput,
  DatePicker,
  Boolean,
  ManyToMany,
  ManyToOne,
  Selection,
  FAB
} from '../components';
import moment from 'moment';
import ImagePicker from '../components/ImagePicker';

class Components extends Component {
  static navigationOptions = {
    title: 'Componentes'
  };

  constructor(props) {
    super(props);
    this.state = {
      text: 'Bau',
      password: 'holaaaaaaaa',
      time: moment(),
      datetime: moment(),
      checked: false,
      items: {
        1: {
          key: 1,
          label: 'Bau 1'
        },
        2: {
          key: 2,
          label: 'Bau 2'
        }
      },
      item_id: null,
      selectedItem: null,
      item_ids: [],
      images: []
    };
  }

  render() {
    const styles = this.props.themedStyle;
    return (
      <View style={[styles.container]}>
        <ScrollView style={{ padding: '3%' }}>
          <LabelInput
            label={'Texto'}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />

          <LabelInput
            label={'Password'}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secure
          />

          <DatePicker
            title={'Hora:'}
            currentDate={this.state.time}
            onSelectDate={time => this.setState({ time })}
            mode={'time'}
          />

          <DatePicker
            title={'Fecha y hora:'}
            currentDate={this.state.datetime}
            onSelectDate={datetime => this.setState({ datetime })}
            mode={'datetime'}
          />

          <Boolean
            title={'Toogle'}
            checked={this.state.checked}
            onValueChange={checked => this.setState({ checked })}
          />

          <ManyToOne
            title={'Many to one:'}
            selectedValue={this.state.item_id}
            onValueChange={item_id => {
              this.setState({ item_id });
            }}
            items={this.state.items}
            row
          />

          <ManyToMany
            title={'Many to many'}
            selectedValues={this.state.item_ids}
            onValueChange={item_ids => this.setState({ item_ids })}
            items={this.state.items}
          />

          <Selection
            title={'Selección:'}
            selectedValue={this.state.selectedItem}
            onValueChange={selectedItem => this.setState({ selectedItem })}
            items={this.state.items}
            showValue={'label'}
            row
          />

          <ImagePicker
            title={'Fotos'}
            images={this.state.images}
            onChangeImages={images => this.setState({ images })}
          />
        </ScrollView>
        <FAB icon="add" onPress={() => this.props.navigation.push('Main')} />
      </View>
    );
  }
}

export default withStyles(Components, theme => ({
  container: {
    backgroundColor: theme['background-basic-color-2'],
    flex: 1
  }
}));
