import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {Button, Text, withStyles} from 'react-native-ui-kitten';
import { LabelInput, Load } from '../components';
import { authenticate } from '../utils';
import * as validUrl from 'valid-url';
import { hexToRGBA } from '../utils/Colors';

class LoginAccess extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    user: 'jose.cruz@5bits.com',
    password: '5bits1234',
    protocol: 'https://',
    url: 'pasaporteoroverde.com',
    loading: false
  };

  onLoginPress(e) {
    // e.preventDefault();
    this.setState({ loading: true });
    this.validateFields(
      this.state.user,
      this.state.password,
      this.state.protocol,
      this.state.url
    );
  }

  render() {
    const { themedStyle } = this.props;
    return (null);
  }

  validateFields(
    user,
    password,
    protocol,
    url,
    db = 'v13_' + url.replace(/\./g, '_')
  ) {
    if (password === '' || user === '' || url === '') {
      alert('Por favor ingrese los datos faltantes');
    } else if (!validUrl.isUri(`${protocol}${url}`)) {
      alert('Por favor ingrese una URL valida');
    } else {
      const host = `${protocol}${url}`;
      authenticate(user, password, host, db)
        .then(() => {
          this.props.navigation.navigate('App');
        })
        .catch(message => {
          this.setState({ loading: false });
          alert(message);
        });
    }
  }
}

export default withStyles(LoginAccess, theme => ({
  colors: {
    backgroundColor: theme['background-basic-color-2'],
    primary: theme['color-primary-500']
  }
}));
