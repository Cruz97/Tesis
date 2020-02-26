import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,Image, TextInput, TouchableHighlight ,ActivityIndicator, Alert, ImageBackground } from 'react-native'
// import {TouchableOpacity} from 'react-native-gesture-handler'
import { Avatar, Icon, Input, Button } from 'react-native-elements';
import Database from '../database'
import {WebView} from 'react-native-webview'
import * as validUrl from 'valid-url';
import Odoo from 'react-native-odoo-promise-based'
import {Dialog} from 'react-native-simple-dialogs'
import moment from 'moment';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import {ButtonCustom} from '../components/index'
import {myTheme} from '../src/assets/styles/Theme'




export class LoginFundacion extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props);
    const {navigation} = props;
    
    this.state = {
        // correo: 'gpaclaudiapoppe@gmail.com',
        // contrasena: 'gpaclaudiapoppe',
        // correo: '',
        // contrasena: '',
        correo: 'amigosconcola@gmail.com',
        contrasena: 'amigosconcola',
        // correo: 'refugiopana@gmail.com',
        // contrasena: 'refugiopana',
        showPassword: false,
        loading: true,
        show: false,
        
    }

}

createFoundation = (email,password,name,zone,phone,manager,photo) => {
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(userCredentials => {
        //Si es un nuevo usuario
        if(userCredentials.additionalUserInfo.isNewUser){
            //Se guarda en la DB Real Time
            let uid = userCredentials.user.uid;
            let refUser = firebase.database().ref('usuarios/'+uid)

            //Crea un objeto usuario sino existe, y si existe modifica sus campos
            refUser.set({
                // username: 'Josecruz',
                name,
                email: userCredentials.user.email,
                photo,
                zone,
                phone,
                manager,
                typeUser: 'foundation',
                
                
                
              }).then(()=>{
                alert('se creo una fundacion')

                 // alert('Usuario creado en la BD Real Time')
              }).catch(error =>{
                  alert('Ocurrio algo '+JSON.stringify(error,null,4))
              });

        }

        // let uid = userCredentials.user.uid
        // alert(JSON.stringify(userCredentials.additionalUserInfo,null,4))
    }).catch(error => {
        alert(JSON.stringify(error.code,null,4))
    })

}

createDataDoundation = () =>{
    this.createFoundation(
        'amigosconcola@gmail.com',
        'amigosconcola',
        'Amigos con Cola',
        'Centro',
        '0995684828',
        'Javier Cevallos',
        'https://josecruzal.000webhostapp.com/fundaciones/amigosconcola.jpg'
        )
        this.createFoundation(
            'gpa.claudiapoppe@gmail.com',
            'gpaclaudiapoppe',
            'GPA Claudia Poppe',
            'Norte',
            '0967416653',
            'Lcda. Monica Santos',
            'https://josecruzal.000webhostapp.com/fundaciones/gpaclaudiapoppe.jpg'
            )
            this.createFoundation(
                'refugiopana@gmail.com',
                'refugiopana',
                'Proteccion y Ayuda a Nuestros Animales',
                'Sur',
                '0991882949',
                'Psi. katiuska Delgado',
                'https://josecruzal.000webhostapp.com/fundaciones/pana.jpg'
                )

}


componentDidMount(){
    //this.createDataDoundation()
    
}

