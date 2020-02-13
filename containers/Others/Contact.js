import React, { Component } from 'react'
import { Text, 
    View, 
    StyleSheet, 
    TextInput,
    ScrollView, 
    Linking,
    TouchableOpacity,
    Platform} from 'react-native';
import { 
    Avatar, 
    Button, 
    Card, 
    TouchableRipple,
    Title, 
    Paragraph
     } from 'react-native-paper';

import Database from '../database'


const schemaName = 'Information';
const uuid = 'fa53e9fa-63f0-48c2-8d84-b760113745c1';

export class Contact extends Component {



    static navigationOptions={
        title: 'Contacto',
        hideRightComponent: 'hide',
       
    }

    state={
        text: '',
        info: Database.CloudDB.get(schemaName,uuid)
    };

    _renderInput = (label) => {
        return(
            <View style={style.boxinput}>
                 <Text style={[style.label, style.colortext]}>
                    {label}
                </Text>
                <TextInput
                            style={[style.input, style.hinput]}/>
             </View>
        )
    }

    _renderTextArea = (label) => {
        return(
            <View style={style.boxinput}>
                 <Text style={[style.label, style.colortext]}>
                    {label}
                </Text>
                <TextInput
                            style={[style.textarea,style.htextarea]}
                            multiline = {true}
                            numberOfLines = {4}
                            //value={this.state.text}
                            //onChangeText={text => this.setState({ text })}
                            />
             </View>

        )
    }

    render() {
        return (
            <ScrollView style={style.main}>
                
                <Card style={style.card}>
                   <Card.Content>
                   <Text style={style.textotitle}>Dirección</Text>
                    
                    <View style={style.box}>
                        <Text 
                            style={style.fontAdress}
                            adjustsFontSizeToFit={true} 
                            numberOfLines={1}
                            >{this.state.info.address}</Text>
                    </View>
                   </Card.Content>
                   <Card.Actions style={style.boxbutton}>
                       <TouchableOpacity style={style.boton} onPress={()=> {

                           if(Platform.OS === 'ios'){
                            const latitude = -2.1917033;
                            const longitude = -79.884656;
                            const label = "Guayaquil, Guayas, Ecuador";

                            //const location = `${latitude},${longitude}`
                            Linking.openURL("maps://" + latitude + "," + longitude + "?q=" + label);
                        }
                        else{
                            var SendIntentAndroid = require('react-native-send-intent');
                            
                            SendIntentAndroid.openMaps(this.state.info.address);
                        }
                       }}>
                           <Text style={style.textobtn}>VER EN EL MAPA</Text>
                       </TouchableOpacity>
                       
                   </Card.Actions>

               </Card>
               <Card style={style.card}>
                   <Card.Content>
                   <Text style={style.textotitle}>Teléfono</Text>
                    
                    <View style={style.boxtelef}>
                    <Text style={[style.numberphone]}>{this.state.info.phone}</Text>
                        <TouchableOpacity style={style.botontelef} onPress={()=> {
                            if(Platform.OS === 'ios'){
                                const url = 'tel://1234567890';
	                            Linking.OpenURL(url);
		
                        
                            }
                            else{
                                var SendIntentAndroid = require('react-native-send-intent');
                                SendIntentAndroid.sendPhoneCall(this.state.info.phone,false);
                            }
                        }}>
                           <Text style={style.textobtn}>LLAMAR</Text>
                       </TouchableOpacity>
                 </View>
                   </Card.Content>
                  

               </Card>
               <Card style={style.card}>
                   <Card.Content>
                   <Text style={style.textotitle}>Escríbanos</Text>
                    
                    <View style={style.form}>
                        <Text style={style.subtitle}>Ingrese sus datos y escriba su mensaje</Text>
                        {this._renderInput('Nombre')}
                        {this._renderInput('Apellido')}
                        {this._renderInput('E-mail')}
                        {this._renderInput('Asunto')}
                        {this._renderTextArea('Mensaje')}
                    </View>
                    
                   </Card.Content>
                   <Card.Actions style={style.boxbutton}>
                       <TouchableOpacity style={style.boton} onPress={()=>{}}>
                           <Text style={style.textobtn}>ENVIAR</Text>
                       </TouchableOpacity>
                       
                   </Card.Actions>

               </Card>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor: '#f2f2f2',
    },
    card:{
        borderRadius: 5,
        marginLeft: 15, 
        marginRight:15,
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    textotitle:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    textobtn:{
        color: '#A88C3D',
        textTransform: "uppercase",
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 0
    },
    box:{
        marginTop: 4,
        marginRight:10,
        flexDirection: 'row',
        justifyContent:  'flex-start',
        alignItems: 'baseline',      
    },
    boxbutton:{
        marginTop: 0,
        marginBottom: 5,
        marginRight:10,
        flexDirection : 'row',
        justifyContent: 'flex-end',
        
    },
    botontelef:{
        //alignItems: 'center',
       //marginTop: -10,
       //paddingBottom: 0,
        justifyContent: 'center',
        marginTop: -15,
    },
    boxtelef:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boxinput:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        
    },
    label:{
        fontSize: 15,
        fontWeight: 'bold',
        width: 70,
        marginLeft: 8
    },
    input:{
        flex: 1,
        
        marginLeft: 25,
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 10,
        margin: 0,
        fontSize: 15,
        fontWeight: '700',
        //borderWidth: 1,
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: '#f2f2f2'
        
    },
    colortext:{
        color: '#666666'
    },
    subtitle:{
        marginTop: 3,
        marginBottom: 10,
        fontSize: 16,
        color: '#666666',
        fontWeight: '500'
    },
    textarea:{
        flex: 1,
        
        marginLeft: 25,
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 10,
        margin: 0,
        fontSize: 15,
        fontWeight: '700',
        //borderWidth: 1,
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: '#f2f2f2',
        
        
    },
    hinput:{
        height: 35
    },
    htextarea:{
        height: 80
    },
    numberphone:{
        fontSize: 15
    },
    fontAdress:{
        fontSize:14
    }

});

export default Contact;
