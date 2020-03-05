import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView,TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import {Icon} from 'react-native-elements';
import SendIntentAndroid from 'react-native-send-intent';
import { firebase } from '@react-native-firebase/auth';
import {myTheme} from '../../src/assets/styles/Theme';
import {withStyles} from 'react-native-ui-kitten'
import {sendNotification} from '../../src/utils/PushNotifications';
import AlertConfirmCustom from '../../components/AlertConfirmCustom'
import AlertCustom from '../../components/AlertCustom'
import { Dialog } from 'react-native-simple-dialogs';


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
        const token = navigation.getParam('token',null)
        this.state = {
            user,
            pet,
            request,
            key,
            idFoundation,
            token,
            status: request.status_request,
            modalApproved: false,
            loadingNotificacion: false,
            modalSuccess: false,
            modalMotivo: false,
            modalRejected: false,
            motivo: 'No cumple los requisitos',
            modalAdopted: false,
            modalSuccessAdopted: false,
            contadorAdopciones: 0
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

    renderItemAlert= (title, data) => {
        return(
            <View style={[style.item,{marginBottom: 10, marginHorizontal: '2%', backgroundColor: myTheme['color-danger-100']}]}>
                <View style={[style.boxinfo, {borderColor: 'red', borderWidth: 2}]}>
                        <Text style={[style.titleinfo,{color: 'red'}]}>{title}</Text>
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
        //alert(new Date())
        const {idFoundation, key, request} = this.state;
        const status = request.status_request;
        // var hoy = new Date()
        // var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        // var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        // var fechaYHora = fecha + ' ' + hora;
        var now = new Date();
                var utc = new Date(now.getTime());
                var timestamp = (utc.getTime()/1000 |0)
        if(status === 'NEW REQUEST'){
            let refRequest = firebase.database().ref('solicitudes/'+idFoundation+'/'+key);
            refRequest.update({
                
                "status_request" : "IN REVIEW",
                "comment": "La solicitud de adopción de mascota que enviaste está siendo revisada. Pronto se te notificará si la solicitud fue aprobada o rechazada"
            })

            refRequest.child('list_status').update({
                "review": timestamp
            })

            this.setState({status: 'IN REVIEW'})
        }

        let idUser = request.idUser;
        let refLogAdopciones = firebase.database().ref('adoptionLog/'+idFoundation);
        refLogAdopciones.on('value',(snapshot)=>{
            var contadorAdopciones = 0;
            snapshot.forEach((child)=>{
                let log = child.val();

                let idUserLog = log.idUser;
                if(idUserLog === idUser)
                    contadorAdopciones++;
            })
            this.setState({contadorAdopciones})
        })
        
    }

    changeMotivo= (text) => {
        this.setState({motivo: text})
    }


    render() {
        const {user,pet,request, idFoundation, key} = this.state;
        //alert(JSON.stringify(idFoundation,null,4))
        return (
            <ScrollView style={style.main}>
                 <AlertConfirmCustom 
                        modalVisible={this.state.modalApproved}
                        onBackdropPress={()=>{this.setState({modalApproved: false}); }}
                        source={require('../../assets/img/successgif.gif')}
                        title='Aprobación de solicitud de adopción de mascota'
                        subtitle='Al presionar Aceptar, la fundación declara haber revisado toda la información del adoptante, y procede a aprobar su solicitud. Se enviará una notificación al adoptante de la mascota'
                        textOK='Aceptar'
                        textCancel='Cancelar'
                        onPressOK={()=>{
                            this.setState({loadingNotificacion: true, modalApproved: false})
                            const {idFoundation, key, request} = this.state;
                            const status = request.status_request;
                           
                            if(status === 'IN REVIEW' || 'NEW REQUEST'){
                                let refRequest = firebase.database().ref('solicitudes/'+idFoundation+'/'+key);
                                
                                var now = new Date();
                                var utc = new Date(now.getTime());
                                var timestamp = (utc.getTime()/1000 |0)
                                refRequest.child('list_status').update({
                                    "approved": timestamp
                                })
                                
                                refRequest.update({
                                    "status_request" : "APPROVED",
                                    "comment": 'La solicitud de adopción de mascota que enviaste ha sido Aprobada, la fundación pronto se contactará contigo, para coordinar una visita/inspección del futuro hogar de la mascota'
                                }).then(()=>{
                                    
                                    sendNotification(
                                        [this.state.token],
                                        'Solicitud de Adopción de Mascota Aprobada',
                                        'La solicitud de adopción de mascota que enviaste ha sido aprobada, la fundación pronto se contactará contigo.'
                                        )
                                       setTimeout(()=>{
                                        this.setState({
                                            status: 'APPROVED',
                                            loadingNotificacion: false,
                                            modalSuccess: true,
                                            
                                        })
                                       },1500)
                                })
                                
                            }

                        }}
                        onPressCancel = {()=>{
                            this.setState({modalApproved: false})
                        }}

                    />

                <Dialog title={"Enviando notificación....."}
                    animationType="fade"
                    onTouchOutside={ () => this.setState({loadingNotificacion: false}) }
                    
                    visible={ this.state.loadingNotificacion } 
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

                    <Dialog title={"Motivo de Rechazo de Solicitud"}
                    animationType="fade"
                    onTouchOutside={ () => this.setState({modalMotivo: false}) }
                    
                    visible={ this.state.modalMotivo } 
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
                         <TextInput style = {[style.inputArea,{ borderColor: '#999999',}]}
                            returnKeyType='next'
                            underlineColorAndroid = "transparent"
                            multiline={true}
                            numberOfLines={10}
                            textAlignVertical='top'
                            textAlign='left'
                            //placeholder = "Nombre de la mascota"
                            //placeholderTextColor = {themedStyle.text.primary}
                            autoCapitalize = "none"
                            value={this.state.motivo}
                            onChangeText = {this.changeMotivo}/>
                        <View style={{width: '100%', height: 50}}>
                        <View style={style.boxbuttons}>
                    <TouchableOpacity 
                    style={[style.btn,{
                        backgroundColor: myTheme['color-danger-500'],
                        borderTopStartRadius: 10,
                        borderBottomStartRadius: 10
                        }]}
                        onPress={()=>{
                            this.setState({
                               
                                modalMotivo: false
                            })

                        }}
                        >
                        <Text style={style.txtbtn}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[style.btn,{
                        backgroundColor: myTheme['color-success-600'],
                        borderTopEndRadius: 10,
                        borderBottomEndRadius: 10
                    }]}
                        onPress={()=>{
                            this.setState({loadingNotificacion: true, modalMotivo: false})
                            const {idFoundation, key, request} = this.state;
                            //const status = request.status_request;
                                let refRequest = firebase.database().ref('solicitudes/'+idFoundation+'/'+key);
                                var now = new Date();
                                var utc = new Date(now.getTime());
                                var timestamp = (utc.getTime()/1000 |0)

                                refRequest.child('list_status').update({
                                    "rejected": timestamp
                                })

                                refRequest.update({
                                    "comment" : this.state.motivo,
                                    "status_request": 'REJECTED'
                                }).then(()=>{
                                    
                                    sendNotification(
                                        [this.state.token],
                                        'Solicitud de Adopción de Mascota Rechazada',
                                        'La solicitud de adopción de mascota que enviaste ha sido rechazada. Revisa tus solicitudes enviadas para ver mas detalles.'
                                        )
                                       setTimeout(()=>{
                                        this.setState({
                                            status: 'REJECTED',
                                            loadingNotificacion: false,
                                            modalRejected: true,
                                            
                                        })
                                       },1500)
                                })
                                
    
                        
                        }}
                        >
                        <Text style={style.txtbtn}>Enviar</Text>
                    </TouchableOpacity>
                    
                </View>
                        </View>
                        
                    </Dialog>

                <AlertCustom 
                    modalVisible={this.state.modalSuccess}
                    onBackdropPress={()=>{this.setState({modalSuccess: false}); this.props.navigation.navigate('SolicitudesF')}}
                    source={require('../../assets/img/successgif.gif')}
                    title='Genial!'
                    subtitle='La aprobación se ha realizado con éxito'
                    textButton='Aceptar'
                    onPress={()=>{
                        this.setState({modalSuccess: false})
                        //this.setModalVisible(false)
                        this.props.navigation.navigate('SolicitudesF')
                    }}

                />

                <AlertCustom 
                    modalVisible={this.state.modalSuccessAdopted}
                    onBackdropPress={()=>{this.setState({modalSuccessAdopted: false}); this.props.navigation.navigate('SolicitudesF')}}
                    source={require('../../assets/img/done1.gif')}
                    title='Genial!'
                    subtitle='La mascota ha sido dada en adopción'
                    textButton='Aceptar'
                    onPress={()=>{
                        this.setState({modalSuccessAdopted: false})
                        //this.setModalVisible(false)
                        this.props.navigation.navigate('SolicitudesF')
                    }}

                />

<AlertConfirmCustom 
                        modalVisible={this.state.modalAdopted}
                        onBackdropPress={()=>{this.setState({modalAdopted: false}); }}
                        source={require('../../assets/img/successgif.gif')}
                        title='Finalizar proceso de adopción'
                        subtitle='Al presionar Aceptar, declara que el adoptante ha cumplido con todos los requisitos solicitados y dará en adopción a la mascota'
                        textOK='Aceptar'
                        textCancel='Cancelar'
                        onPressOK={()=>{
                            this.setState({loadingNotificacion: true, modalAdopted: false})
                            const {idFoundation, key, request} = this.state;
                            const status = request.status_request;
                            if(status === 'APPROVED'){
                                // sendNotification(
                                //     arrayTokens,
                                //     'Solicitud de Adopción de Mascota Aprobada',
                                //     'La solicitud de adopción de mascota que enviaste ha sido aprobada, la fundación pronto se contactará contigo'
                                //     )
                                //alert(status)
                                
                                //alert(this.state.token)
                                let refPet = firebase.database().ref('publicaciones/'+idFoundation+'/'+request.idPet)
                                
                                
                                refPet.update({
                                    "status": "ADOPTED"
                                })
                                var hoy = new Date()
                                var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                                var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                               
                                let refRequest = firebase.database().ref('solicitudes/'+idFoundation+'/'+key);
                                
                                var now = new Date();
                                var utc = new Date(now.getTime());
                                var timestamp = (utc.getTime()/1000 |0)

                                refRequest.child('list_status').update({
                                    "adopted": timestamp
                                })

                                refRequest.update({
                                    "status_request" : "SUCCESS",
                                    "comment": "Ésta mascota se te dió en adopción el "+fecha+" a las "+hora
                                }).then(()=>{
                                    
                                    sendNotification(
                                        [this.state.token],
                                        'Proceso de Adopción de Mascota',
                                        'La mascota se te ha dado en adopción!, El proceso de adopción de mascota ha finalizado con éxito'
                                        )

                                        	
                                        var hoy = new Date()
                                        var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                                        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                                        var fechaYHora = fecha + ' ' + hora;
                                        
                                        //creo un registro de log
                                        let refLog= firebase.database().ref('adoptionLog/'+idFoundation);
                                        refLog.push({
                                            adoption_date: fechaYHora,
                                            idPet: request.idPet,
                                            idUser: request.idUser,
                                            idRequest: key
                                        })  

                                       setTimeout(()=>{
                                        this.setState({
                                            status: 'SUCCESS',
                                            loadingNotificacion: false,
                                            modalSuccessAdopted: true,
                                            
                                        })
                                       },1500)
                                })
                                
                            }
                            //this.setState({modalApproved: false})

                        }}
                        onPressCancel = {()=>{
                            this.setState({modalAdopted: false})
                        }}

                    />


                <AlertCustom 
                    modalVisible={this.state.modalRejected}
                    onBackdropPress={()=>{this.setState({modalRejected: false}); this.props.navigation.navigate('SolicitudesF')}}
                    source={require('../../assets/img/denied.gif')}
                    title='Solicitud rechazada!'
                    subtitle='Se ha rechazado esta solicitud de adopción de mascota'
                    textButton='Aceptar'
                    onPress={()=>{
                        this.setState({modalRejected: false})
                        //this.setModalVisible(false)
                        this.props.navigation.navigate('SolicitudesF')
                    }}

                />
                {
                    this.state.contadorAdopciones>0 ? (
                               
                            this.renderItemAlert('Importante!', 'Este usuario ya ha realizado '+this.state.contadorAdopciones+ (this.state.contadorAdopciones>1 ? ' adopciones': ' adopción')+ ' \nEs su responsabilidad dar en adopción varias mascotas a una misma persona')
                        
                            
                        
                    ) : null
                }

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
                                    color={colorPrimary}
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
                                color={colorPrimary}
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
                                color={colorPrimary}
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
                                color={colorPrimary}
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
                {
                    this.renderItem('description',request.date, 'Fecha y Hora de solicitud','material-icons')
                }

                <View style={[style.boxtitle,{marginTop: 20}]}>
                    <Text style={style.titletxt}>Informacion del Adoptante</Text>
                </View>
                
                {
                    this.renderItem('account-circle',user.name.toUpperCase() + ' '+user.lastname.toUpperCase(), 'Nombres y Apellidos')
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
                    this.renderItemNotIcon('Alergias', request.allergy ? 'SI' : 'NO')
                }
                {          
                    this.renderItemNotIcon('Tiempo que la mascota permanecerá solo', request.time_alone)
                }
                {          
                    this.renderItemNotIcon('Tiene recursos económicos suficientes para mantener la mascota', request.has_resources ? 'SI' : 'NO')
                }
                {          
                    this.renderItemNotIcon('De acuerdo con la esterilización de la mascota', request.sterilize ? 'SI' : 'NO')
                }

                <View style={style.boxbuttons}>
                    <TouchableOpacity style={[style.btn,{
                        backgroundColor: myTheme['color-danger-500']
                        }]}
                        onPress={()=>{
                            this.setState({modalMotivo: true})
                        }}
                        >
                        <Text style={style.txtbtn}>Rechazar Solicitud</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[style.btn,{
                        backgroundColor: myTheme['color-primary-700'],
                        display: this.state.status === ('APPROVED' || 'REJECTED' || 'SUCCESS') ? 'none' : 'flex'
                        }]}
                        onPress={()=>{
                            this.setState({modalApproved: true})
                        }}
                        >
                        <Text style={style.txtbtn}>Aprobar Solicitud</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[style.btn, { 
                        backgroundColor: myTheme['color-success-500'],
                        display: this.state.status === ('IN REVIEW' || 'NEW REQUEST' || 'REJECTED') ? 'none' : 'flex'
                        }]}
                        //disabled={true}
                        onPress={()=>{
                            //GUARDAR UN LOG DE FUNDACION
                            //NOTIFICAR QUE LA MASCOTA HA SIDO DADA EN ADOPCION
                            this.setState({modalAdopted: true})
                        }}
                        >
                        <Text style={style.txtbtn}>Dar en Adopción </Text>
                    </TouchableOpacity>
                </View>
                

            </ScrollView>
        )
    }
}

