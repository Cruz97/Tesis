import React, { Component } from 'react'
import { Text,ScrollView, View, StyleSheet, Image,ImageBackground, TouchableOpacity,TextInput, TouchableHighlight ,ActivityIndicator, Alert, Platform } from 'react-native'
// import {TouchableOpacity} from 'react-native-gesture-handler'
import { Avatar, Icon, Input, Button } from 'react-native-elements';
import Database from '../database'
import {WebView} from 'react-native-webview'
import * as validUrl from 'valid-url';
import Odoo from 'react-native-odoo-promise-based'
import {Dialog} from 'react-native-simple-dialogs'
import moment from 'moment';
import {ButtonCustom} from '../components/index'
import {myTheme} from '../src/assets/styles/Theme'
import firebase from '@react-native-firebase/app'
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging'
import auth from '@react-native-firebase/auth'






// class BackgroundImage extends Component {

//   render() {
//       return (
//           <Image source={require('../assets/img/DJI_0225.jpg')}
//                 style={style.backgroundImage}>

//                 {this.props.children}

//           </Image>
//       )
//   }
// }


export class Welcome extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props);
    const {navigation} = props;
    this.state = {

    } 

}

createFundaciones = () => {

let email = "amigosconcola@gmail.com";
let password = "amigosconcola"
let name = "Amigos con Cola"
let img =  'https://josecruzal.000webhostapp.com/fundaciones/amigosconcola.jpg'
let zone = "Centro"
let phone = '0995684828'
let manager = 'Javier Cevallos'

// let email = "refugiopana@gmail.com";
// let password = "refugiopana"
// let name = "Refugio PANA"
// let img = 'https://josecruzal.000webhostapp.com/fundaciones/pana.jpg'
// let zone = "Sur"
// let phone = '0991882949'
// let manager = 'Psi. katiuska Delgado'

// let email = "gpaclaudiapoppe@gmail.com";
// let password = "gpaclaudiapoppe"
// let name = "GPA Claudia Poppe"
// let img = 'https://josecruzal.000webhostapp.com/fundaciones/gpaclaudiapoppe.jpg'
// let zone = "Norte"
// let phone = '0967416653'
// let manager = 'Lcda. Monica Santos'

//CREAR USUARIO PARA FUNDACIONES
firebase.auth().createUserWithEmailAndPassword(
    email, password
).then(userCredentials => {
    //Si es un nuevo usuario
    if(userCredentials.additionalUserInfo.isNewUser){
        //Se guarda en la DB Real Time
        let uid = userCredentials.user.uid;
        let refFoundation = firebase.database().ref('fundaciones/'+uid)

        //Crea un objeto usuario sino existe, y si existe modifica sus campos
        refFoundation.set({
            name,
            img,
            zone,
            phone,
            manager,
            email: userCredentials.user.email,
            photo: userCredentials.user.photoURL,
            displayName: userCredentials.user.displayName,
            typeUser: 'foundation',
          }).then((value)=>{
              alert('success: '+JSON.stringify(value,null,4))

          }).catch(error =>{
              alert('Ocurrio algo '+JSON.stringify(error.message,null,4))
          });



          let refUser = firebase.database().ref('usuarios/'+uid)

        //Crea un objeto usuario sino existe, y si existe modifica sus campos
        refUser.set({
            name,
            img,
            zone,
            phone,
            manager,
            email: userCredentials.user.email,
            photo: userCredentials.user.photoURL,
            displayName: userCredentials.user.displayName,
            typeUser: 'foundation',
          }).then((value)=>{
              alert('success: '+JSON.stringify(value,null,4))

          }).catch(error =>{
              alert('Ocurrio algo '+JSON.stringify(error.message,null,4))
          });
    }

    // let uid = userCredentials.user.uid
    // alert(JSON.stringify(userCredentials.additionalUserInfo,null,4))
}).catch(error => {
    let errorCode = error.code;
    let errorMessage = error.message;
    let mensaje = ''
    switch(errorCode){
      case 'auth/email-already-in-use':
        mensaje = 'Ya existe una cuenta con ésta dirección de correo electrónico'
        break;
      case 'auth/invalid-email':
        mensaje = 'La dirección de correo electrónico no es válida.'
        break;
      case 'auth/operation-not-allowed':
        mensaje = 'La cuenta de correo electrónico / contraseña no están habilitadas';
        break;
      case 'auth/weak-password':
        mensaje = 'La contraseña no es lo suficientemente segura';
        break;
      default:
        mensaje = 'Ha ocurrido un error'
}
alert('Error al registrar : '+mensaje)
})
}

 

    render() {
        return (
          <ScrollView style={{flex:1}}>
          <ImageBackground
            //   source={require('../assets/img/Mascotas-Felices-1.jpg')}
              style={{width: '100%', height: '100%', flex: 1}}
            > 
            {/* <View style={style.box}>
            </View> */}

            <View style={style.boxlogo}>
                        <Image source={require('../assets/img/img_menu.jpeg')} style={style.logo}/>
                    </View>

           
                    
                    <View style={style.form} >
                        {/* <ButtonCustom  
                            title="Quiero Adoptar"
                            primary
                            buttonStyle={
                                {
                                    marginTop:30,
                                    
                                }

                            }
                            onPress={()=>{
                                this.props.navigation.navigate('LoginAdoptante')
                            }}
                            />

                        <ButtonCustom  
                            title="Soy Fundacion"
                            colorcustom={myTheme['color-primary-600']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                
                                }

                            }
                            onPress={()=>{
                                this.props.navigation.navigate('LoginFundacion')
                            }}
                            
                           /> */}

              <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('LoginAdoptante')
              }}>
              <LinearGradient colors={['#0673AC', '#0998CD', '#0DC3EF', '#0998CD', '#0673AC']} style={style.linearGradient}>
                <Text style={style.buttonText}>
                  Quiero Adoptar
                </Text>
              </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('LoginFundacion')
              }}>
              <LinearGradient colors={['#24254c', '#1c4068', '#075b7f', '#017691', '#28929d']} style={style.linearGradient}>
                <Text style={style.buttonText}>
                  Soy Fundación
                </Text>
              </LinearGradient>
              </TouchableOpacity>

            

                          {/* <ButtonCustom  
                            title="Crear Fundacion"
                            colorcustom={myTheme['color-primary-600']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                
                                }

                            }
                            onPress={()=>{
                                this.createFundaciones()
                            }}
                            
                           /> */}


  
                    </View>
  
            </ImageBackground>  
            </ScrollView>
           
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
        top: 10, 
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
      alignItems: 'center',
     

      ...Platform.select({
        ios:{
          marginTop: '40%',

        },
        android:{
          marginTop: '40%',
        }
      }),
        //marg
        //position:'absolute',
        // top: 110, 
        
        //right: 30,
        //zIndex: 1001, 

    },
    box:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        // backgroundColor: 'rgba(0,31,77,0.77)',
        //backgroundColor: 'rgba(255,255,255,0.9)',
    },
    logo:{
        resizeMode: 'stretch',
        height: 150,
        width: 300,
       // alignContent: 'center'
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
        //flex: 1,
        //alignItems: 'center',
        alignSelf: 'center',
        
        //justifyContent: 'center',
        //alignContent: 'center',
        //position: 'absolute',
        width: '70%',
        height: '30%',

        ...Platform.select({
          ios:{
            marginTop: 40,
          },
          android:{
            marginTop: 30,
          }
        }),
        //bottom: 150,
        // top: 280,
        //left: 10,
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
      txtemail:{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        // fontWeight: 'bold'
      },
      txtwar:{
        fontSize: 12,
        marginTop: 5
      },
      backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    linearGradient: {
      //flex: 1,
      marginTop: 20,
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

export default Welcome
