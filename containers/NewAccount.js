import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import { Icon, Input} from 'react-native-elements';
import {ButtonCustom} from '../components/index'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import {myTheme} from '../src/assets/styles/Theme'
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: 'https://adopcionpets.page.link',
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

export class NewAccount extends Component {
    static navigationOptions = {
        // title: 'Registrarse',
        header: null
    }

    constructor(props){
        super(props);

        this.state={
            uid: '',
            cedula: '',
            nombres: '',
            apellidos: '',
            correo: '',
            contrasena: '',
            contrasena2: '',
            
        }
    }

    getInitialState() {
        return {
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
      }
      
      onRegionChange(region) {
        this.setState({ region });
      }

    handleCedula = (text) => this.setState({cedula: text})
    handleName = (text) => this.setState({nombres: text})
    handleLastName = (text) => this.setState({apellidos: text})
    handleEmail = (text) => this.setState({correo: text})

    handlePassword = (text) => this.setState({contrasena: text})
    handlePassword2 = (text) => this.setState({contrasena2: text})

    createUser = () => {
        const email = this.state.correo;
        const password = this.state.contrasena;
        const name = this.state.nombres;
        const lastname = this.state.apellidos;

        if(name == '' || lastname == '' || email == '' || password == ''){
            //Alert.alert('Información Requerida', 'Por favor ingrese toda la información')
            this.props.navigation.navigate('RegisterSuccessfull')
            return
        }


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
                    email: userCredentials.user.email,
                    photo: userCredentials.user.photoURL,
                    phone: userCredentials.user.phoneNumber,
                    displayName: userCredentials.user.displayName,
                    typeUser: 'adopter',
                    name,
                    lastname
                    
                  }).then(()=>{
                    //firebase.auth().sen
                    // firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
                    // .then(() => {
                    //     alert('Se ha enviado el correo de verificacion')
                    //   // Construct email verification template, embed the link and send
                    //   // using custom SMTP server.
                    //   //return sendCustomVerificationEmail(useremail, displayName, link);
                    // })
                    // .catch((error) => {
                    //   alert('error: '+error.message)
                    // });
                  
                    this.props.navigation.navigate('RegisterSuccessfull')
                    //   firebase.auth().signInWithEmailAndPassword(
                    //       userCredentials.user.email,
                    //       this.state.contrasena
                    //   ).then(user =>{
                    //     //   alert(JSON.stringify(user,null,4))
                          
                    //   }).catch(error => {
                    //       alert(error.message)

                    //   })

                      //alert('Usuario creado en la BD Real Time')
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
      Alert.alert('Error al registrar', mensaje)
        })
    }

    render() {
        return (
            <View style={style.main}>
                {/* <View style={style.boxlogo}>
                        <Image source={require('../assets/img/img_menu.jpeg')} style={style.logo}/>
                    </View> */}
                    <KeyboardAwareScrollView>
                <View style={style.form}>
                <Input
                        
                        placeholder=' Cédula'
                        keyboardType='number-pad'
                        // secureTextEntry={true}
                        maxLength={10}
                        value={this.state.cedula}
                        onChangeText={this.handleCedula}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                       
                        />
                <Input
                        
                        placeholder=' Nombres'
                        keyboardType='ascii-capable'
                        // secureTextEntry={true}
                        value={this.state.nombres}
                        onChangeText={this.handleName}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                       
                        />
                <Input
                
                        placeholder=' Apellidos'
                        keyboardType='ascii-capable'
                        // secureTextEntry={true}
                        value={this.state.apellidos}
                        onChangeText={this.handleLastName}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                        
                        />
                {/* <Input
                
                        placeholder=' Dirección'
                        keyboardType='email-address'
                        // secureTextEntry={true}
                        value={this.state.correo}
                        onChangeText={this.handleEmail}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                        
                        /> */}
                <Input
                
                        placeholder=' Correo Electrónico'
                        keyboardType='email-address'
                        // secureTextEntry={true}
                        value={this.state.correo}
                        onChangeText={this.handleEmail}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                        // leftIcon={
                        //     <Icon
                        //     name='email'
                        //     type='material'
                        //     size={20}
                        //     color='black'
                        //     />
                        // }
                        />

                    <Input
                    
                        placeholder=' Contraseña'
                        secureTextEntry={true}
                        value={this.state.contrasena}
                        onChangeText={this.handlePassword}
                        placeholderTextColor='black'
                        inputStyle={
                            style.input
                        }
                        />
                     <Input
                    
                    placeholder=' Confirmar Contraseña'
                    secureTextEntry={true}
                    value={this.state.contrasena2}
                    onChangeText={this.handlePassword2}
                    placeholderTextColor='black'
                    inputStyle={
                        style.input
                    }
                    />
                     <View style={styles.container}>
                    
   </View>

                    <ButtonCustom  
                            title="Registrarse"
                            colorcustom={myTheme['color-primary-700']}
                            buttonStyle={
                                style.button

                            }
                            onPress={()=>{
                                this.createUser()
                                
                            }}
                            
                           />

                    <View style={style.boxterminos}>
                        <Text style={style.terminos}>
                            Acepto los Términos y Condiciones de uso, la Política de Privacidad de los Datos de AdopciónPG
                        </Text>
                    </View>

                    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
                </View>
                </KeyboardAwareScrollView>
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1,
        
    },
    form:{
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25
    },
    boxlogo:{
        marginTop: 50,
        alignItems: 'center'
    },
    logo:{
        resizeMode: 'stretch',
        height: 150,
        width: 300,
      },
      input:{
        color: 'black',
        fontSize: 17,
        marginTop:10
      },
      button:{
        marginTop:20,
        borderRadius: 25,
        height: 50,
        
      },
      boxterminos:{
          marginTop: 10,
          alignItems: 'center'
      },
      terminos:{
          textAlign: 'center',
          fontWeight: 'bold'
      }
})

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
   });

export default NewAccount
