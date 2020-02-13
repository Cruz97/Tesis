import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {  WebView } from 'react-native-webview'

export class Forget2 extends Component {
    static navigationOptions = {
        title: 'Reestablecer contraseña',
        
    }

    render() {
        return (
            <View style={style.main}>
                <View style={style.header}>

                </View>
                <WebView style={style.webview} source={{ uri: 'https://www.pasaporteoroverde.com/web/reset_password' }} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    main:{
        flex:1,

    },
    header:{
        // position: 'absolute',
        // width: '100%',
        // height: '20%',
        // top: 0,
        // ///backgroundColor: 'rgba(255,255,255,0.8)',
        // backgroundColor: '#FFF',
        // zIndex:1000
    },
    webview:{
        flex: 1,
        marginTop: -100
    }
})

export default Forget2
