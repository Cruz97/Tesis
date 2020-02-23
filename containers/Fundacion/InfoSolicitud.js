import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView,TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import SendIntentAndroid from 'react-native-send-intent';
import { firebase } from '@react-native-firebase/auth';

export class InfoSolicitud extends Component {


    static navigationOptions = {
        title: 'Información de Solicitud de Adopción',
        back: true,
        hideRightComponent: 'hide'

    }

    constructor(props){
        super(props);
        const {navigation}= this.props;
        const user = navigation.getParam('user',null)
        const pet = navigation.getParam('pet',null)
        const request = navigation.getParam('request',null)
        const key = navigation.getParam('key',null)
        const idFoundation = navigation.getParam('idFoundation',null)
        
        this.state = {
            user,
            pet,
            request,
            key,
            idFoundation
        }
    }

    renderItemNotIcon = (title, data) => {
        return(
            <View style={style.item}>
                <View style={style.boxinfo}>
                        <Text style={style.titleinfo}>{title}</Text>
                    <Text style={style.info}>{ data}</Text>
                </View>

             </View>
        )
    }

    renderItemWithAction = (icon,data, title, type, onPress) => {
        return(
            <View style={style.item}>
                    <View style={style.boxiconinfo}>
                        <Icon 
                            name={icon}
                            size={25}
                            color='#fff'
                            type={type}
                            
                        />
                    </View>
                    <View style={style.boxactioninfo}>
                        <Text style={style.titleinfo}>{ title}</Text>
                        <Text style={style.info}>{ data}</Text>
                    </View>
                    
                        <TouchableOpacity onPress={onPress} style={style.boxitembutton} >
                            <Text style={{color: '#fff',textAlign: 'center'}} >Llamar</Text>
                        </TouchableOpacity>
                  
                   
                    

                </View>
        )
    }

    renderItem = (icon,data, title, type) => {
        return(
            <View style={style.item}>
                    <View style={style.boxiconinfo}>
                        <Icon 
                            name={icon}
                            size={25}
                            color='#fff'
                            type={type}
                            
                        />
                    </View>
                    <View style={style.boxinfo}>
                        <Text style={style.titleinfo}>{ title}</Text>
                        <Text style={style.info}>{ data}</Text>
                    </View>

                </View>
        )
    }

    componentDidMount(){

        const {idFoundation, key, request} = this.state;
        const status = request.status_request;
        if(status === 'NEW REQUEST'){
            let refRequest = firebase.database().ref('solicitudes/'+idFoundation+'/'+key);
            refRequest.update({
                "status_request" : "IN REVIEW"
            })
        }
        
    }


