import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { Interaction, styled } from 'react-native-ui-kitten';

type Props = {};

class LabelInput extends Component<Props> {
  static styledComponentName = 'Input';
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };

    this.onFocus = event => {
      this.props.dispatch([Interaction.FOCUSED]);
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    };

    this.onEndEditing = event => {
      this.props.dispatch([]);
      this.setState({ showPassword: false });
      if (this.props.onEndEditing) {
        this.props.onEndEditing(event);
      }
    };
  }

  componentDidMount() {
    if (this.props.focus) {
      this.text.focus();
    }
  }

  render() {
    const theme = this.props.themedStyle;
    theme.textColor = this.props.fontColor || theme.textColor;

    return (
      <Input
        {...this.props}
        ref={text => {
          this.text = text;
          if (this.props.ref) {
            this.props.ref(text);
          }
        }}
        editable={!this.props.disabled}
        onChangeText={text => {
          this.props.onChangeText(text);
        }}
        underlineColorAndroid={
          this.props.hideLine ? 'transparent' : theme.borderColor
        }
        labelStyle={{
          color:
            this.props.labelColor ||
            this.props.theme[
              this.props.theme['text-basic-color'].replace('$', '')
            ],
          marginLeft: 4
        }}
        inputContainerStyle={[
          { borderWidth: 0, borderColor: 'transparent' },
          this.props.style
        ]}
        containerStyle={{ paddingHorizontal: 0 }}
        label={this.props.label}
        placeholder={this.props.placeholder || this.props.name || ''}
        placeholderTextColor={theme.placeholderColor}
        keyboardType={this.props.keyboardType || 'default'}
        autoCapitalize={
          this.props.secure ? 'none' : this.props.autoCapitalize || 'sentences'
        }
        secureTextEntry={!!this.props.secure && !this.state.showPassword}
        inputStyle={[{ color: theme.textColor }, this.props.inputStyle]}
        size={'small'}
        style={[this.props.style]}
        onFocus={this.onFocus}
        onEndEditing={this.onEndEditing}
        rightIconContainerStyle={{ position: 'absolute', right: '3%' }}
        rightIcon={
          this.props.secure ? (
            <Icon
              name={this.state.showPassword ? 'visibility' : 'visibility-off'}
              size={25}
              color={theme.labelColor}
              Component={TouchableOpacity}
              onPress={() =>
                this.setState({ showPassword: !this.state.showPassword })
              }
            />
          ) : null
        }
      />
    );
  }
}

export default styled(LabelInput);
