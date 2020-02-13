import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, withStyles } from 'react-native-ui-kitten';
import { Card } from 'react-native-paper';
import { hexToRGBA } from '../utils/Colors';
import FilterPicker from './FilterPicker';
import { Icon, Overlay } from 'react-native-elements';
import Divider from './Divider';

class ActivitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !props.selectedActivity,
      visibleActivityType: !props.selectedActivityType,
      visibleActivity: false,
      visible: false
    };
  }

  render() {
    const {
      style,
      children,
      onActivityTypeChange,
      onActivityChange,
      activityTypes = {},
      activities = {},
      selectedActivityType,
      selectedActivity,
      themedStyle,
      onCancel,
      disabled
    } = this.props;
    return (
      <Card
        style={[{ margin: 1, overflow: 'hidden', borderRadius: 7 }, style]}
        onLongPress={
          selectedActivityType
            ? () => this.setState({ visible: true })
            : () => this.setState({ visibleActivityType: true })
        }
      >
        <Card.Content>
          <View
            style={{
              flex: 2,
              justifyContent: 'space-around',
              alignItems: 'flex-start'
            }}
          >
            {!!activityTypes[selectedActivityType] &&
            !!activities[selectedActivity] ? (
              <View style={{ flex: 1 }}>
                <Text
                  category={'h6'}
                  style={{ color: themedStyle.colors.active }}
                >
                  {activityTypes[selectedActivityType].label}
                </Text>
                <Text
                  category={'h6'}
                  style={{ color: themedStyle.colors.disabled }}
                >
                  {activities[selectedActivity].label}
                </Text>
              </View>
            ) : (
              undefined
            )}
          </View>
          <FilterPicker
            visible={this.state.visibleActivityType}
            onValueChange={value => {
              onActivityTypeChange(value);
              this.setState({
                visibleActivity: true,
                visibleActivityType: false
              });
            }}
            onCancel={() => {
              if (this.state.isNew) {
                onCancel();
              }
              this.setState({ visibleActivityType: false });
            }}
            items={Object.values(activityTypes)}
          />
          <FilterPicker
            visible={this.state.visibleActivity}
            onValueChange={value => {
              onActivityChange(value);
              this.setState({ visibleActivity: false, isNew: false });
            }}
            onCancel={() => {
              if (this.state.isNew) {
                onCancel();
              }
              this.setState({ visibleActivity: false });
            }}
            items={Object.values(activities)}
          />
          <Overlay
            isVisible={this.state.visible}
            onBackdropPress={() => this.setState({ visible: false })}
            overlayBackgroundColor={'#FFF'}
            windowBackgroundColor={hexToRGBA('#000000', 0.6)}
            width="90%"
            height="34%"
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: '3%'
                }}
                onPress={() =>
                  this.setState({ visible: false, visibleActivityType: true })
                }
              >
                <Text category={'h6'}>Cambiar gestión</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: '3%'
                }}
                onPress={() =>
                  this.setState({ visible: false, visibleActivity: true })
                }
              >
                <Text category={'h6'}>Cambiar tipo de gestión</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingHorizontal: '3%'
                }}
                onPress={() => {
                  onCancel();
                  this.setState({ visible: false });
                }}
              >
                <Text category={'h6'}>Eliminar</Text>
              </TouchableOpacity>
              <Divider />
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                <Button
                  onPress={() => this.setState({ visible: false })}
                  appearance={'ghost'}
                  textStyle={{ fontSize: 16 }}
                  style={{ paddingBottom: 2 }}
                >
                  Cancelar
                </Button>
              </View>
            </View>
          </Overlay>
          <Icon
            name={'more-vert'}
            color={hexToRGBA(
              disabled
                ? themedStyle.colors.disabled
                : themedStyle.colors.active,
              0.75
            )}
            size={20}
            containerStyle={{
              position: 'absolute',
              margin: 16,
              right: 0,
              top: 0
            }}
            onPress={
              selectedActivityType
                ? () => this.setState({ visible: true })
                : () => this.setState({ visibleActivityType: true })
            }
          />
          {children}
        </Card.Content>
      </Card>
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

export default withStyles(ActivitySelector, theme => ({
  colors: {
    active: theme['color-primary-500'],
    disabled: theme['color-basic-700']
  }
}));
