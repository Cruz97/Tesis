import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {List, Switch} from 'react-native-paper'

export class ItemTools extends Component {

    state = {
        isSwitchOn: false,
      };

    _renderRigth = (props) => {
        const {content, type} = props;
        if(type === "text"){
            return(
                <View>
                    <Text>
                    {content}
                </Text>
                </View>
            )
        }   
        else{
            return(
                   {content}
            )
        }
    }

    render() {
        //const {} = List.Item;
        return (
                <List.Item
                    title={this.props.titulo}
                    right={
                        ()=> this._renderRigth(this.props)
                    }

                />
        )
    }
}

export default ItemTools
