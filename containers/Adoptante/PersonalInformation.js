        import React, { Component } from 'react'
        import { Text, ScrollView,View, StyleSheet,TextInput, Picker, ImageBackground, Image, Alert, TouchableHighlight, TouchableOpacity} from 'react-native'

        import { SafeAreaView } from 'react-navigation'
        import { ButtonGroup, Icon, Overlay} from 'react-native-elements'
        import { RadioButton,Title,Headline, List, Checkbox  } from 'react-native-paper';
        import ButtonCustom from '../../components/ButtonCustom'
        import {myTheme} from '../../src/assets/styles/Theme'
        import {Autocomplete} from 'react-native-autocomplete-input'
        import { Layout, withStyles, Button } from 'react-native-ui-kitten';
        import ImagenPicker from '../../src/components/ImagePicker'
        import firebase from '@react-native-firebase/app'
        import auth from '@react-native-firebase/auth'
        import database from '@react-native-firebase/database'
        import storage from '@react-native-firebase/storage'
        import * as Progress from 'react-native-progress';
        import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
        import { Dialog } from 'react-native-simple-dialogs';
        import AlertCustom from '../../components/AlertCustom';
        import LoadingCustom from '../../components/LoadingCustom';
        import DatePicker from 'react-native-datepicker'
        import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';



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
                this.state = {
                    modalVisible: false,
                    idPet: idPet,
                    idFoundation: idFoundation,
                    idUser: idUser,
                    nombres: 'Jose Alejandro',
                    apellidos: 'Cruz Alvarado',
                    cedula: '0921839023',
                    celular: '0996802892',
                    fechanacimiento: '1999-01-01',
                    ocupacion: 'Programador',
                    correo: 'jose.cruzal@outlook.com',
                    estadocivil: 'soltero',


                    direccion: 'AV Las Mercedes',
                    referencia: 'Frente a Mecánica Automotríz',
                    telefono: '042 706 385',
                    tipo_inmueble: 'Casa',
                    origen_inmueble: 'Propio',
                    tiene_patio: 0,
                    motivo: 'Necesito una mascota de compañia',
                    numero_personas: 4,
                    
                    
                    deacuerdo: 0,
                    alergia: 'No nadie tiene alergias',
                    tiene_espacio: 0,
                    tiempo_solo: '1 hora por dia al menos',
                    tiene_recursos: 0,
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
                this.updateIndexDeAcuerdo = this.updateIndexDeAcuerdo.bind(this)
                this.updateIndexTieneEspacio = this.updateIndexTieneEspacio.bind(this)
                this.updateIndexTieneRecursos = this.updateIndexTieneRecursos.bind(this)

            
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

                if(status_pet) alert('Usted ya se encuentra en un proceso de adopción')
                else alert('vacio')
            }

            sendSolicitud = () =>{
                let refSolicitud= firebase.database().ref('solicitudes/'+this.state.idFoundation);
                   
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
                    has_patio: this.state.tiene_patio == 0 ? true : false,
                    adoption_reason: this.state.motivo.toUpperCase(),
                    cohabiting_number: this.state.numero_personas,
                    agreement: this.state.deacuerdo  == 0 ? true : false,
                    allergy: this.state.alergia.toUpperCase(),
                    space: this.state.tiene_espacio  == 0 ? true : false,
                    time_alone: this.state.tiempo_solo.toUpperCase(),
                    has_resources: this.state.tiene_recursos  == 0 ? true : false
                    //typepublish: typepublish
                }).then(()=>{
                   // setTimeout(() => {
                    //alert('Se ha enviado la solicitud')
                        this.setState({
                            //loadVisible: false,
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
            //alert(this.state.nombres)
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
                this.setState({numero_personas: parseInt(text)})
            }

            changeAlergia= (text) => {
                this.setState({alergia: text})
            }

            changeTiempoSolo= (text) => {
                this.setState({tiempo_solo: text})
            }

            setModalVisible(visible) {
                this.setState({modalVisible: visible});
            }
        

            updateIndexTienePatio (selectedIndex) {
                this.setState({tiene_patio: selectedIndex})
            }

            updateIndexDeAcuerdo (selectedIndex) {
                this.setState({deacuerdo: selectedIndex})
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


            

            render() {
                const {themedStyle} = this.props;

                const response = ['Si','No'];
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
        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                value={this.state.nombres}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Nombres"
                
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changeNombres}/>
        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                value={this.state.apellidos}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Apellidos"
                
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changeApellidos}/>
        <View style={[style.boxinput,{paddingLeft: -64}]}>
        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1, marginRight:10}]}
                value={this.state.cedula}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Cédula"
                maxLength={10}
                keyboardType='number-pad'
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changecedula}/>
        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1, }]}
                value={this.state.celular}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Telf. celular"
                maxLength={10}
                keyboardType='number-pad'
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changeCelular}/>
        </View>
        <View style={[style.boxinput,{paddingLeft: -64}]}>
        <Text style={[style.label,{alignSelf: 'center', marginRight: 10}]}>Fecha de Nacimiento</Text>

        <DatePicker
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
        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                value={this.state.ocupacion}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Ocupación"
                
                placeholderTextColor = {themedStyle.text.primary}
                //autoCapitalize = "none"
                onChangeText = {this.changeOcupacion}/>
        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                value={this.state.correo}
                returnKeyType='next'
                underlineColorAndroid = "transparent"
                placeholder = "Correo electrónico"
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
        </Picker>
        </View>


        </View>
                </ProgressStep>
                
                <ProgressStep label="Datos Domiciliarios" 
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



        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                        value={this.state.direccion}
                        returnKeyType='next'
                        underlineColorAndroid = "transparent"
                        placeholder = "Dirección"
                        
                        placeholderTextColor = {themedStyle.text.primary}
                        //autoCapitalize = "none"
                        onChangeText = {this.changeDireccion}/>
                    <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                        value={this.state.referencia}
                        returnKeyType='next'
                        underlineColorAndroid = "transparent"
                        placeholder = "Referencia"
                        
                        placeholderTextColor = {themedStyle.text.primary}
                        //autoCapitalize = "none"
                        onChangeText = {this.changeReferencia}/>
                    <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                        value={this.state.telefono}
                        returnKeyType='next'
                        underlineColorAndroid = "transparent"
                        placeholder = "Telf. domiciliario"
                        keyboardType='number-pad'
                        
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
                onSubmit={()=>this.sendSolicitud()}
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
                            
                                
                                <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                                        value={this.state.motivo}
                                        //returnKeyType='next'
                                        underlineColorAndroid = "transparent"
                                        //placeholder = ""
                                        
                                        placeholderTextColor = {themedStyle.text.primary}
                                        //autoCapitalize = "none"
                                        onChangeText = {this.changeMotivo}/>
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 10}]
                                                }>Cuántas personas conviven en casa?</Text>
                                <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                                        value={this.state.numero_personas.toString()}
                                        returnKeyType='next'
                                        underlineColorAndroid = "transparent"
                                        placeholder = ""
                                        
                                        placeholderTextColor = {themedStyle.text.primary}
                                        //autoCapitalize = "none"
                                        onChangeText = {this.changeConvivientes}/>
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'center', marginTop: 10}]
                                                }>Están todos de acuerdo en adoptar una mascota?</Text>
                                    <ButtonGroup
                                        onPress={this.updateIndexDeAcuerdo}
                                        selectedIndex={this.state.deacuerdo}
                                        buttons={response}
                                        textStyle={style.txtbtngroup}
                                        containerStyle={
                                            style.buttongroup
                                        }
                                    />
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 10}]
                                                }>Alguien es alérgico a los animales?</Text>
                                <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                                        value={this.state.alergia}
                                        returnKeyType='next'
                                        underlineColorAndroid = "transparent"
                                        placeholder = ""
                                        
                                        placeholderTextColor = {themedStyle.text.primary}
                                        //autoCapitalize = "none"
                                        onChangeText = {this.changeAlergia}/>
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 10}]
                                                }>El animalito gozará de espacio suficiente?</Text>
                            <ButtonGroup
                                        onPress={this.updateIndexTieneEspacio}
                                        selectedIndex={this.state.tiene_espacio}
                                        buttons={response}
                                        textStyle={style.txtbtngroup}
                                        containerStyle={
                                            style.buttongroup
                                        }
                                    />
                                <Text style={
                                                [style.label,
                                                {alignSelf: 'flex-start', marginTop: 10}]
                                                }>Cuánto tiempo solo pasará el animalito?</Text>
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
                marginTop: 15,
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
                color:myTheme['color-material-primary-400']
                
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
