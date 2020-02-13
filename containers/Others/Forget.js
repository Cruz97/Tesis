import React, { Component } from 'react'
import { Text, View, StyleSheet,Image, Alert, ActivityIndicator, TouchableOpacity} from 'react-native'
import {Input,Icon,Button} from 'react-native-elements'
import {WebView} from 'react-native-webview'
import {Dialog} from 'react-native-simple-dialogs'


export class Forget extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props){
        super(props);
        this.state = {
            email: 'josecruz@gmail',
            show: false,
            verificated : false,
            success: false
        }
    }

    handleConf = () => {
        if(this.state.email ==='')
            Alert.alert('Campo requerido','Ingrese su correo electronico')
        else
            if(this.state.email == 'josecruz@gmail')
                {
                    this.openLoad(true)
                    setTimeout(()=>{
                        this.openLoad(false)
                        this.openSuccess(true)
                    },3000)
                    
                }
            else
                {
                    this.openLoad(true)
                    setTimeout(()=>{
                        this.openLoad(false)
                    },3000)
                    this.openSuccess(false)
                }
            //alert(this.state.email)
    }

    openLoad = (show) => {
        this.setState({show: show})
        // setTimeout(()=>{
        //     this.openLoad(false)
        //     //this.openSuccess(true)
        //     //this.setState({verificated: true})
           
        // },4000)  
    }

    openSuccess = (show) => {
        this.setState({success: show})
    }

    actionSuccess = () => {
        this.openLoad(false)
        this.openSuccess(false)
        this.props.navigation.navigate('Login')

    }

    render() {
        return (
            <View style={style.main}>
                 <Dialog title={"Verificando"}
                    animationType="fade"
                    onTouchOutside={ () => this.openLoad(false) }
                    
                    visible={ this.state.show } 
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
                       <ActivityIndicator size="large" color={'#A88C3D'} />
                       {/* {
                           this.state.verificated ? 
                           alert('Se ha enviado un email a su correo electronico') 
                           : 
                           alert('No Se ha podido verificar su correo') 
                       } */}



                    </Dialog>

                    <Dialog title={"Verificación exitosa"}
                    animationType="fade"
                    onTouchOutside={ () => this.openSuccess(false) }
                    
                    visible={ this.state.success } 
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
                        <View style={style.boxMsg}>
                            <Text style={style.txtmsg}>Se ha enviado un email a su correo electrónico con un enlace para proceder a cambiar su contraseña</Text>
                        </View>
                         <View style={style.botonAccept}>
                                <TouchableOpacity onPress={this.actionSuccess}>
                                    <Text style={style.textobtn}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>

                        {/* <Button onPress={()=>{this.openLoad(false),this.openSuccess(false)}}>
                            <Text>Aceptar</Text>
                        </Button> */}
                       {/* <ActivityIndicator size="large" color={'#A88C3D'} /> */}
                       {/* {
                           this.state.verificated ? 
                           alert('Se ha enviado un email a su correo electronico') 
                           : 
                           alert('No Se ha podido verificar su correo') 
                       } */}



                    </Dialog>

          
                 <View style={style.boxlogo}>
                        <Image source={require('../assets/img/passoroverde.png')} style={style.logo}/>
                    </View>

                    <View style={style.boxtitle}>
                        <Text style={style.txt}>Recuperar contraseña</Text>
                    </View>
                 <View style={style.box}>
                     
                     
                 <Input
                    placeholder='Inserte su correo electrónico'
                    // rightIcon={
                    //     <Icon
                    //     type='material'
                    //     name='mail'
                    //     size={24}
                    //     color='black'
                    //     />
                    // }
                    value = {this.state.email}
                    inputStyle={{
                        fontSize: 15
                    }}

                    containerStyle={{
                        height: 30
                    }}

                    onChangeText = {(text)=>this.setState({email: text})}

                    />
                  
                 </View>

                 <View style={style.boxbutton}>
                 
                   <Button
                        title="Confirmar"
                        type="outline"
                        buttonStyle={
                            {
                                backgroundColor: '#A88C3D',
                                borderRadius: 20
                                
                                
                            }
                        }

                        containerStyle={{
                            marginTop: 20
                        }}

                        titleStyle={{
                            color: '#fff'
                        }}

                        onPress={this.handleConf}
                        />
                
                 </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1,
        justifyContent: 'flex-start'
        
        //alignContent: 'flex-end'
        
        //alignItems: 'center'
    },
    box: {
        //marginTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 10,
        marginBottom: 30
      
    },
    boxbutton:{

        //marginTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
        

    },
    logo:{
        resizeMode: 'stretch',
        height: 120,
        width: 180,
        //backgroundColor: 'white',
        //marginTop:20,
        //marginLeft: 25
        
      },
      boxlogo:{
        marginTop: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40

    },
    boxtitle:{
        //marginTop: 30,
        alignItems: 'center'
    },
    txt:{
        fontSize:18,
        fontWeight: 'bold'
    },
    botonAccept:{
        marginTop: 20,
        alignItems: 'center'
    },
    textobtn:{
        fontFamily: 'Roboto-Bold',
        //fontStyle: 'Bold',
        color: '#A88C3D',
        textTransform: "uppercase",

        fontSize: 17,
        letterSpacing: 0,
        fontWeight: 'bold'
    },
    txtmsg:{
        textAlign: 'center'
    }
});

export default Forget
