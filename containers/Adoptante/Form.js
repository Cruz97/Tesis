import React, { Component } from 'react'
import { Text, ScrollView,View, StyleSheet,TextInput, Picker, ImageBackground, Image, Alert, TouchableHighlight, TouchableOpacity} from 'react-native'

import { SafeAreaView } from 'react-navigation'
import { ButtonGroup, Icon, Overlay} from 'react-native-elements'
import { RadioButton,Title,Headline, List, Checkbox  } from 'react-native-paper';
import ButtonCustom from '../../components/ButtonCustom'
import {myTheme} from '../../src/assets/styles/Theme'
import {Autocomplete} from 'react-native-autocomplete-input'
import { Layout, withStyles } from 'react-native-ui-kitten';
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



export class Form extends Component {

    static navigationOptions = {
        title: 'Formulario de Adopción',
        hideRightComponent: 'hide'
    }

    constructor(props){
        super(props)
       
      

        this.state = {
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
            tiene_patio: '',
            expanded: false,
            expanded2: false,
            expanded3: true,
            selectedIndexGender: -1,
            selectedIndexType: -1,
            motivo: '',
            numeroconvivientes: '',
            
            
            date: '2020-01-01'

          }
          this.updateIndexGender = this.updateIndexGender.bind(this)
          this.updateIndexType = this.updateIndexType.bind(this)
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


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
  

    updateIndexGender (selectedIndexGender) {
        this.setState({selectedIndexGender})
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
      

    render() {
        const {themedStyle} = this.props;

       const response = ['Si','No'];
        const buttonsGender = ['Hembra', 'Macho']
        const buttonsType = ['Canina', 'Felina']
        const { selectedIndexGender } = this.state
        const { selectedIndexType } = this.state
        return (
            <ScrollView style={style.main}>
              
        
                <KeyboardAwareScrollView>
                <View style={style.form}>
                <List.Section style={
                    {
                        backgroundColor: this.state.expanded ? '#fff' : myTheme['color-info-800'],
                        borderRadius: 10
                        }}
                        
                        >

                    <List.Accordion
                    title=" DATOS PERSONALES"
                    theme={{
                        colors:{
                            text: this.state.expanded ? myTheme['color-info-800']: '#fff'
                        }
                    }}
                    titleStyle={[style.titleAccordion,{color: this.state.expanded ? myTheme['color-info-800']: '#fff'}]}
                    left={props => <List.Icon {...props} icon="account-circle" color={this.state.expanded ? myTheme['color-info-800']: '#fff'} />}
                    
                    
                    expanded={this.state.expanded}
                    onPress={this._handleExpand}
                    
                    >
                   
                  
                       
                        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = "Nombres"
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeNombres}/>
                         <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = "Apellidos"
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeApellidos}/>
                        <View style={[style.boxinput,{paddingLeft: -64}]}>
                         <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1, marginRight:10}]}
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = "Cédula"
                                maxLength={10}
                                keyboardType='number-pad'
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changecedula}/>
                        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1, }]}
                                value={this.state.name}
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
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = "Ocupación"
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeOcupacion}/>
                        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                                value={this.state.name}
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
                       <Text style={[style.label,{alignSelf: 'center', marginRight: 10}]}>Estado Civil</Text>
                     
                    
                    <Picker
                        style={style.internalPickerContainer}
                        
                        mode='dialog'
                        iosHeader="Select Type "
                        selectedValue={this.state.typepublish}
                        onValueChange={this.handleTypePublish}
                        //
                        itemStyle={[style.pickerIosListItemContainer]}
                        itemTextStyle={[style.pickerIosListItemText,{backgroundColor: 'red'}]}
                    >
                        <Picker.Item label="Seleccione su estado civil" value="null" />
                        <Picker.Item label="Soltero" value="soltero" />
                        <Picker.Item label="Casado" value="casado" />
                    </Picker>
                    </View>

                      
                       
                    
                    </List.Accordion>
                </List.Section>

                <List.Section style={
                    {
                        backgroundColor: this.state.expanded2 ? '#fff' : myTheme['color-info-800'],
                        borderRadius: 10
                        }}
                        
                        >

                    <List.Accordion
                    title=" DATOS DOMICILIARIOS"
                    theme={{
                        colors:{
                            text: this.state.expanded2 ? myTheme['color-info-800']: '#fff'
                        }
                    }}
                    titleStyle={[style.titleAccordion,{color: this.state.expanded2 ? myTheme['color-info-800']: '#fff'}]}
                    left={props => <List.Icon {...props} icon="home" color={this.state.expanded2 ? myTheme['color-info-800']: '#fff'} />}
                    
                    
                    expanded={this.state.expanded2}
                    onPress={this._handleExpand2}
                    
                    >
                          <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = "Dirección"
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeDireccion}/>
                            <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = "Referencia"
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeReferencia}/>
                            <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                                value={this.state.name}
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
                                        selectedValue={this.state.typepublish}
                                        onValueChange={this.handleTypePublish}
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
                                        selectedValue={this.state.typepublish}
                                        onValueChange={this.handleTypePublish}
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
                                onPress={this.updateIndexGender}
                                selectedIndex={selectedIndexGender}
                                buttons={response}
                                textStyle={style.txtbtngroup}
                                containerStyle={
                                    style.buttongroup
                                }
                            />


                            </View>
                                   





                    </List.Accordion>
                
                </List.Section>








                <List.Section style={
                    {
                        backgroundColor: this.state.expanded3 ? '#fff' : myTheme['color-info-800'],
                        borderRadius: 10
                        }}
                        
                        >

                    <List.Accordion
                    title="INFORMACIÓN COMPLEMENTARIA"
                    theme={{
                        colors:{
                            text: this.state.expanded3 ? myTheme['color-info-800']: '#fff'
                        }
                    }}
                    titleStyle={[style.titleAccordion,{color: this.state.expanded3 ? myTheme['color-info-800']: '#fff'}]}
                    left={props => <List.Icon {...props} icon="info" color={this.state.expanded3 ? myTheme['color-info-800']: '#fff'} />}
                    
                    
                    expanded={this.state.expanded3}
                    onPress={this._handleExpand3}
                    
                    >
                        <View style={{paddingLeft: -64}}>
                        <Text style={
                                        [style.label,
                                        {alignSelf: 'flex-start', marginTop: 0}]
                                        }>Motivo de la adopción</Text>
                       
                        
                          <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = ""
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeDireccion}/>
                        <Text style={
                                        [style.label,
                                        {alignSelf: 'flex-start', marginTop: 10}]
                                        }>Cuántas personas conviven en casa?</Text>
                        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,flex:1}]}
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = ""
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeReferencia}/>
                        <Text style={
                                        [style.label,
                                        {alignSelf: 'center', marginTop: 10}]
                                        }>Están todos de acuerdo en adoptar una mascota?</Text>
                            <ButtonGroup
                                onPress={this.updateIndexGender}
                                selectedIndex={selectedIndexGender}
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
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = ""
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeReferencia}/>
                         <Text style={
                                        [style.label,
                                        {alignSelf: 'flex-start', marginTop: 10}]
                                        }>El animalito gozará de espacio suficiente?</Text>
                       <ButtonGroup
                                onPress={this.updateIndexGender}
                                selectedIndex={selectedIndexGender}
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
                                value={this.state.name}
                                returnKeyType='next'
                                underlineColorAndroid = "transparent"
                                placeholder = ""
                                
                                placeholderTextColor = {themedStyle.text.primary}
                                //autoCapitalize = "none"
                                onChangeText = {this.changeReferencia}/>
                         <Text style={
                                        [style.label,
                                        {alignSelf: 'center', marginTop: 10}]
                                        }>Cuenta con los recursos económicos necesarios para afrontar gastos de veterinaria?</Text>
                            <ButtonGroup
                                onPress={this.updateIndexGender}
                                selectedIndex={selectedIndexGender}
                                buttons={response}
                                textStyle={style.txtbtngroup}
                                containerStyle={
                                    style.buttongroup
                                }
                            />
                         </View>
                                
                            
                                   





                    </List.Accordion>
                
                </List.Section>
                
                        

                   
                   <View style={{marginVertical: 10, alignItems: 'center'}}>
                   {/* <Progress.Bar 
                   progress={this.state.uploadValue}  
                   width={320}  
                   height={10}
                   color={themedStyle.progress.primary}
                   /> */}
                   {/* <Progress.Circle size={120} progress={this.state.uploadValue} indeterminate={false} /> */}
                   {/* <Progress.Pie progress={this.state.uploadValue} size={70} /> */}
                   </View>

                </View>
                <View style={{alignItems: 'center', width: '100%'}}>
                   <ButtonCustom  
                            title="Adoptar"
                            icon = {
                                <Icon name='send' size={20} color={themedStyle.colors.icon} />
                            }
                            //iconName='send'
                            colorcustom={myTheme['color-success-600']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 20,
                                    width: 200,
                                    marginBottom: 20   

                                
                                }}
                            onPress={()=>{
                              // alert(this.state.images.length)
                             //this.uploadImage()  ;
                             this.savePetPublish()
                              //this.setModalVisible(true) 
                            }}
                            
                           />
                           {/* <Image
                                style={{ width: 150, height: 150, borderRadius: 10 }}
                                resizeMode={'cover'}
                                source={{ uri: this.state.pictureUrl }}
                                /> */}
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

export default withStyles(Form, myTheme => ({
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
