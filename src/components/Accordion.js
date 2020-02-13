import React from 'react';
import { Icon, List, TouchableRipple } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-ui-kitten';

export default class Accordion extends List.Accordion {
  state = {
    expanded: this.props.expanded || false,
  };

  _handlePress = () => {
    this.props.onPress && this.props.onPress();

    if (this.props.expanded === undefined) {
      this.setState(state => ({
        expanded: !state.expanded
      }));
    }
  };

  render() {
    const {
      left,
      title,
      description,
      children,
      theme,
      titleStyle,
      descriptionStyle,
      style,
      onPress
    } = this.props;
    const titleColor = theme.colors.text;
    const descriptionColor = theme.colors.text;

    const expanded =
      this.props.expanded !== undefined
        ? this.props.expanded
        : this.state.expanded;
    return (
      <View style={{ flex: 1 }}>
        <TouchableRipple
          style={[styles.container, style]}
          onPress={onPress ? onPress : this._handlePress}
          accessibilityTraits="button"
          accessibilityComponentType="button"
          accessibilityRole="button"
        >
          <View style={styles.row} pointerEvents="none">
            {left
              ? left({
                  color: expanded ? theme.colors.primary : descriptionColor
                })
              : null}
            <View style={[styles.item, styles.content]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.title,
                  {
                    color: expanded ? theme.colors.primary : titleColor
                  },
                  titleStyle
                ]}
              >
                {title}
              </Text>
              {description && (
                <Text
                  numberOfLines={2}
                  style={[
                    styles.description,
                    {
                      color: descriptionColor
                    },
                    descriptionStyle
                  ]}
                >
                  {description}
                </Text>
              )}
            </View>
            <View style={[styles.item, description && styles.multiline]}>
              {this.props.showExpander ? (
                <Icon
                  source={
                    expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                  }
                  color={titleColor}
                  size={24}
                />
              ) : (
                undefined
              )}
            </View>
          </View>
        </TouchableRipple>
        {expanded
          ? React.Children.map(children, child => {
              if (
                left &&
                React.isValidElement(child) &&
                !child.props.left &&
                !child.props.right
              ) {
                return React.cloneElement(child, {
                  style: [styles.child, child.props.style]
                });
              }

              return child;
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  multiline: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 16
  },
  description: {
    fontSize: 14
  },
  item: {
    margin: 8
  },
  child: {
    paddingLeft: 64
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  }
});
