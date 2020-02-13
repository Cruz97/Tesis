import React, { Component } from 'react'
import { Text, View, StyleSheet, Image,ImageBackground, TextInput, TouchableHighlight ,ActivityIndicator, Alert, Platform } from 'react-native'
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

 

    render() {
        return (
          
          <ImageBackground
               source={require('../assets/img/gradient2.jpg')}
              style={{width: '100%', height: '100%', flex: 1, backgroundColor: '#b3d9ff', }}
            > 

            <Text style={style.textWelcome}>
              Bienvenidos a
            </Text>
            <Text style={style.textApp}>
              PGAdopcion
            </Text>
            <View style={style.boxlogo}>
                        <Image source={require('../assets/img/img_menu.jpeg')} style={style.logo}/>
                    </View>
            {/* <Text style={style.textEslogan}>
              No compres uno de raza,           adopta uno sin casa
            </Text> */}
            {/* <View style={style.box}>

            </View> */}

           

           
                    
                    <View style={style.form} >
                        <ButtonCustom  
                            title="Quiero Adoptar"
                            //primary
                            colorcustom='#fff'
                            titleStyle={{
                              fontSize: 16,
                              color: '#780C88',
                              textTransform: 'uppercase',
                              fontWeight: 'bold'
                          }}
                            buttonStyle={
                                {
                                  height: 50,
                                    marginTop:30,
                                    borderRadius: 25,
                                    borderColor: '#780C88',
                                    borderWidth: 2
                                    
                                }

                            }
                            onPress={()=>{
                                this.props.navigation.navigate('LoginAdoptante')
                            }}
                            />

                        <ButtonCustom  
                            title="Soy Fundación"
                            titleStyle={{
                              fontSize: 16,
                              color: '#fff',
                              textTransform: 'uppercase',
                              fontWeight: 'bold'
                          }}
                            colorcustom={'#8B038C'}
                            buttonStyle={
                                {
                                    height: 50,
                                    marginTop:30,
                                    borderRadius: 25,
                                    borderColor: '#fff',
                                    borderWidth: 1
                                
                                }

                            }
                            onPress={()=>{
                                this.props.navigation.navigate('LoginFundacion')
                            }}
                            
                           />
                    </View>
  
            </ImageBackground>  
           
        )
    }
}



const style = StyleSheet.create({
    main:{
        flex:1,
        
    },
    textWelcome:{
      fontSize: 20,
      color: 'white',
      marginTop: '20%',
      marginLeft: '10%'
    },
    textApp:{
      fontSize: 30,
      color: 'white',
      marginTop: '1%',
      marginLeft: '10%'
    },
    textEslogan:{
      fontSize: 20,
      fontStyle: 'italic',
      color: 'white',
      marginTop: '10%',
      marginHorizontal: '10%',
      textAlign: 'center'
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
          marginTop: '2%',

        },
        android:{
          marginTop: '15%',
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
        height: 100,
        width: 200,
        borderRadius: 5
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
        position: 'absolute',
        bottom: 80,
        //backgroundColor: '#fff',
        //justifyContent: 'center',
        //alignContent: 'center',
        //position: 'absolute',
        width: '60%',
        height: '30%',
        borderTopStartRadius: 25,
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
    }
      
    
})

export default Welcome
