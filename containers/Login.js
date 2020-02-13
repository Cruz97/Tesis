import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { Avatar, Icon, Input, Button } from 'react-native-elements';
import Database from '../database'
import {WebView} from 'react-native-webview'
import * as validUrl from 'valid-url';
//import { authenticate } from '../src/utils/Odoo';
// import LoginAccess from '../src/containers/Login'
// import Odoo from 'odoo'

// const odoo = new Odoo({
//     host: 'https://pasaporteoroverde.com',
//     port: 8080,
//     database: 'v13_pasaporteoroverde_odoo_ec',
//     user: 'pasaporteoroverde@pasaporteoroverde.odoo.ec',
//     pass: 'C9puooh0WwwLF2iB',
//   });

class MyWebComponent extends Component {
    render() {
      return (
        <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />
      );
    }
  }

export class Login extends Component {

    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        const {navigation} = props;
        const intento  = navigation.getParam('intento', 0)
        // odoo.connect(function (err) {
        //     if (err) { return alert(err); }
        //   });
        this.state = {
            username: '',
            password: '',
            intento: intento,
            // user: 'pasaporteoroverde@pasaporteoroverde.odoo.ec',
            // pass: 'C9puooh0WwwLF2iB',
            // protocol: 'https://',
            // url: 'pasaporteoroverde.com',
            loading: true,
            show: false
        }

    }

    onLoginPress(e) {
        // e.preventDefault();
        this.setState({ loading: true });
        // this.validateFields(
        //   this.state.user,
        //   this.state.pass,
        //   this.state.protocol,
        //   this.state.url,
          
        // );
        const host = `${this.state.protocol}${this.state.url}`;
        authenticate(this.state.user,
            this.state.pass,host)
      }

      validateFields(
        user,
        pass,
        protocol,
        url,
        // db
        db = 'v13_' + url.replace(/\./g, '_')
      ) {
        //   alert(url)
        if (pass === '' || user === '' || url === '') {
          alert('Por favor ingrese los datos faltantes');
        } else if (!validUrl.isUri(`${protocol}${url}`)) {
          alert('Por favor ingrese una URL valida');
        } else {
          const host = `${protocol}${url}`;
        //   alert(host)
          authenticate(user, pass, host, db)
            .then(() => {
                // alert('then')
            //   this.props.navigation.navigate('App');
            })
            .catch(message => {
            //   this.setState({ loading: false });
              alert('msg: '+message);
            });
        }
      }

    handleUsername = (text) => this.setState({username: text})

    handlePassword = (text) => this.setState({password: text})

    openLoad = (show) => {
        this.setState({show: show})
        // setTimeout(()=>{
        //     this.openLoad(false)
        //     //this.openSuccess(true)
        //     //this.setState({verificated: true})
           
        // },4000)  
    }

    render() {
        return (
            <View style={style.main}>
                
                <View style={style.boxheader}>

                    <View style={style.boxlogo}>
                        <Image source={require('../assets/img/passoroverde.png')} style={style.logo}/>
                    </View>
                

                    <Image 
                    source={require('../assets/img/DJI_0225.jpg')} 
                    style={style.picture}
                    resizeMode='cover'   
                    resizeMethod='auto'
                    />
                     <View style={style.box}>
                    

                    </View>

                    <View style={style.form}>
                    <Input
                        placeholder=' Username'
                        placeholderTextColor='white'
                        onChangeText={this.handleUsername}
                        inputStyle={
                            {
                            color: 'white'
                            }
                        }
                        leftIcon={
                            <Icon
                            name='account-box'
                            type='material'
                            size={24}
                            color='white'
                            />
                        }
                        
                        />

                        <Input
                        placeholder=' Password'
                        secureTextEntry={true}
                        onChangeText={this.handlePassword}
                        placeholderTextColor='white'
                        inputStyle={
                            {
                            color: 'white'
                            }
                        }
                        leftIcon={
                            <Icon
                            name='lock'
                            type='material'
                            size={24}
                            color='white'
                            />
                        }
                        />

                        <Button onPress={()=> this.props.navigation.navigate('Loading',
                        {username: this.state.username, password: this.state.password, intento: this.state.intento+1}
                        )
                    }
                    //   <Button onPress={()=> this.onLoginPress(this)
                    // }
                        buttonStyle={{marginTop: 20, backgroundColor: '#A88C3D', borderRadius: 20}} 
                        title="Ingresar"
                        //type="outline"
                        >
                            

                        </Button>
                        <View style={style.boxforget}>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Forget2')}
                               
                                   
                                >
                                    <Text style={style.forgettext}>
                                    ¿Olvidáste tu contraseña?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    </View>

                </View>

         
               
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
        
        position:'absolute',
        top: 110, 
        
        //right: 30,
        zIndex: 1001, 

    },
    box:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,31,77,0.78)',
        //backgroundColor: 'rgba(255,255,255,0.9)',
    },
    logo:{
        resizeMode: 'stretch',
        height: 120,
        width: 180,
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
        position: 'absolute',
        width: '70%',
        height: '30%',
        top: 350,
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
      }
      
    
})

export default Login
