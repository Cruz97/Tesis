        import React, { Component } from 'react'
        import { Text, ScrollView,View, StyleSheet,TextInput, Picker, ImageBackground, Image, Alert, TouchableHighlight, TouchableOpacity} from 'react-native'
        import AlertConfirmCustom from '../../components/AlertConfirmCustom';
        import { SafeAreaView } from 'react-navigation'
        import { ButtonGroup, Icon, Overlay} from 'react-native-elements'
        import { RadioButton,Title,Headline, List, Checkbox  } from 'react-native-paper';
        import ButtonCustom from '../../components/ButtonCustom'
        import {myTheme} from '../../src/assets/styles/Theme'
        import {Autocomplete} from 'react-native-autocomplete-input'
        import { Layout, withStyles, Button } from 'react-native-ui-kitten';
        import ImagenPicker from '../../src/components/ImagePicker'
        import firebase from '@react-native-firebase/app'
        import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
        import database from '@react-native-firebase/database'
        import storage from '@react-native-firebase/storage'
        import * as Progress from 'react-native-progress';
        import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
        import { Dialog } from 'react-native-simple-dialogs';
        import AlertCustom from '../../components/AlertCustom';
        import LoadingCustom from '../../components/LoadingCustom';
        import DatePicker from 'react-native-datepicker'
        import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
        import {sendNotification} from '../../src/utils/PushNotifications';
        import Slider from '@react-native-community/slider';
        import firestore from '@react-native-firebase/firestore'