Login = () => {
    let email = this.state.correo;
    let password = this.state.contrasena;

    if(email == '' || password == ''){
        Alert.alert('Información requerida','Pro favor ingrese un correo y una contraseña')
        return
    }

    this.props.navigation.navigate('Loading',{
       email: email, password: password, typelogin: 'foundation'
    })
}




     handleEmail = (text) => this.setState({correo: text})

     handlePassword = (text) => this.setState({contrasena: text})

    handleCode = (text) => this.setState({inputcode: text})

    render() {
        return (
            <View style={style.main}>
             
             <ImageBackground
               //source={require('../assets/img/gradient4.jpg')}
              style={{width: '100%', height: '100%', flex: 1, backgroundColor: '#fff', }}
            >
                <View style={style.boxheader}>

                    <View style={style.boxlogo}>
                        <Image source={require('../assets/img/dog-cat.jpg')} style={style.logo}/>
                    </View>
                

                    {/* <Image 
                    source={require('../assets/img/Mascotas-Felices-1.jpg')} 
                    style={style.picture}
                    resizeMode='cover'   
                    resizeMethod='auto'
                    /> */}
                     {/* <View style={style.box}>
                    

                    </View> */}

                    <View style={style.form}>
                    <Input
                        placeholder=' Correo electrónico'
                        ref='usuarioInput'
                        keyboardType='ascii-capable'
                        value={this.state.correo}
                        //maxLength={13}
                        placeholderTextColor='black'
                        onChangeText={this. handleEmail}
                        inputStyle={
                            {
                            color: 'black',
                            fontSize: 17
                            }
                        }
                        leftIcon={
                            <Icon
                            name='account-circle'
                            type='material'
                            size={20}
                            color='black'
                            />
                        }
                        
                        
                        />
 <View style={{flexDirection: 'row', marginRight: '15%', alignItems: 'center'}}>
                      
                        <Input
                        placeholder=' Contraseña'
                        secureTextEntry={!this.state.showPassword}
                        value={this.state.contrasena}
                        onChangeText={this. handlePassword}
                        placeholderTextColor='black'
                        inputStyle={
                            {
                            color: 'black',
                            fontSize: 17
                            }
                        }
                        leftIcon={
                            <Icon
                            name='vpn-key'
                            type='material'
                            size={20}
                            color='black'
                            />
                        }
                        />
                         <TouchableOpacity 
                        style={{}} 
                        onPress={()=>{this.setState({showPassword: !this.state.showPassword})}} >
                            <Icon 
                                name='remove-red-eye'
                                size={30}
                                color={this.state.showPassword ? myTheme['color-material-primary-700'] : myTheme['color-material-primary-200']}
                            />

                    </TouchableOpacity  >
                    </View>
                        
                        <ButtonCustom  
                            title="Ingresar"
                            colorcustom={'#780C88'}
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 25,
                                    height: 50
                                
                                }

                            } 
                            onPress={()=>
                                this.Login()
                            }
                            
                           />
                    </View>

                </View>

                </ImageBackground>
 
            </View>
        )
    }
}


const style = StyleSheet.create({
    main:{
        flex:1,
    },
    boxheader:{
        flex:2,
        //width: '50%',
        //backgroundColor: 'skyblue',
        //borderBottomStartRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#A88C3D',
        //borderWidth: 4
        //height: 200
    },

    boxinfo:{
        flex: 6,
        borderTopColor: '#A88C3D',
        borderTopWidth: 4,
        //backgroundColor: 'red',
        zIndex: -1
    },
    picture:{
        width: '100%',
        height: '100%'
        //flex:1,
        //width: undefined, height: undefined
        
    },
    boxlogo1:{
        
        position:'absolute',
        top: 30, 
        left: 10,
        zIndex: 1001, 

    },
    boxlogo2:{
        
        position:'absolute',
        top: 10, 
        right: 30,
        zIndex: 1001, 

    },
    boxlogo:{
        marginTop: 10
       // position:'absolute',
        //top: 110, 
        
        //right: 30,
        //zIndex: 1001, 

    },
    box:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(0,31,77,0.78)',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    logo:{
        resizeMode: 'stretch',
        height: 220,
        width: 300,
        //backgroundColor: 'white',
        //marginTop:20,
        //marginLeft: 25
        
      },
    logopasaport:{
        resizeMode: 'stretch',
        height: 60,
        width: 100,
        marginTop:20,
        //marginLeft: 25
        
      },
      logohotel:{
        resizeMode: 'stretch',
        width: 60,
        height: 55,
        marginTop: 20,
        //marginRight: 35
        
      },
      form:{
        // position: 'absolute',
        width: '70%',
        height: '30%',
        marginTop: 0,
        //top: 150,
        ///backgroundColor: 'rgba(255,255,255,0.8)',
        //backgroundColor: 'rgba(0,31,77,0.9)',
        borderRadius: 5
      },
      forgettext:{
          color: 'white',
          fontSize: 12,
          textAlign: 'center'
      },
      boxforget:{
          marginTop: 20
      },
      security:{
        width: 60,
        height: 60,
        //marginTop: 20
        
      },
      txtsec:{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
      },
      txtcontrasena:{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        // fontWeight: 'bold'
      },
      txtwar:{
        fontSize: 12,
        marginTop: 5
      }
      
    
})

export default LoginFundacion
