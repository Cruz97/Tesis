import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Avatar, Icon, Input, Button } from 'react-native-elements';
import {ButtonCustom} from '../components/index'
import {myTheme} from '../src/assets/styles/Theme'
import {Dialog} from 'react-native-simple-dialogs'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'


const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: 'https://www.example.com/checkout?cartId=1234',
    // This must be true for email link sign-in.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.adopcion.pets',
      installApp: true,
      minimumVersion: '12'
    },
    // FDL custom domain.
    dynamicLinkDomain: 'adopcionpets.page.link'
  };

  const userEmail = 'jose.cruzal@outlook.com';

export class ForgetPass extends Component {

    static navigationOptions = {
        title: 'Recuperar contraseña'
    }

    constructor(props){
        super(props);
        this.state = {
            email: '',
            loading: false
        }

    }
    handleEmail= (text) => this.setState({email: text})

    openModalLoading = (show) => {
        this.setState({loading: show})
    }


    ResetPassword = () => {
        this.openModalLoading(true);
        setTimeout(()=>{
            firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(()=>{
                this.openModalLoading(false);
                this.props.navigation.navigate('ResetSuccessfull')
            }).
            
            catch((error)=>{
                this.openModalLoading(false);
                Alert.alert('Error de reestablecimiento', 'No se ha podido validar el correo electrónico. No hay un usuario que corresponda al correo proporcionado/ El usuario pudo haber sido eliminado')
            })
        },2500)
        //this.openModalLoading(false);
       
    }

    render() {
        return (
            <View style={style.main}>
                <View style={style.boxtext}>
                    <Text style={style.txt}>
                        Por favor ingrese el correo electrónico de su cuenta, para poder reestablecer su contraseña
                    </Text>
                </View>

                <View style={style.input}>
                <Input
                        placeholder=' Email'
                        //secureTextEntry={true}
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                        placeholderTextColor='black'
                        inputStyle={
                            {
                            color: 'black',
                            fontSize: 17
                            }
                        }
                        leftIcon={
                            <Icon
                            name='email'
                            type='material'
                            size={20}
                            color='black'
                            />
                        }
                        />
                </View>

                <View style={style.btn}>
                <ButtonCustom  
                            title="Reestablecer"
                            colorcustom={myTheme['color-success-600']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 20
                                
                                }

                            }
                            onPress={()=>{
                                this.ResetPassword()
                                //this.props.navigation.navigate('ResetSuccessfull')
                                
                            }}
                            
                           />

                </View>
                <Dialog title={"Validando correo electrónico"}
                    animationType="fade"
                    onTouchOutside={ () => this.openModalLoading(false) }
                    
                    visible={ this.state.loading } 
                    titleStyle={
                        {
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            
                            
                        }
                    }
                    dialogStyle={
                        {
                            borderRadius: 10,
                            backgroundColor: 'white',
                            
                        }
                    }>
                       <ActivityIndicator size="large" color={myTheme['color-primary-700']} />
                    </Dialog>
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1
    },
    boxtext:{
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        
    },
    txt:{
        fontSize: 16
    },
    input:{
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    btn:{
        marginTop: '15%',
        marginLeft: '20%',
        marginRight: '20%',
    }
})


export default ForgetPass
