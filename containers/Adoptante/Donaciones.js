import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class Donaciones extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }

    static navigationOptions = {
        title: 'Donaciones',
        hideRightComponent: 'hide',
    }

    render() {
        return (
            <View>
                <Text> Donaciones </Text>
            </View>
        )
    }
}

export default Donaciones
