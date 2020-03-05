import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Avatar, Icon, Input, Button } from 'react-native-elements';
import {ButtonCustom} from '../components/index'
import {myTheme} from '../src/assets/styles/Theme'
import {Dialog} from 'react-native-simple-dialogs'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient';

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
            loading: false,
            alertCorreo: false
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
                this.setState({email: ''})
                Alert.alert('Advertencia', 'No se ha podido validar el correo electrónico. No hay un usuario que corresponda al correo proporcionado/ El usuario pudo haber sido eliminado.')
            })
        },2500)
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      };

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
                        onBlur = {
                            ()=>
                           {
                            if(this.state.email.length > 0){
                              if (!this.validateEmail(this.state.email)) {
                                this.setState({ alertCorreo: true})
                              }
                              else{
                                this.setState({alertCorreo: false})
                              }
                            }
                           }
                          }
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
                        <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertCorreo ? 'flex' : 'none'}}>
                          El correo ingresado no es válido
                        </Text>
                </View>

                <View style={style.btn}>
                {/* <ButtonCustom  
                            title="Reestablecer"
                            colorcustom={myTheme['color-success-600']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 20
                                
                                }

                            }
                            onPress={()=>{
                                let value = this.state.email;
                                if(value === ''){
                                    Alert.alert('Información requerida','Por favor ingrese un correo electrónico')
                                }else{
                                    this.ResetPassword()
                                }
                                
                            }}
                            
                           /> */}

<TouchableOpacity onPress={()=>{
                  let value = this.state.email;
                  if(value === ''){
                      Alert.alert('Información requerida','Por favor ingrese un correo electrónico.')
                  }else{
                      this.ResetPassword()
                  }
                }}>
                  {/*background-image: linear-gradient(to right top, #31e257, #29c243, #20a331, #14851f, #06680d);*/}
              <LinearGradient colors={['#31e257', '#29c243', '#20a331', '#14851f', '#06680d']} style={style.linearGradient}>
                <Text style={style.buttonText}>
                  Reestablecer contraseña
                </Text>
              </LinearGradient>
              </TouchableOpacity>

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
        marginLeft: '10%',
        marginRight: '10%',
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
        fontSize: 16,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
})


export default ForgetPass
