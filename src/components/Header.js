import React, { Component } from 'react';
import {
  styled,
  TopNavigation,
  TopNavigationAction,
  withStyles
} from 'react-native-ui-kitten';
import { Icon } from 'react-native-elements';
import { Image, View, Animated } from 'react-native';
import { animate } from '../utils';
import AwesomeIcon from './AwesomeIcon';


class NavAction extends Component {
  render() {
    const { icon, onPress, themedStyle } = this.props;
    return (
      <TopNavigationAction
        icon={() => (
          <Icon name={icon} color={themedStyle.nav.color} size={28} />
        )}
        onPress={onPress}
      />
    );
  }
}

export const NavigationAction = withStyles(NavAction, theme => ({
  nav: { color: theme['color-basic-100'] 
}
}));

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.popOver = {};
    //alert(JSON.stringify(props.navigation,null,2))
  }

  showMenu() {
    const openActions = this.props.navigation.getParam('openActions', () =>
      //null
      alert('')
    );
    openActions(this.popOver);
  }

  renderRightControl() {
    return (
      <NavigationAction
        ref={ref => (this.popOver = ref)}
        icon={'search'}
        onPress={() => this.showMenu()}
        
      />
    );
  }

  renderMenuAction() {
    const { navigation } = this.props;
    return (
      <NavigationAction icon={'menu'} onPress={() => navigation.openDrawer()} />
    );
  }

  renderBackAction() {
    const { navigation } = this.props;
    
    return (
      <NavigationAction
        icon={'arrow-back'}
        onPress={() => navigation.goBack()}
      />
    );
  }

  renderLeftControl() {
    //const { navigation } = this.props;
    const { navigation, themedStyle } = this.props;
    //const {route} = navigation.state;
    const { navStyle } = themedStyle;
    const { state, dispatch } = navigation;
    const navigationOptions = navigation
      .dangerouslyGetParent()
      .router.getScreenOptions({ state, dispatch }, {});
    //const back = navigation.getParam('back', false)
    const back = this.props.navigation.getParam(
      'back',navigationOptions.back)
    //alert(JSON.stringify(navigation.dangerouslyGetParent().state.routes,null,2))
    //const back = false;
    // const back = navigation.dangerouslyGetParent().state.index > 0;
    const menu = true;
    if (back) {
      return this.renderBackAction();
    } else if (menu) {
      return this.renderMenuAction();
    }

    return null;
  }

  render() {
    const { navigation, themedStyle } = this.props;
    //const {route} = navigation.state;
    const { navStyle } = themedStyle;
    const { state, dispatch } = navigation;
    const navigationOptions = navigation
      .dangerouslyGetParent()
      .router.getScreenOptions({ state, dispatch }, {});
    const back = navigation.dangerouslyGetParent().state.index > 0;
    const uuid = navigation.getParam('uuid','nada')
    //alert(uuid)
    //alert(JSON.stringify(navigation.dangerouslyGetParent().state))
    //alert(JSON.stringify(this.props.navigation.dangerouslyGetParent().state));
    //alert(JSON.stringify(navigationOptions.title));

    const marginLeft = back ? '8%' : '16%';

    // const backk = this.props.navigation.getParam(
    //   'back',navigationOptions.back)
    //   alert(backk)

    const title = this.props.navigation.getParam(
      'title',
      navigationOptions.title
    );

    let leftComponent;
    let hideLeftComponent = this.props.navigation.getParam(
      'hideLeftComponent',
      navigationOptions.hideLeftComponent || 'show'
    );
    hideLeftComponent = hideLeftComponent === 'hide';
    if (!hideLeftComponent) {
      const renderLeftComponent = this.props.navigation.getParam(
        'renderLeftComponent',
        this.renderLeftControl.bind(this)
      );
      leftComponent = renderLeftComponent();
      hideLeftComponent = !leftComponent;
    }

    let rightComponent;
    let hideRightComponent = this.props.navigation.getParam(
      'hideRightComponent',
      navigationOptions.hideRightComponent || 'show'
    );

    //if(navigation.ro)

    hideRightComponent = hideRightComponent === 'hide';
    if (!hideRightComponent) {
      const renderRightComponent =
        navigationOptions.renderRightComponent ||
        this.props.navigation.getParam(
          'renderRightComponent',
          this.renderRightControl.bind(this)
        );
      rightComponent = renderRightComponent();
    }

    return (
      <TopNavigation
        title={title}
        leftControl={leftComponent}
        //leftControlContainer={{ flex: 1 }}
        rightControls={rightComponent}
        alignment={'center'}
        titleStyle={{
          fontSize: 16,
          color: navStyle.text,        
        }}
        
      

        style={{backgroundColor: navStyle.backgroundColor}}

        
      />
    );
  }
}

export default withStyles(Header, theme => ({
  navStyle: {
    text: theme['color-basic-100'],
    backgroundColor: theme['color-info-800']
  }
}));
