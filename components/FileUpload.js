import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from '@react-native-firebase/app'

export class FileUpload extends Component {

    constructor(props){
        super(props)
        this.state = {
            uploadValue: 0
        }
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default FileUpload
