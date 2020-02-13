import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DarkCard from './DarkCard';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native-ui-kitten';
import AwesomeIcon from './AwesomeIcon';

const ButtonGrid = ({ buttons, style }) => {
  let row = 0;
  let rowFlex = 0;
  let rows = {};
  buttons.forEach(button => {
    if (rowFlex + button.flex <= 3) {
      if (rows[row]) {
        rows[row].push(button);
      } else {
        rows[row] = [button];
      }
      rowFlex += button.flex;
      if (rowFlex === 3) {
        rowFlex = 0;
        row += 1;
      }
    }
  });

  return (
    <View style={[{ flex: 1 }, style]}>
      {Object.values(rows).map((row, j) => (
        <View style={{ flex: 1, flexDirection: 'row' }} key={j}>
          {row.map((col, i) => (
            <DarkCard
              style={{ margin: '0.5%', flex: col.flex }}
              onPress={col.onPress}
              background={col.background}
              key={i}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {col.type === 'faw' ? (
                  <AwesomeIcon name={col.icon} color={'#FFF'} size={30} />
                ) : (
                  <Icon name={col.icon} color={'#FFF'} size={30} />
                )}
                <Text
                  category={'s1'}
                  style={{ color: '#FFF', textAlign: 'center' }}
                >
                  {col.name}
                </Text>
              </View>
            </DarkCard>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ButtonGrid;