    render() {
        const {user,pet,request, idFoundation, key} = this.state;
        //alert(JSON.stringify(idFoundation,null,4))
        return (
            <ScrollView style={style.main}>
                <View style={[style.boxtitle]}>
                    <Text style={style.titletxt}>Mascota</Text>
                </View>

                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={style.boximage}>
                        <Image 
                            source={{
                                uri: pet.picture
                            }}
                            style={style.img}
                        />
                    </View>
                    <View style={style.petdetails}>
                        <Text style={style.name_pet}>{  pet.name  }</Text>
                        <View style={style.itemdetails}>
                                <View style={style.boxicon}>
                                <Icon
                                    name='today'
                                    type='material'
                                    size={25}
                                    style={style.icondetails}
                                    color={'orange'}
                                ></Icon>
                                </View>
                                <View style={style.boxtitledetail}>
                                        <Text style={style.titledetail}>Edad</Text>
                                </View>
                                <View style={style.boxvaluedetail}>
                                        <Text style={style.valuedetails}>{pet.age}</Text>
                                </View>
                            </View>


                            <View style={style.itemdetails}>
                            <View style={style.boxicon}>
                            <Icon
                                name='palette'
                                type='material'
                                size={25}
                                color={'orange'}
                            ></Icon>
                            </View>
                                <View style={style.boxtitledetail}>
                                        <Text style={style.titledetail}>Color</Text>
                                </View>
                                <View style={style.boxvaluedetail}>
                                        <Text style={style.valuedetails}>{pet.color}</Text>
                                </View>
                            </View>


                            <View style={style.itemdetails}>
                            <View style={style.boxicon}>
                            <Icon
                                name='pets'
                                type='material'
                                size={25}
                                color={'orange'}
                            ></Icon>
                            </View>
                                <View style={style.boxtitledetail}>
                                        <Text style={style.titledetail}>Especie</Text>
                                </View>
                                <View style={style.boxvaluedetail}>
                                        <Text style={style.valuedetails}>{pet.spice == 0 ? 'Canina' : 'Felina'}</Text>
                                </View>
                            </View>

                            <View style={style.itemdetails}>
                            <View style={style.boxicon}>
                            <Icon
                                 name='gender-male-female'
                                 type='material-community'
                                size={25}
                                color={'orange'}
                            ></Icon>
                            </View>
                                <View style={style.boxtitledetail}>
                                        <Text style={style.titledetail}>Sexo</Text>
                                </View>
                                <View style={style.boxvaluedetail}>
                                        <Text style={style.valuedetails}>{pet.gender == 0 ? 'Hembra' : 'Macho'}</Text>
                                </View>
                            </View>
                        
                    </View>
                </View>

                <View style={[style.boxtitle,{marginTop: 20}]}>
                    <Text style={style.titletxt}>Informacion del Adoptante</Text>
                </View>
                
                {
                    this.renderItem('account-circle',user.name + ' '+user.lastname, 'Nombres y Apellidos')
                }
                {
                    this.renderItem('account-card-details',request.identification, 'Cédula','material-community')
                }
                {
                    this.renderItem('today',request.date_birthday,'Fecha de Nacimiento' )
                }
                {
                    this.renderItemWithAction('cellphone-android',request.phone,'Teléfono Móvil' ,'material-community', ()=>{SendIntentAndroid.sendPhoneCall(request.phone,false);})
                }
                {
                    this.renderItem('worker',request.ocupation,'Ocupación' ,'material-community')
                }
                {
                    this.renderItem('email',request.email,'Correo electrónico' ,'material-community')
                }
                {
                    this.renderItem('verified-user',request.marital_status,'Estado Civil' )
                }

  

                <View style={[style.boxtitle,{marginTop: 30}]}>
                    <Text style={style.titletxt}>Informacion del Domicilio</Text>
                </View>

                {
                    this.renderItem('location-on',request.address,'Dirección')
                }
                {
                    this.renderItem('location-city',request.address_reference,'Referencia' )
                }
                {
                    this.renderItemWithAction('phone-classic',request.conventional_telephone,'Teléfono Convencional' ,'material-community', ()=>{SendIntentAndroid.sendPhoneCall(request.conventional_telephone,false);})
                }
                {          
                    this.renderItemNotIcon('Tipo y origen del inmueble', request.home_type + ' | '+request.home_origin)
                }
                {          
                    this.renderItemNotIcon('Número de convivientes', request.cohabiting_number)
                }
                {          
                    this.renderItemNotIcon('El domicilio posee patio', request.has_patio ? 'SI' : 'NO')
                }

                <View style={[style.boxtitle,{marginTop: 30}]}>
                    <Text style={style.titletxt}>Informacion Adicional</Text>
                </View>

                {
                    this.renderItemNotIcon('Motivo de adopción', request.adoption_reason)
                }

                {          
                    this.renderItemNotIcon('Alergias', request.allergy)
                }
                {          
                    this.renderItemNotIcon('Tiempo que la mascota permanecerá solo', request.time_alone)
                }
                {          
                    this.renderItemNotIcon('Tiene recursos económicos suficientes para mantener la mascota', request.has_resources ? 'SI' : 'NO')
                }
                

            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    main:{
        flex:1
    },
    item:{
        flex:1,
        //height: 60,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginHorizontal: '10%',
        marginTop: 10,
        flexDirection: 'row'
    },
    boxiconinfo:{
        width: '15%',
        justifyContent: 'center',
        backgroundColor: 'orange',
        overflow: 'hidden',
        borderBottomLeftRadius: 15,
        borderTopStartRadius: 15
    },
    boxinfo:{
        justifyContent: 'center',
        //alignItems: 'center',
        borderWidth:1,
        borderColor:'orange',
        flex:1,
        borderTopEndRadius: 15,
        paddingVertical: 10
    },
    boxactioninfo:{
        justifyContent: 'center',
        //alignItems: 'center',
        borderWidth:1,
        borderColor:'orange',
        flex:1,
        //borderTopEndRadius: 15,
        paddingVertical: 10
    },
    boxitembutton:{
       
        width: '25%',
        justifyContent: 'center',
        backgroundColor: 'orange',
        overflow: 'hidden',
        borderTopEndRadius: 15,
    },
    title:{
        fontSize: 18,
        color: '#999999',
        marginHorizontal: '5%',
        marginVertical: '1%',
        fontWeight: 'bold'
    },
    info:{
        fontSize: 14,
        textAlign: 'left',
        //marginVertical: '3%',
        marginHorizontal: '5%'
    },
    titleinfo:{
        fontSize: 14,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#999999',
        //marginVertical: '3%',
        marginHorizontal: '5%'
    },
    boxtitle:{
        backgroundColor: 'orange',
        paddingVertical: '5%'
    },
    titletxt:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
    boximage:{
        flex:1,
        
    },
    petdetails:{
        flex:1,
        //alignItems: 'center'
    },
    img:{
        flex:1, 
        borderRadius: 5,
        margin: 10,
        resizeMode: 'contain',
    },
    name_pet:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    itemdetails:{
        flex:1,
        flexDirection: 'row',
        marginHorizontal: 10
    },
    boxicon:{
        //flex:1,
        marginRight: 10,
        justifyContent: 'center'
    },
    titledetail: {
        fontWeight: 'bold',
        fontSize: 14,
        //color: '#fff',
        marginHorizontal: '4%',
        marginVertical: '3%',
        //color: myTheme['color-material-primary-500'],

    },
    valuedetails:{
        //fontWeight: 'bold',
        fontSize: 14,
        //color: '#fff',
        marginHorizontal: '4%',
        marginVertical: '3%',
        //color: myTheme['color-material-primary-500'],
    },

})

export default InfoSolicitud
