import React, { Component } from 'react'
import { Text, 
    View, 
    StyleSheet, 
    Image, TextInput, TouchableHighlight ,ActivityIndicator, Alert,ImageBackground,TouchableOpacity } from 'react-native'
// import {TouchableOpacity} from 'react-native-gesture-handler'
import { Avatar, Icon, Input, Button } from 'react-native-elements';
import Database from '../database'
import {WebView} from 'react-native-webview'
import * as validUrl from 'valid-url';
import Odoo from 'react-native-odoo-promise-based'
import {Dialog} from 'react-native-simple-dialogs'
import moment from 'moment';
import {ButtonCustom} from '../components/index'
// import auth from '@react-native-firebase/auth';

//import * as firebase from 'firebase';
// import firebase from 'react-native-firebase';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import {myTheme} from '../src/assets/styles/Theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'






export class LoginAdoptante extends Component {
  static navigationOptions = {
    header: null
  }
  componentDidMount(){
    
  }

  constructor(props){
    super(props);
    const {navigation} = props;
    
    this.unsubscriber = null;
    
    
    this.state = {
        usuario: 'jose.cruzal@outlook.com',
        contrasena: 'Barce@97',
        // usuario: '',
        // contrasena: '',
        // usuario: 'josecruz@outlook.com',
        // contrasena: 'abc123',
        
        loading: true,
        show: false,
        user: null,
        showPassword: false,
        alertCorreo: false
        
        
    }



}

Login = () => {
    let email = this.state.usuario;
    let password = this.state.contrasena;

    if(email == '' || password == ''){
        Alert.alert('Información requerida','Pro favor ingrese un correo y una contraseña')
        return
    }

    this.props.navigation.navigate('Loading',{
       email: email, password: password
    })
}





     handleUser = (text) => this.setState({usuario: text})

     handlePassword = (text) => this.setState({contrasena: text})

    handleCode = (text) => this.setState({inputcode: text})

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      };

    render() {
        return (
            <View style={style.main}>
                 <KeyboardAwareScrollView>
              <View
              style={{width: '100%', height: '100%', flex: 1, backgroundColor: '#fff', }}
            >
                    
                <View style={style.boxcontainer}>
        

                    <View style={style.boxlogo}>
                        
                        <Image source={require('../assets/img/img_menu.jpeg')} style={style.logo}/>
                    </View>
            

                    <View style={style.form}>
                    <Input
                        placeholder=' Correo electrónico'
                        ref='usuarioInput'
                        keyboardType='email-address'
                        value={this.state.usuario}
                        onBlur = {
                            ()=>
                           {
                            if(this.state.usuario.length > 0){
                              if (!this.validateEmail(this.state.usuario)) {
                                // not a valid email
                                this.setState({ alertCorreo: true})
                                //alert('El correo ingresado no es válido',)
                              }
                              else{
                                this.setState({alertCorreo: false})
                              }
                            }
                           }
                          }
                        // maxLength={13}
                        placeholderTextColor='#000'
                        onChangeText={this.handleUser}
                        inputStyle={
                            {
                            color: '#000',
                            fontSize: 18
                            }
                        }
                        leftIcon={
                            <Icon
                            name='account-circle'
                            type='material'
                            size={20}
                            color='#000'
                            />
                        }

                    
                        
                        
                        />
                        <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertCorreo ? 'flex' : 'none'}}>
                          Ingrese un correo electrónico válido
                        </Text>

                        <View style={{flexDirection: 'row', marginRight: '15%', alignItems: 'center'}}>
                        <Input
                        placeholder=' Contraseña'
                        secureTextEntry={!this.state.showPassword}
                        value={this.state.contrasena}
                        onChangeText={this.handlePassword}
                        placeholderTextColor='#000'
                        inputStyle={
                            {
                            color: '#000',
                            fontSize: 18,
                            
                            }
                        }
                        leftIcon={
                            <Icon
                            name='vpn-key'
                            type='material'
                            size={20}
                            color='#000'
                            />
                        }
                        />
                        <TouchableOpacity 
                        style={{}} 
                        onPress={()=>{this.setState({showPassword: !this.state.showPassword})}} >
                            <Icon 
                                name='remove-red-eye'
                                size={30}
                                color={myTheme['color-material-primary-500']}
                            />

                    </TouchableOpacity  >
                        </View>



                        <View style={{marginTop: '10%'}}>

                <TouchableOpacity onPress={()=>{
                 this.Login()
                }}>
                  {/*background-image: radial-gradient(circle, #c015da, #ad13c5, #9b10b0, #890e9c, #780c88);*/}
              <LinearGradient colors={['#c015da', '#ad13c5', '#9b10b0', '#890e9c', '#780c88']} style={style.linearGradient}>
                <Text style={style.buttonText}>
                  Ingresar
                </Text>
              </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{
                 this.props.navigation.navigate('NewAccount')
                }}>
                  {/*background-image: radial-gradient(circle, #42aee7, #3593c7, #2779a7, #186189, #08496b);*/}
              <LinearGradient colors={['#42aee7', '#3593c7', '#2779a7', '#186189', '#08496b']} style={style.linearGradient}>
                <Text style={style.buttonText}>
                  Registrarse
                </Text>
              </LinearGradient>
              </TouchableOpacity>


                    {/* <ButtonCustom  
                            title="Registrarse"
                            colorcustom='#fff'
                            titleStyle={{
                                fontSize: 18,
                                color: '#780C88'
                            }}
                            buttonStyle={
                                {
                                    marginTop:'3%',
                                    borderRadius: 20,
                                    borderColor: '#780C88',
                                    borderWidth: 1
                                
                                }

                            }
                            onPress={()=>{
                                this.props.navigation.navigate('NewAccount')
                            }}
                            
                           /> */}
                        </View>
                       
                    </View>

                    <View style={style.forgetpass}>
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.navigate('ForgetPass')
                            }}>
                            <Text style={style.forgettext}>
                                Olvidé mi contraseña
                            </Text>
                            </TouchableOpacity>
                        </View>
                    

                </View>
              
                
                
               
                </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}


const style = StyleSheet.create({
    main:{
        flex:1,
    },
    boxcontainer:{
        flex:1,
        marginTop: '25%',
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
        marginTop: 20
       // position:'absolute',
        //top: 110, 
        
        //right: 30,
        //zIndex: 1001, 

    },
    box:{
        //position: 'absolute',
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(0,31,77,0.78)',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    logo:{
        resizeMode: 'stretch',
        height: 150,
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
        flex:1,
        marginTop: '10%',
        width: '75%',
        //height: '100%',
        //marginTop: 0,
        //top: 150,
        ///backgroundColor: 'rgba(255,255,255,0.8)',
        //backgroundColor: 'rgba(0,31,77,0.9)',
        borderRadius: 5
      },
      forgettext:{
          color: '#000',
          fontSize: 17,
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
      },
      forgetpass:{
          marginTop: '15%'
        //   position: 'absolute',
        //   bottom: 0
      },
      linearGradient: {
        //flex: 1,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 5,
        borderRadius: 25
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
      
    
})

export default LoginAdoptante