const colorPrimary = myTheme['color-primary-600'];

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
        backgroundColor: colorPrimary,
        overflow: 'hidden',
        borderBottomLeftRadius: 15,
        borderTopStartRadius: 15
    },
    boxinfo:{
        justifyContent: 'center',
        //alignItems: 'center',
        borderWidth:1,
        borderColor: colorPrimary,
        flex:1,
        borderTopEndRadius: 15,
        paddingVertical: 10
    },
    boxactioninfo:{
        justifyContent: 'center',
        //alignItems: 'center',
        borderWidth:1,
        borderColor: colorPrimary,
        flex:1,
        //borderTopEndRadius: 15,
        paddingVertical: 10
    },
    boxitembutton:{
       
        width: '25%',
        justifyContent: 'center',
        backgroundColor: colorPrimary,
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
        backgroundColor: colorPrimary,
        paddingVertical: '3%'
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
        flex:2,
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
    boxvaluedetail:{
        flex:2,
        //justifyContent: 'center'
    },
    boxtitledetail: {
        flex:1,
        justifyContent: 'center'
    },
    boxbuttons:{
        height: 60,
        flex:1,
        flexDirection: 'row',
        marginTop: 10
    },
    btn:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtbtn:{
        color: '#fff'
    },
    inputArea:{
        backgroundColor: myTheme['color-material-primary-100'],
        fontSize: 15,
        color: myTheme['color-primary-700'],
        marginTop: 5,
        height: 120,
        alignSelf: 'center',
        width: '100%',
        
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center'
    
    },

})

export default withStyles(InfoSolicitud, myTheme => ({
    colors:{
        primary: myTheme['color-primary-500']
    }
}))
