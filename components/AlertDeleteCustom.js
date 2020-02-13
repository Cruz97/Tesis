import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { ButtonGroup, Icon, Overlay} from 'react-native-elements'
import {myTheme} from '../src/assets/styles/Theme'

export class AlertDeleteCustom extends Component {
    render() {
        const {
            modalVisible,
            onBackdropPress,
            source,
            title,
            subtitle,
            textOK,
            textCancel,
            onPress,
            onPressOK,
            onPressCancel,
         } = this.props;
        return (
            <Overlay
            isVisible={modalVisible}
            windowBackgroundColor="rgba(0, 0, 0, .6)"
            overlayBackgroundColor="white"
            onBackdropPress={onBackdropPress}
            width={250}
            height="auto"
            overlayStyle={{paddingHorizontal:0, paddingVertical:0, borderRadius: 10}}
            >
             <View style={{paddingHorizontal: 30, paddingVertical: 15, alignItems: 'center'}}>
             <Image
                        source={source}
                        style={{resizeMode: 'stretch',
                        height: 150,
                        width: 180,
                        marginTop: 10}
                    }
                    />
                    <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{color: myTheme['color-material-primary-700'], fontWeight: 'bold', fontSize: 18}}>{title}</Text>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 5}}>
                <Text style={{color: myTheme['color-material-danger-500'], textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>{subtitle}</Text>
                    </View>

                   
                    
             </View>
             <View style={{flexDirection: 'row'}}>
             <TouchableOpacity style={{height: 50, width: '50%', justifyContent: 'center', borderBottomStartRadius: 10, borderBottomEndRadius: 0, backgroundColor: myTheme['color-material-danger-600']}}
             onPress={onPressCancel}
             >
                <View style={{alignItems: 'center',justifyContent:'center'}}>
            <Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>{textCancel}</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={{height: 50, width: '50%', justifyContent: 'center', borderBottomStartRadius: 0, borderBottomEndRadius: 10, backgroundColor: myTheme['color-material-info-600']}}
             onPress={onPressOK}
             >
                <View style={{alignItems: 'center',justifyContent:'center'}}>
            <Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>{textOK}</Text>
                        </View>

                    </TouchableOpacity>
                    </View>

           
                
            </Overlay>
        )
    }
}

export default AlertDeleteCustom
