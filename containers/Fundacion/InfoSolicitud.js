import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export class InfoSolicitud extends Component {
    render() {
        return (
            <View style={style.main}>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    main:{
        flex:1
    }
})

export default InfoSolicitud
