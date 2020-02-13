import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

export class CardClub extends Component {
    static navigationOptions = {
        title: 'Tarjeta Club Oro Verde',
        hideRightComponent: 'hide',
    }
    render() {
        return (
            <View style={{flex:1, backgroundColor: '#f2f2f2'}}>
                <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <Image 
                style={{width: '100%', height: 250}}
                //resizeMode= 'contain'
                source={{uri: 'https://josecruzal.000webhostapp.com/Sources/en_construccion.jpg'}}>

                </Image>
                </View>
            </View>
        )
    }
}

export default CardClub