import moment from 'moment';



        export class PersonalInformation extends Component {

            static navigationOptions = {
                title: 'Formulario de Adopción',
                hideRightComponent: 'hide',
                back: true
            }

            constructor(props){
                super(props)
                const {navigation} = this.props;
                const idPet = navigation.getParam('idPet','');
                const idFoundation = navigation.getParam('idFoundation','');
                
                const idUser = firebase.auth().currentUser.uid;
                //let refUser = firebase.database().ref('usuarios/'+idUser);
                


                this.state = {
                    modalVisible: false,
                    modalConfirm: false,
                    tokenFoundation: '',
                    idPet: idPet,
                    idFoundation: idFoundation,
                    idUser: idUser,
                    objUser: {},
                    nombres: '',
                    apellidos: '',
                    cedula: '',
                    celular: '',
                    fechanacimiento: '1999-01-01',
                    ocupacion: '',
                    correo: '',
                    estadocivil: '',


                    direccion: '',
                    referencia: '',
                    telefono: '',
                    tipo_inmueble: '',
                    origen_inmueble: '',
                    tiene_patio: -1,
                    motivo: '',
                    numero_personas: 0,
                    value_ini:1,
                    value_fin: 15,
                    esterilizar: -1,
                    
                    alergia: -1,
                    deacuerdo: -1,
                    //alergia: '',
                    tiene_espacio: -1,
                    tiempo_solo: '',
                    tiene_recursos: -1,
                    expanded: false,
                    expanded2: false,
                    expanded3: true,
                    selectedIndexGender: -1,
                    selectedIndexType: -1,
                
                    //numeroconvivientes: '',
                    statusNext1: true,
                    
                    
                    date: '2020-01-01'

                }
                this.updateIndexTienePatio = this.updateIndexTienePatio.bind(this)
                this.updateIndexAlergia = this.updateIndexAlergia.bind(this)
                this.updateIndexDeAcuerdo = this.updateIndexDeAcuerdo.bind(this)
                this.updateIndexTieneEspacio = this.updateIndexTieneEspacio.bind(this)
                this.updateIndexTieneRecursos = this.updateIndexTieneRecursos.bind(this)
                this.updateIndexEsterilizar= this.updateIndexEsterilizar.bind(this)

            
                //this.updateIndexType = this.updateIndexType.bind(this)
            }

            viewDuplicate = () => {
                let refSolicitud = firebase.database().ref('solicitudes/'+this.state.idFoundation);
                let status_pet = false
                refSolicitud.orderByChild('idPet').equalTo(this.state.idPet).on('value', (snapshot) => {
                  if(snapshot.val()!== null){
                      status_pet = true
                  }
                });

                if(status_pet) Alert.alert('Información','Usted ya se encuentra en un proceso de adopción.')
                else alert('vacio')
            }

            sendSolicitud = () =>{
                var hoy = new Date()
                var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                var fechaYHora = fecha + ' ' + hora;

                var now = new Date();
                var utc = new Date(now.getTime());
                var timestamp = (utc.getTime()/1000 |0)

                let refSolicitud= firebase.database().ref('solicitudes/'+this.state.idFoundation);
                // var date =  moment().format('YYYY-MM-DD')
                // let dateTimestamp = (new Date(moment().format('YYYY-MM-DD'))).getTime()/1000   
                refSolicitud.push({
                    idUser: this.state.idUser,
                    idPet: this.state.idPet,
                    name: this.state.nombres.toUpperCase(),
                    lastname: this.state.apellidos.toUpperCase(),
                    identification: this.state.cedula,
                    phone: this.state.celular,
                    date_birthday: this.state.fechanacimiento,
                    ocupation: this.state.ocupacion.toUpperCase(),
                    email: this.state.correo.toUpperCase(),
                    marital_status: this.state.estadocivil.toUpperCase(),
                    address: this.state.direccion.toUpperCase(),
                    address_reference: this.state.referencia.toUpperCase(),
                    conventional_telephone: this.state.telefono,
                    home_type: this.state.tipo_inmueble.toUpperCase(),
                    home_origin: this.state.origen_inmueble.toUpperCase(),
                    has_patio: this.state.tiene_patio == 1 ? true : false,
                    adoption_reason: this.state.motivo.toUpperCase(),
                    cohabiting_number: this.state.numero_personas,
                    agreement: this.state.deacuerdo  == 1 ? true : false,
                    allergy: this.state.alergia == 1 ? true : false,
                    space: this.state.tiene_espacio  == 1 ? true : false,
                    time_alone: this.state.tiempo_solo.toUpperCase(),
                    has_resources: this.state.tiene_recursos  == 1 ? true : false,
                    status_request: 'NEW REQUEST', 
                    sterilize: this.state.esterilizar == 1 ? true : false,
                    date: fechaYHora,
                    dateProcess:  (new Date(moment().format('YYYY-MM-DD'))).getTime()/1000,
                    list_status: {
                        new: timestamp
                    } 
                }).then((value)  =>{
                   let keyNewRequest = value.key;
                   let refUser = firebase.database().ref('usuarios/'+firebase.auth().currentUser.uid);
                   let userProp = refUser.child('myrequests');
                   userProp.push({
                       idRequest: keyNewRequest,
                       idFoundation: this.state.idFoundation
                   })
                   var arrayTokens = [this.state.tokenFoundation];
                   sendNotification(
                       arrayTokens,
                       'Solicitud de Adopción',
                       'Alguien quiere adoptar una mascota, revisa su solicitud pronto!'
                       )
                       this.setState({
                        modalVisible: true
                    })
             
                      

                }).catch(error=>{
                    alert(error.message)
                });
            }

        showState = () => {
            alert(JSON.stringify(this.state,null,4))
        }


        _handleExpand = () =>
        this.setState({
            expanded: !this.state.expanded
        });

        _handleExpand2 = () =>
        this.setState({
            expanded2: !this.state.expanded2
        });

        _handleExpand3 = () =>
        this.setState({
            expanded3: !this.state.expanded3
        });

            componentDidMount(){
                let refUser = firebase.database().ref('usuarios/'+this.state.idUser)
                refUser.on('value', (snapshot)=>{
                    let user = snapshot.val()
                    this.setState({
                        nombres: user.name,
                        apellidos: user.lastname,
                        cedula: user.card_identification,
                        celular: user.phone_mobile,
                        telefono: user.phone_conventional,
                        fechanacimiento: user.date_of_birth,
                        ocupacion: user.ocupation,
                        correo: user.email,
                        estadocivil: user.marital_status.toLowerCase(),
                        direccion: user.address,
                        referencia: user.reference,
                        //telefono: user.
                        
                    })
                })
                var idFoundation = this.state.idFoundation;
                //alert(idFoundation)
                let refToken = firebase.database().ref('tokens/'+idFoundation);
                refToken.on('value',(snapshot)=>{
                    this.setState({tokenFoundation: snapshot.val().token})
                })
            }

            changeNombres = (text) => {
                this.setState({nombres: text})
            }
            changeApellidos = (text) => {
                this.setState({apellidos: text})
            }
            changecedula = (text) => {
                this.setState({cedula: text})
            }
            changeCelular = (text) => {
                this.setState({celular: text})
            }
            changeOcupacion = (text) => {
                this.setState({ocupacion: text})
            }
            changeCorreo = (text) => {
                this.setState({correo: text})
            }
            changeDireccion= (text) => {
                this.setState({direccion: text})
            }
            changeReferencia = (text) => {
                this.setState({referencia: text})
            }
            changeTelefono = (text) => {
                this.setState({telefono: text})
            }
            changeMotivo= (text) => {
                this.setState({motivo: text})
            }

            changeConvivientes= (text) => {
                this.setState({numero_personas: text})
            }

            // changeAlergia= (text) => {
            //     this.setState({alergia: text})
            // }

            changeTiempoSolo= (text) => {
                this.setState({tiempo_solo: text})
            }

            setModalVisible(visible) {
                this.setState({modalVisible: visible});
            }
            
            updateIndexEsterilizar (selectedIndex) {
                this.setState({esterilizar: selectedIndex})
            }

            updateIndexTienePatio (selectedIndex) {
                this.setState({tiene_patio: selectedIndex})
            }

            updateIndexDeAcuerdo (selectedIndex) {
                this.setState({deacuerdo: selectedIndex})
            }

            updateIndexAlergia(selectedIndex) {
                this.setState({alergia: selectedIndex})
            }

            updateIndexTieneEspacio (selectedIndex) {
                this.setState({tiene_espacio: selectedIndex})
            }

            updateIndexTieneRecursos (selectedIndex) {
                this.setState({tiene_recursos: selectedIndex})
            }

            updateIndexType (selectedIndexType) {
                this.setState({selectedIndexType})
            }
            handleName = (text) => {
                this.setState({
                    name: text
                })
            }

            handleYears = (text) => {
                this.setState({
                    edad: text
                })
            }

            handleDescription = (text) => {
                this.setState({
                    description: text
                })
            }

            handleColor = (value) => {
                //alert(value)
                this.setState({
                    color: value
                })
            }

            handleTypePublish= (value) => {
                //alert(value)
                this.setState({
                    typepublish: value
                })
            }

            handleEstadoCivil = (estado) => {
                this.setState({
                    estadocivil: estado
                })
            }

            handleTipoInmueble = (tipo) => {
                this.setState({
                    tipo_inmueble: tipo
                })
            }

            handleOrigenInmueble = (origen) => {
                this.setState({
                    origen_inmueble: origen
                })
            }


            onSelect = ({ title }) => {
                this.setState({
                    value: title
                })
            };


            onChangeImages = (images) => {
                this.setState({
                    images
                })
            }

            validaPersonalinfo = () => {
                if(this.state.nombres == '' || this.state.apellidos=='' || this.state.cedula==''
                || this.state.celular == '' || this.state.fechanacimiento == '' || this.state.ocupacion==''
                || this.state.correo == '' || (this.state.estadocivil == '' || this.state.estadocivil=='null'))
                    return true
                return false
            }

            validaDatosDomicilio = () => {
                if(this.state.direccion == '' || this.state.referencia=='' || this.state.telefono==''
                || this.state.celular == '' || (this.state.tipo_inmueble == '' || this.state.tipo_inmueble=='null')
                || (this.state.origen_inmueble == '' || this.state.origen_inmueble=='null') || this.state.tiene_patio == -1)
                    return true
                return false
            }

            validaInfoAdicional = () => {
                if(this.state.motivo == '' || this.state.numero_personas == '' || this.state.deacuerdo == -1 ||
                this.state.alergia === -1 || this.state.tiene_espacio == -1 || this.state.tiempo_solo == '' || this.state.tiene_recursos == -1)
                    return true
                return false
            }


            

            render() {
                const {themedStyle} = this.props;

                const response = ['No','Si'];
                const buttonsGender = ['Hembra', 'Macho']
                const buttonsType = ['Canina', 'Felina']
                const { selectedIndexGender } = this.state
                const { selectedIndexType } = this.state
                return (
                    <ScrollView style={style.main}>
                    <AlertCustom 
                    modalVisible={this.state.modalVisible}
                    onBackdropPress={()=>{this.setState({modalVisible: false}); this.props.navigation.navigate('HomeAdoptante')}}
                    source={require('../../assets/img/successgif.gif')}
                    title='Genial!'
                    subtitle='La solicitud de adopción de mascota ha sido enviada con éxito'
                    textButton='Aceptar'
                    onPress={()=>{
                        this.setModalVisible(false)
                        this.props.navigation.navigate('HomeAdoptante')
                    }}/>

                    <AlertConfirmCustom 
                        modalVisible={this.state.modalConfirm}
                        onBackdropPress={()=>{this.setState({modalConfirm: false}); }}
                        source={require('../../assets/img/successgif.gif')}
                        title='Adoptar mascota'
                        subtitle='Al presionar Aceptar, usted declara que toda la información proporcionada es real, y además que iniciará el proceso de adopción de una mascota'
                        textOK='Aceptar'
                        textCancel='Cancelar'
                        onPressOK={()=>{
                            this.setState({modalConfirm: false})
                            this.sendSolicitud()

                        }}
                        onPressCancel = {()=>{
                            this.setState({modalConfirm: false})
                        }}

                    />
                
                        <KeyboardAwareScrollView>
                    <View style={{flex: 1}}>
            <ProgressSteps >
                <ProgressStep label="Datos Personales" 
                
                nextBtnDisabled={this.validaPersonalinfo() ? true : false}
                nextBtnText="Siguiente" 
                nextBtnTextStyle={{
                    color: '#fff'
                }}
                nextBtnStyle={{
                    //padding: 10,
                    paddingHorizontal: 20,
                    backgroundColor: myTheme['color-success-600'],
                    borderRadius: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                >
                <View style={style.form}>    
                <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Nombres</Text>                
        <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,}]}
                value={this.state.nombres}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Nombres"
                editable={false}
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changeNombres}/>
    <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Apellidos</Text>  
        <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,}]}
                value={this.state.apellidos}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Apellidos"
                editable={false}
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changeApellidos}/>
        <View style={[style.boxinput,{paddingLeft: -64}]}>
       <View style={{flexDirection: 'column', flex:1, marginRight: '3%'}}>
       <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Cédula</Text>   
        <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,flex:1, marginRight:10}]}
                value={this.state.cedula}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Cédula"
                maxLength={10}
                editable={false}
                keyboardType='number-pad'
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changecedula}/>
       </View>
       <View style={{flexDirection: 'column', flex:1}} >
        <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Telf. Móvil</Text> 
            <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,flex:1, }]}
                    value={this.state.celular}
                    returnKeyType='next'
                    underlineColorAndroid = "transparent"
                    placeholder = "Telf. celular"
                    maxLength={10}
                    editable={false}
                    keyboardType='number-pad'
                    placeholderTextColor = {themedStyle.text.primary}
                    //autoCapitalize = "none"
                    onChangeText = {this.changeCelular}/>
       </View>
        </View>
        <View style={[style.boxinput,{paddingLeft: -64, alignItems: 'center'}]}>
        <Text style={[style.label,{alignSelf: 'center', marginRight: 10}]}>Fecha de Nacimiento</Text>

        <DatePicker
                disabled={true}
                style={{
                    flex:1,
                    //width: '100%',
                    //paddingLeft: -44,
                
                }}
                customStyles={{
                    dateInput:{
                        width: '100%',
                        backgroundColor: myTheme['color-material-primary-100'],
                    //fontSize: 17,
                    //borderWidth: 1,
                    borderRadius: 5,
                    color: themedStyle.colors.primary,
                    borderColor: themedStyle.colors.primary,
                    marginTop: 15
                    //borderColor:  myTheme['color-material-primary-100'],
                        
                    },
                    dateText:{
                        width: '100%',
                        color: myTheme['color-primary-700'],
                        marginLeft: 5,
                        fontSize: 17
                        
                    },
                    datePicker:{
                        width: '100%'
                    },
                    dateTouchBody:{
                        width: '100%'
                    },
                    datePickerCon:{
                        
                    },
                    dateIcon:{
                        //flex:1,
                        marginTop: 15,
                    justifyContent: 'center'
                    }
                
                }}
                date={this.state.fechanacimiento}
                mode="date"
                androidMode="spinner"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1900-01-01" 
                maxDate="2050-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                
                onDateChange={(date) => {this.setState({fechanacimiento: date})}}
            />
        </View>
        <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Ocupación</Text> 
        <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,}]}
                value={this.state.ocupacion}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Ocupación"
                editable={false}
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changeOcupacion}/>
        <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Correo electrónico</Text> 
        <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,}]}
                value={this.state.correo}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Correo electrónico"
                editable={false}
                keyboardType='email-address'
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changeCorreo}/>
        {/* <View style={{flexDirection: 'row',paddingLeft:-64}}>


                            

        </View> */}
        <View style={{flexDirection: 'row',paddingLeft:-64}}>
        <Text style={[style.label,{alignSelf: 'center', marginTop: 10}]}>Estado Civil</Text>


        <Picker
        style={[style.internalPickerContainer,{marginTop:10}]}
        enabled={false}
        mode='dialog'
        iosHeader="Select Type "
        selectedValue={this.state.estadocivil}
        onValueChange={this.handleEstadoCivil}
        //
        itemStyle={[style.pickerIosListItemContainer]}
        itemTextStyle={[style.pickerIosListItemText,{backgroundColor: 'red'}]}
        >
        <Picker.Item label="Seleccione" value="null" />
        <Picker.Item label="Soltero" value="soltero" />
        <Picker.Item label="Casado" value="casado" />
        <Picker.Item label="Divorciado" value="divorciado" />
        <Picker.Item label="Viudo" value="viudo" />
        </Picker>
        </View>


        </View>
                </ProgressStep>
                
                <ProgressStep label="Datos Domiciliarios" 
                nextBtnDisabled={this.validaDatosDomicilio() ? true : false}
                nextBtnText="Siguiente" 
                previousBtnText="Anterior" 
                onPrevious= {()=>{
                
                }}
                nextBtnTextStyle={{
                    color: '#fff'
                }}
                nextBtnStyle={{
                    //padding: 10,
                    paddingHorizontal: 20,
                    backgroundColor: myTheme['color-success-600'],
                    borderRadius: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                previousBtnTextStyle={{
                    color: '#fff'
                }}
                previousBtnStyle={{
                    //padding: 10,
                    paddingHorizontal: 20,
                    backgroundColor: myTheme['color-warning-700'],
                    borderRadius: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                >
                <View style={style.form}>


        <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Dirección</Text>  
        <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,}]}
                        value={this.state.direccion}
                        returnKeyType='next'
                        underlineColorAndroid = "transparent"
                        placeholder = "Dirección"
                        editable={false}
                        placeholderTextColor = {themedStyle.text.primary}
                        //autoCapitalize = "none"
                        onChangeText = {this.changeDireccion}/>
        <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Referencia</Text>  
                    <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,flex:1}]}
                        value={this.state.referencia}
                        returnKeyType='next'
                        underlineColorAndroid = "transparent"
                        placeholder = "Referencia"
                        editable={false}
                        placeholderTextColor = {themedStyle.text.primary}
                        //autoCapitalize = "none"
                        onChangeText = {this.changeReferencia}/>
        <Text style={[style.labelTitle,{alignSelf: 'flex-start', marginRight: 10}]}>Teléfono Convencional</Text> 
                    <TextInput style = {[style.inputDisable,{ borderColor: themedStyle.colors.primary,flex:1}]}
                        value={this.state.telefono}
                        returnKeyType='next'
                        underlineColorAndroid = "transparent"
                        placeholder = "Telf. domiciliario"
                        keyboardType='number-pad'
                        editable={false}
                        placeholderTextColor = {themedStyle.text.primary}
                        //autoCapitalize = "none"
                        onChangeText = {this.changeTelefono}/>
                        <View style={{flexDirection: 'row',paddingLeft:-64}}>
                            <Text style={
                                [style.label,
                                {alignSelf: 'center', marginRight: 10}]
                                }>Tipo de Inmueble</Text>
                            
                            
                            <Picker
                                style={style.internalPickerContainer}
                                
                                mode='dialog'
                                iosHeader="Select Type "
                                selectedValue={this.state.tipo_inmueble}
                                onValueChange={this.handleTipoInmueble}
                                //
                                itemStyle={[style.pickerIosListItemContainer]}
                                itemTextStyle={[style.pickerIosListItemText,{backgroundColor: 'red'}]}
                            >
                                <Picker.Item label="Seleccione una opción" value="null" />
                                <Picker.Item label="Casa" value="Casa" />
                                <Picker.Item label="Departamento" value="Departamento" />
                            </Picker>
                    </View>

                    <View style={{flexDirection: 'row',paddingLeft:-64}}>
                            <Text style={
                                [style.label,
                                {alignSelf: 'center', marginRight: 10}]
                                }>El inmueble es: </Text>
                            
                            
                            <Picker
                                style={style.internalPickerContainer}
                                
                                mode='dialog'
                                iosHeader="Select Type "
                                selectedValue={this.state.origen_inmueble}
                                onValueChange={this.handleOrigenInmueble}
                                //
                                itemStyle={[style.pickerIosListItemContainer]}
                                itemTextStyle={[style.pickerIosListItemText,{backgroundColor: 'red'}]}
                            >
                                <Picker.Item label="Seleccione una opción" value="null" />
                                <Picker.Item label="Propio" value="Propio" />
                                <Picker.Item label="Arrendado" value="Arrendado" />
                            </Picker>
                    </View>
                    <View style={{flexDirection: 'row',paddingLeft:-64}}>
                    <Text style={
                                [style.label,
                                {alignSelf: 'center', marginRight: 10}]
                                }>Tiene patio?</Text>
                   
                    <ButtonGroup
                        onPress={this.updateIndexTienePatio}
                        selectedIndex={this.state.tiene_patio}
                        buttons={response}
                        textStyle={style.txtbtngroup}
                        containerStyle={
                            style.buttongroup
                        }
                    />
                  


                    </View>

        </View>
                </ProgressStep>
                
                <ProgressStep label="Información Adicional" 
                nextBtnDisabled={false}
                previousBtnText="Anterior" 
                finishBtnText="Enviar" 
                previousBtnTextStyle={{
                    color: '#fff'
                }}
                previousBtnStyle={{
                    //padding: 10,
                    paddingHorizontal: 20,
                    backgroundColor: myTheme['color-warning-700'],
                    borderRadius: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                onSubmit={()=>{
                    if(this.validaInfoAdicional()){
                        Alert.alert('Advertencia','Existen campos vacios por completar.')
                    }
                    else{
                        this.setState({modalConfirm:true})
                        //this.sendSolicitud()
                    }
                    //this.sendSolicitud()
                }}
                nextBtnTextStyle={{
                    color: '#fff',
                    //textAlign: 'center',
                    //alignItems: 'center'
                }}
                nextBtnStyle={{
                    //padding: 10,
                    paddingHorizontal: 20,
                    backgroundColor: myTheme['color-success-600'],
                    borderRadius: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                >
                <View style={style.form}>
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 0}]
                                                }>Motivo de la adopción</Text>
                                <TextInput style = {[style.inputArea,{ borderColor: themedStyle.colors.primary,}]}
                            returnKeyType='next'
                            underlineColorAndroid = "transparent"
                            multiline={true}
                            numberOfLines={10}
                            textAlignVertical='top'
                            textAlign='left'
                            //placeholder = "Nombre de la mascota"
                            placeholderTextColor = {themedStyle.text.primary}
                            autoCapitalize = "none"
                            value={this.state.motivo}
                            onChangeText = {this.changeMotivo}/>
                            
                                
                                {/* <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                                        value={this.state.motivo}
                                        //returnKeyType='next'
                                        underlineColorAndroid = "transparent"
                                        //placeholder = ""
                                        
                                        placeholderTextColor = {themedStyle.text.primary}
                                        //autoCapitalize = "none"
                                        onChangeText = {this.changeMotivo}/> */}
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 10}]
                                                }>Cuántas personas conviven en casa?</Text>
                                            <Text style={
                                                [
                                                {alignItems: 'center', textAlign: 'center',
                                                marginTop: 10, 
                                                color: 'green',
                                                fontSize: 18
                                            }]
                                                }>{  this.state.numero_personas   }</Text>
                                    <Slider
                                        style={{flex:1, display: 'flex'}}
                                        minimumValue={this.state.value_ini}
                                        maximumValue={this.state.value_fin}
                                        minimumTrackTintColor="green"
                                        maximumTrackTintColor="red"
                                        value={this.state.numero_personas}
                                        onValueChange={(n)=>{
                                            this.setState({numero_personas:parseInt(n)})
                                        }}
                                    />
                                {/* <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                                        value={this.state.numero_personas}
                                        returnKeyType='next'
                                        underlineColorAndroid = "transparent"
                                        placeholder = ""
                                        
                                        placeholderTextColor = {themedStyle.text.primary}
                                        //autoCapitalize = "none"
                                        onChangeText = {this.changeConvivientes}/> */}
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'center', marginTop: 10}]
                                                }>¿En su hogar, están todos de acuerdo en adoptar una mascota?</Text>
                                    <View style={{alignItems: 'center'}}>
                                    <ButtonGroup
                                        onPress={this.updateIndexDeAcuerdo}
                                        selectedIndex={this.state.deacuerdo}
                                        buttons={response}
                                        textStyle={style.txtbtngroup}
                                        containerStyle={
                                            style.buttongroup
                                        }
                                    />
                                    </View>
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 10}]
                                                }>¿En su hogar, alguien es alérgico a los animales?</Text>
                                 <View style={{alignItems: 'center'}}>
                                 <ButtonGroup
                                        onPress={this.updateIndexAlergia}
                                        selectedIndex={this.state.alergia}
                                        buttons={response}
                                        textStyle={style.txtbtngroup}
                                        containerStyle={
                                            style.buttongroup
                                        }
                                    />
                                    </View>
                                {/* <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                                        value={this.state.alergia}
                                        returnKeyType='next'
                                        underlineColorAndroid = "transparent"
                                        placeholder = ""
                                        
                                        placeholderTextColor = {themedStyle.text.primary}
                                        //autoCapitalize = "none"
                                        onChangeText = {this.changeAlergia}/> */}
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 10}]
                                                }>¿La mascota gozará de espacio suficiente?</Text>
                            <View style={{alignItems: 'center'}}>
                            <ButtonGroup
                                        onPress={this.updateIndexTieneEspacio}
                                        selectedIndex={this.state.tiene_espacio}
                                        buttons={response}
                                        textStyle={style.txtbtngroup}
                                        containerStyle={
                                            style.buttongroup
                                        }
                                    />
                            </View>
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 10}]
                                                }>Cuánto tiempo pasará sola la mascota?</Text>
                                <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                                        value={this.state.tiempo_solo}
                                        returnKeyType='next'
                                        underlineColorAndroid = "transparent"
                                        placeholder = ""
                                        
                                        placeholderTextColor = {themedStyle.text.primary}
                                        //autoCapitalize = "none"
                                        onChangeText = {this.changeTiempoSolo}/>
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'center', marginTop: 10}]
                                                }>Cuenta con los recursos económicos necesarios para afrontar gastos de veterinaria?</Text>
                                   <View style={{alignItems: 'center'}}>
                                   <ButtonGroup
                                        onPress={this.updateIndexTieneRecursos}
                                        selectedIndex={this.state.tiene_recursos}
                                        buttons={response}
                                        textStyle={style.txtbtngroup}
                                        containerStyle={
                                            style.buttongroup
                                        }
                                    />
                                   </View>

                                   <Text style={
                                                [style.label,
                                                {alignSelf: 'center', marginTop: 10}]
                                                }>¿Está usted de acuerdo, en realizar el proceso de esterilización de la mascota?</Text>
                                   <View style={{alignItems: 'center'}}>
                                   <ButtonGroup
                                        onPress={this.updateIndexEsterilizar}
                                        selectedIndex={this.state.esterilizar}
                                        buttons={response}
                                        textStyle={style.txtbtngroup}
                                        containerStyle={
                                            style.buttongroup
                                        }
                                    />
                                   </View>
                                </View>
                                        
                </ProgressStep>
            </ProgressSteps>
            {/* <Button onPress={()=>this.viewDuplicate()}>
                ver duplicados
            </Button> */}
        </View>
                        

                        </KeyboardAwareScrollView>

                    
                    </ScrollView>
                )
            }
        }

        const style = StyleSheet.create({
            main: {
                flex:1
            },
            form:{
                paddingLeft: 25,
                paddingRight: 25
            },
            buttongroup:{
                height: 40,
                width: '40%',
                borderRadius:10,
                borderColor:myTheme['color-material-primary-400']
            },
            txtbtngroup:{
                fontSize: 14,
                color: myTheme['color-material-primary-400']
            },
            input:{
                //flex:1,
                //color: 'black',
                //fontSize: 15,
                //marginTop:10,
                //marginRight: 60,
                //paddingBottom:0,
                //height: 5
                //flex:1
                backgroundColor: myTheme['color-material-primary-100'],
                fontSize: 17,
                color: myTheme['color-primary-700'],
                //margin: 10,
                marginTop: 5,
            height: 35,
            width: '100%',
                margin:0,
                padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft:-64
            //textAlign: 'right'
            
            },
            inputDisable:{
                //backgroundColor: myTheme['color-primary-100'],
                fontSize: 17,
                color: '#999999',
                //margin: 10,
                marginTop: 5,
                height: 35,
                width: '100%',
                margin:0,
                padding: 5,
                borderWidth: 1,
                borderRadius: 5,
                paddingLeft:-64
                //textAlign: 'right'
            
            },
            inputArea:{
                //flex:1,
                //color: 'black',
                //fontSize: 15,
                //marginTop:10,
                //marginRight: 60,
                //paddingBottom:0,
                //height: 5
                //flex:1
                backgroundColor: myTheme['color-material-primary-100'],
                fontSize: 15,
                
                color: myTheme['color-primary-700'],
                //margin: 10,
                marginTop: 10,
            height: 150,
            width: '100%',
            
            borderWidth: 1,
            borderRadius: 10,
            textAlign: 'center'
            
            },
            boxinput:{
                //flex:1,
                flexDirection: 'row',
                //alignItems: 'center',
                justifyContent: 'space-around',
                //justifyContent: 'center',
                
                marginTop: '4%',
                
            },
            boxList:{
                //flex:1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                //justifyContent: 'center',
            
                //marginTop: '4%',
                
            },
            label:{
                fontSize: 18,
                //fontWeight: 'bold',
                color:myTheme['color-material-primary-600']
                
            },
            labelTitle:{
                fontSize: 18,
                marginTop: '3%',
                //fontWeight: 'bold',
                color:myTheme['color-material-primary-600']
                
            },
            pickerRaza:{
                flex:1,
                color: '#6D6D6D',
                backgroundColor: '#FFF',
                marginBottom: 20,
                alignItems: 'flex-end',
                
                color: myTheme['color-primary-700']
            },
            itemPickerRaza: {
                color: myTheme['color-primary-700'],
                textAlign: 'center',
                fontWeight: 'bold',
                
                
                //fontSize: 25
            },
            containerRaza: {
                minHeight: 228,
            },
            autocompleteRaza: {
                margin: 8,
            },
            rowContainer: {
                height: 64,
                flexDirection: 'row',
            // justifyContent: 'space-around',
                alignItems: 'center',
                //paddingLeft: 16,
                color: myTheme['color-primary-700']
            },
            internalPickerContainer: {
                flex: Platform.OS === 'ios' ? 1 : 1, // for Android, not visible otherwise.
                width: Platform.OS === 'ios' ? undefined : '50%',
                color: myTheme['color-material-primary-400'],
                //justifyContent: 'space-around',
                //fontSize: 18,
                //fontWeight: 'bold',
                borderWidth: 2,
                borderColor: 'black'
            },
            pickerIosListItemContainer: {
                flex: 1,
                height: 60,

                //width: '50%',
                //justifyContent: 'space-between',
                alignItems: 'center',
                color: myTheme['color-primary-700']
                
            },
            pickerIosListItemText: {
                fontSize: 20,
                fontWeight: 'bold',
                color: myTheme['color-primary-700']

            },
            titleAccordion:{
                //color: myTheme['color-primary-800'],
                fontWeight: 'bold',
                fontSize: 14
            
            },
            section:{
                //backgroundColor: myTheme['color-info-800']
            }
            
        })

        export default withStyles(PersonalInformation, myTheme => ({
            colors: {
            primary: myTheme['color-material-primary-300'],
            ligth: myTheme['color-material-primary-100'],
            icon: '#fff'
            },
            text: {
                primary: myTheme['color-material-primary-400']
            },
            progress: {
                primary: myTheme['color-success-500']
            }
        }));
