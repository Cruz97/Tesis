import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Avatar, Icon, Input, Button } from 'react-native-elements';
import {ButtonCustom} from '../components/index'
import {myTheme} from '../src/assets/styles/Theme'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'




export class RegisterSuccessfull extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            email: ''
            
        }

    }

  

    render() {
        return (
            <View style={style.main}>
                <View style={style.boxtext}>
                    <Text style={style.txt}>
                        Enhorabuena!
                     </Text>
                </View>

                <View style={style.boximg}>
                <Image
                        source={require('../assets/img/success.png')}
                        style={{resizeMode: 'stretch',
                        height: 120,
                        width: 120,
                        marginTop: 10}
                    }
                    />
                </View>

                <View style={style.boxtextinfo}>
                    <Text style={style.txtinfo}>
                        Su cuenta ha sido creada con éxito.
                    </Text>
                    <Text style={style.txtinfo}>
                        Ya puede iniciar sesión!
                    </Text>
                </View>

                <View style={style.btn}>

                

                <ButtonCustom  
                            title="Iniciar Sesión"
                            colorcustom={myTheme['color-primary-700']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 20
                                
                                }

                            }
                            onPress={()=>{
                                //this.ResetPassword()
                                this.props.navigation.navigate('LoginAdoptante')
                            }}
                            
                           />

                </View>
              
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1
    },
    boxtext:{
        marginTop: '35%',
        marginLeft: '10%',
        marginRight: '10%',
        
    },
    txt:{
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    boximg:{
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        alignItems: 'center'
    },
    boxtextinfo:{
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        
    },
    txtinfo:{
        fontSize: 15,
        //fontWeight: 'bold',
        textAlign: 'center'
    },
    btn:{
        marginTop: '15%',
        marginLeft: '20%',
        marginRight: '20%',
    }
})


export default RegisterSuccessfull
