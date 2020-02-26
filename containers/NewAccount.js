import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Alert, CheckBox, Picker,TouchableOpacity } from 'react-native'
import { Icon, Input} from 'react-native-elements';
import {ButtonCustom} from '../components/index'
import {  withStyles } from 'react-native-ui-kitten';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import {myTheme} from '../src/assets/styles/Theme'
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DatePicker from 'react-native-datepicker'
import RNPicker from "search-modal-picker";

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: 'https://adopcionpets.page.link',
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

export class NewAccount extends Component {
    static navigationOptions = {
        title: 'Registrarse',
        back: true
        //header: null
    }

    constructor(props){
        super(props);

        this.state={
            uid: '',
            // cedula: '0921839023',
            // nombres: 'Jose Alejandro',
            // fechanacimiento: '1997-01-01',
            // apellidos: 'Cruz Alvarado',
            // telefono: '0996802892',
            // telefono_convencional: '042706385',
            // correo: 'jose.cruzal@outlook.com',
            // contrasena: 'Barce@97',
            // estadocivil: '',
            // direccion: 'Isidro Ayora - Via a Las mercedes',
            // contrasena2: 'Barce@97',
            // referencia: 'Entre callejon S/N a lado de Lubricadora',
            cedula: '',
            nombres: '',
            fechanacimiento: '1980-01-01',
            apellidos: '',
            telefono: '',
            telefono_convencional: '',
            correo: '',
            contrasena: '',
            estadocivil: '',
            direccion: '',
            contrasena2: '',
            referencia: '',
            alertCedula: false,
            alertNombres: false,
            alertApellidos: false,
            alertTelefono: false,
            alertTelefonoConvencional: false,
            alertCorreo: false,
            alertContrasena: false,
            alertContrasena2: false,
            alertDireccion: false,
            alertReferencia: false,
            alertOcupation: false,

            showPassword: false,
            acceptTerms: false,

            existUser: false,

            dataSource: [],
            dataEstadoCivil: [
              {
                id: "0",
                name: "Ninguno"
              },
              {
                id: "1",
                name: "Soltero"
              },
              {
                id: "2",
                name: "Casado"
              },
              {
                id: "3",
                name: "Divorciado"
              },
              {
                id: "4",
                name: "Viudo"
              }
            ],
            placeHolderText: "Seleccione una ocupación",
            selectedText: "",
            placeHolderTextEstadoCivil: "Seleccione un estado civil",
            selectedEstadoCivil: ""
            
        }
    }

    getInitialState() {
        return {
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
      }

      _selectedValue(index, item) {
        //alert(item.name)
        if(item.name == ""){
          this.setState({ alertOcupation: true });
          return;
        }
        this.setState({ selectedText: item.name, alertOcupation: false });
      }

      _selectedValueEstadoCivil(index, item) {
        //alert(item.name)
        if(item.name == ""){
          this.setState({ alertEstadoCivil: true });
          return;
        }
        this.setState({ selectedEstadoCivil: item.name, alertEstadoCivil: false });
      }
      
      onRegionChange(region) {
        this.setState({ region });
      }

    handleCedula = (text) => {
      let reg = /([^0-9])/g.test(text)
      if(!reg) this.setState({cedula:text})
      //this.setState({cedula: text})
    }

    onBlurCedula = (text) => {
      alert(text)
     
    }

    handleName = (text) => {
      if(this.validateOnlyText(text))
        this.setState({nombres: text,alertNombres: false})
      else 
        {
          this.setState({alertNombres: true})
          //return 
        }
        
    }
    handleLastName = (text) => {
      if(this.validateOnlyText(text))
        this.setState({apellidos: text, alertApellidos: false})
      else 
      {
        this.setState({alertApellidos: true})
      }
        //return 
      }

      handleAddress = (text) => {
        
          this.setState({direccion: text,alertDireccion: false})
        
          //return 
        }

        handleReference = (text) => {
        
          this.setState({referencia: text,alertReferencia: false})
        
          //return 
        }


      handlePhone = (text) => {
        let reg = /([^0-9])/g.test(text)
        if(!reg) this.setState({telefono:text})
          //return 
        }
      
      handleTelephone = (text) => {
          let reg = /([^0-9])/g.test(text)
          if(!reg) this.setState({telefono_convencional:text})
            //return 
          }

    handleEmail = (text) => this.setState({correo: text})

    handlePassword = (text) => { 
      this.setState({contrasena: text, alertContrasena: false})
    }
    handlePassword2 = (text) => {
      this.setState({contrasena2: text, alertContrasena2: false})
    }

    handleEstadoCivil = (estado) => {
      this.setState({
          estadocivil: estado
      })
  }


    validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validateCedula = (cedula) => {
      var re = /^([0-9]{10})$/;
        return re.test(cedula);
    };

    validateOnlyText = (text) => {
      var re = /^[a-zA-Z\s]*$/;
        return re.test(text);
    };

    validateOnlyNumber = (text) => {
      var re = /^([0-9\s]{10})*$/;
        return re.test(text);
    };

    validateTelephone = (text) => {
      var re = /^([0-9\s]{9})*$/;
        return re.test(text);
    };

    // validatePassword = (text) => {
    //   var re = /^[a-zA-Z0-9(){}°!"#$%&/=?¡*¨_:\[\]]{8,20}$/gm
    //   return re.test(text)
    // }
    validatePassword = (contrasenna) =>
		{
			if(contrasenna.length >= 8)
			{		
				var mayuscula = false;
				var minuscula = false;
				var numero = false;
				var caracter_raro = false;
				
				for(var i = 0;i<contrasenna.length;i++)
				{
					if(contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90)
					{
						mayuscula = true;
					}
					else if(contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122)
					{
						minuscula = true;
					}
					else if(contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57)
					{
						numero = true;
					}
					else
					{
						caracter_raro = true;
					}
				}
				if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true)
				{
					return true;
				}
			}
			return false;
    }
    

    existAlert = () => {
      if(
        this.state.alertCedula == false && 
        this.state.alertNombres == false && 
        this.state.alertApellidos == false && 
        this.state.alertTelefono == false && 
        this.state.alertTelefonoConvencional == false && 
        this.state.alertDireccion == false && 
        this.state.alertReferencia == false && 
        this.state.alertCorreo == false && 
        this.state.alertContrasena == false && 
        this.state.alertContrasena2 == false) return false
       return true
    }


    moveCaretAtEnd(e) {
      var temp_value = e.target.value
      e.target.value = ''
      e.target.value = temp_value
    }

    createUser = () => {

      if(!this.state.acceptTerms){
        // if(!this.existAlert()) alert('no hay alertas')
        Alert.alert('Importante!','Por favor acepte los Términos y condiciones de AdopcionPG');
        return;
      }

        const card_identification = this.state.cedula;
        const phone_mobile = this.state.telefono;
        const address = this.state.direccion;
        const marital_status = this.state.selectedEstadoCivil;
        const email = this.state.correo;
        const password = this.state.contrasena;
        const password2 = this.state.contrasena2;
        const name = this.state.nombres;
        const lastname = this.state.apellidos;
        const date_of_birth = this.state.fechanacimiento;
        const reference = this.state.referencia;
        const phone_conventional = this.state.telefono_convencional;
        const ocupation = this.state.selectedText;

        if((name == '' || lastname == '' || email == '' || password == '' 
        || card_identification === '' || date_of_birth === '1980-01-01' || phone_mobile === ''
        || phone_conventional === '' || address === '' || reference === '' || marital_status === ''
        || ocupation === '' || password2 === ''
        )||
        (this.state.alertCedula === true || 
          this.state.alertNombres === true|| 
          this.state.alertApellidos === true ||
          this.state.alertTelefono === true || 
          this.state.alertTelefonoConvencional === true  || 
          this.state.alertDireccion === true || 
          this.state.alertReferencia === true || 
          this.state.alertCorreo === true ||
          this.state.alertContrasena === true || 
          this.state.alertContrasena2 === true 
          ))
          {
            Alert.alert('Información Requerida', 'Por favor ingrese toda la información')
            //this.props.navigation.navigate('RegisterSuccessfull')
            return
        }


        firebase.auth().createUserWithEmailAndPassword(
            email, password
        ).then(userCredentials => {
            //Si es un nuevo usuario
            if(userCredentials.additionalUserInfo.isNewUser){
                //Se guarda en la DB Real Time
                let uid = userCredentials.user.uid;
                let refUser = firebase.database().ref('usuarios/'+uid)
    
                //Crea un objeto usuario sino existe, y si existe modifica sus campos
                refUser.set({
                    // username: 'Josecruz',
                    
                    card_identification,
                    name,
                    lastname,
                    phone_mobile,
                    phone_conventional,
                    address,
                    reference,
                    marital_status,
                    date_of_birth,
                    email: userCredentials.user.email,
                    photo: userCredentials.user.photoURL,
                    phone: userCredentials.user.phoneNumber,
                    displayName: userCredentials.user.displayName,
                    typeUser: 'adopter',
                    ocupation
                    

                    
                  }).then(()=>{
                    //firebase.auth().sen
                    // firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
                    // .then(() => {
                    //     alert('Se ha enviado el correo de verificacion')
                    //   // Construct email verification template, embed the link and send
                    //   // using custom SMTP server.
                    //   //return sendCustomVerificationEmail(useremail, displayName, link);
                    // })
                    // .catch((error) => {
                    //   alert('error: '+error.message)
                    // });
                  
                    this.props.navigation.navigate('RegisterSuccessfull')
                    //   firebase.auth().signInWithEmailAndPassword(
                    //       userCredentials.user.email,
                    //       this.state.contrasena
                    //   ).then(user =>{
                    //     //   alert(JSON.stringify(user,null,4))
                          
                    //   }).catch(error => {
                    //       alert(error.message)

                    //   })

                      //alert('Usuario creado en la BD Real Time')
                  }).catch(error =>{
                      alert('Ocurrio algo '+JSON.stringify(error.message,null,4))
                  });

            }

            // let uid = userCredentials.user.uid
            // alert(JSON.stringify(userCredentials.additionalUserInfo,null,4))
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let mensaje = ''
            switch(errorCode){
              case 'auth/email-already-in-use':
                mensaje = 'Ya existe una cuenta con ésta dirección de correo electrónico'
                break;
              case 'auth/invalid-email':
                mensaje = 'La dirección de correo electrónico no es válida.'
                break;
              case 'auth/operation-not-allowed':
                mensaje = 'La cuenta de correo electrónico / contraseña no están habilitadas';
                break;
              case 'auth/weak-password':
                mensaje = 'La contraseña no es lo suficientemente segura';
                break;
              default:
                mensaje = 'Ha ocurrido un error'
      }
      Alert.alert('Error al registrar', mensaje)
        })
    }


    componentDidMount(){
      let refOcupaciones = firebase.database().ref('ocupaciones');
      refOcupaciones.on('value',(snapshot)=>{
        var ocupaciones = [];
        ocupaciones.push({id: "0", name: "OTRO"})
        snapshot.forEach((child)=>{
            
            ocupaciones.push({id: child.key, name: child.val()})
        })
        this.setState({dataSource: ocupaciones})
        //alert(JSON.stringify(ocupaciones,null,4))
      })
    }

    

    existeUsuario = (cedula) => {
      this.setState({existUser: false})
      let refUsuario = firebase.database().ref('usuarios');
      refUsuario.on('value',(snapshot)=>{
        snapshot.forEach((childUser)=>{
          let user = childUser.val();
          if(user.typeUser === 'adopter'){
            if(user.card_identification === cedula){
              this.setState({existUser: true})
            }
          }
        })
      })
    }

    render() {
      const {themedStyle} = this.props;
      const msgRequirePassword  = 'La contraseña debe cumplir los siguientes requisitos: \n-Mínimo 8 carácteres\n-Letras mayúsculas\n-Letras minúsculas\n-Números\n-Caracteres especiales como: @$!#/)..etc, ';

        return (
            <View style={style.main}>
                {/* <View style={style.boxlogo}>
                        <Image source={require('../assets/img/img_menu.jpeg')} style={style.logo}/>
                    </View> */}
                    <KeyboardAwareScrollView>
                <View style={style.form}>
                <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Nombres
                         </Text>
                </View>

                
                        
                <Input 
                        //placeholder=' Nombres'
                        keyboardType='ascii-capable'
                        // secureTextEntry={true}
                        value={this.state.nombres}
                        onChangeText={this.handleName}
                        placeholderTextColor={myTheme['color-material-primary-400']}
                        onBlur={(e)=>{
                          this.handleName(this.state.nombres)
                        }}
                        inputStyle={
                            style.input
                        }
                        />
                        <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertNombres ? 'flex' : 'none'}}>
                          El Campo Nombre no permite números, caracteres especiales o tíldes
                        </Text>
                        <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'5%',
                            marginRight:'5%',
                            
                          }}>
                           Apellidos
                         </Text>
                </View>
                <Input
                        //placeholder=' Apellidos'
                        keyboardType='ascii-capable'
                        // secureTextEntry={true}
                        value={this.state.apellidos}
                        onChangeText={this.handleLastName}
                        placeholderTextColor={myTheme['color-material-primary-400']}
                        onBlur={(e)=>{
                          this.handleLastName(this.state.apellidos)
                        }}
                        inputStyle={
                            style.input
                        }
                        
                        />
                        <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertApellidos ? 'flex' : 'none'}}>
                          El Campo Apellidos no permite números, caracteres especiales o tíldes
                        </Text>

                       {/* <View style={{flexDirection:'row', marginLeft: '5%', marginRight: '2%', marginVertical: '1%', justifyContent: 'center', alignItems: 'center'}}> */}
                       {/* <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}> */}

                {/* </View> */}
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      {/* <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}> */}

                {/* </View> */}
                      <View style={{flex:1, marginLeft: '2%'}}>
                      <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                            fontSize: 17,
                            marginTop:'5%',
                            marginRight:'5%'
                          }}>
                           Cédula
                         </Text>
                        
                      <Input
                        //placeholder=' Cédula'
                        keyboardType='number-pad'
                        maxLength={10}
                        value={this.state.cedula}
                        onChangeText={this.handleCedula.bind(this)}
                        placeholderTextColor={myTheme['color-material-primary-400']}
                        
                        containerStyle={{
                          flex:1
                        }}
                        inputStyle={
                            {
                              //flex:1,
                              //width: 150
                            }
                        }
                        onBlur = {
                          ()=>
                         {
                          if(this.state.cedula.length > 0){
                            if (!this.validateCedula(this.state.cedula)) {
                              this.setState({cedula: this.state.cedula, alertCedula: true})
                              
                            } else {
                              this.existeUsuario(this.state.cedula)
                              this.setState({alertCedula: false })
                            }
                          }
                         }
                        }
                        />
                      </View>
                        
                        
                         <View style={{alignItems: 'center', flex:1}}>
                         <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                            fontSize: 17,
                            marginTop:'5%',
                            marginRight:'5%'
                          }}>
                           Fecha de Nacimiento
                         </Text>
                      <DatePicker
                          style={{
                              flex:1,
                              //marginTop: '5%',
                              
                          }}
                          customStyles={{
                              dateInput:{
                                  width: '100%',
                                  backgroundColor: myTheme['color-material-primary-100'],
                              borderRadius: 5,
                              color: themedStyle.colors.primary,
                              borderColor: themedStyle.colors.primary,
                              marginTop: 5   
                              },
                              dateText:{
                                  width: '100%',
                                  color: '#000',
                                  marginLeft: 5,
                                  fontSize: 17,
                                 
                                  
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
                                  marginTop: 5,
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
                       
                      </View>
                      <Text style={{
                          textAlign:'center', 
                          marginTop:5,
                          color: 'red', 
                          display: this.state.alertCedula ? 'flex' : 'none'}}>
                          La cédula no es válida
                        </Text>

                      
                         
                       
                       {/* </View> */}
                <View style={{flexDirection: 'row', marginTop: '5%', }}>
                <View style={{
                  flex:1,
                  flexDirection: 'column',
                 
                }}>
                 <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Teléfono Móvil
                         </Text>
                </View>
                <Input
                //placeholder=' Teléfono Móvil'
                keyboardType='phone-pad'
                maxLength={10}
                value={this.state.telefono}
                onChangeText={this.handlePhone.bind(this)}
                placeholderTextColor={myTheme['color-material-primary-400']}
                containerStyle={{
                  flex:1
                }}
                onBlur = {
                  ()=>
                 {
                  if (!this.validateOnlyNumber(this.state.telefono)) {
                    this.setState({telefono: this.state.telefono, alertTelefono: true})
                    
                  } else {
                    this.setState({alertTelefono: false })
                  }
                 }
                }

                inputStyle={
                    style.input
                }
                
                />
                <Text style={{
                  textAlign:'center', 
                  color: 'red', 
                  display: this.state.alertTelefono ? 'flex' : 'none'}}>
                  El Campo Teléfono Móvil debe tener 10 dígitos
                </Text>
                </View>


                <View style={{
                  flex:1,
                  flexDirection: 'column'
                  }}>
                      <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Telf Convencional
                         </Text>
                </View>
                <Input
                //placeholder=' Teléfono Convencional'
                keyboardType='phone-pad'
                maxLength={10}
                value={this.state.telefono_convencional}
                onChangeText={this.handleTelephone.bind(this)}
                placeholderTextColor={myTheme['color-material-primary-400']}
                containerStyle={{
                  flex:1
                }}
                onBlur = {
                  ()=>
                 {
                  if (!this.validateTelephone(this.state.telefono_convencional)) {
                    this.setState({telefono_convencional: this.state.telefono_convencional, alertTelefonoConvencional: true})
                    
                  } else {
                    this.setState({alertTelefonoConvencional: false })
                  }
                 }
                }

                inputStyle={
                    style.input
                }
                
                />
                <Text style={{
                  textAlign:'center', 
                  color: 'red', 
                  display: this.state.alertTelefonoConvencional ? 'flex' : 'none'}}>
                  El Campo Teléfono Convencional debe tener 10 dígitos
                </Text>
                </View>
                </View>
                <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Dirección
                         </Text>
                </View>

                        
                <Input
                        //placeholder=' Dirección del domicilio'
                        keyboardType='ascii-capable'
                        maxLength={150}
                        value={this.state.direccion}
                        onChangeText={this.handleAddress}
                        placeholderTextColor={myTheme['color-material-primary-400']}
                        onBlur={(e)=>{               
                       }}
                        inputStyle={
                            style.input
                        }
                       
                        />
                        <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertDireccion ? 'flex' : 'none'}}>
                          Ingrese la dirección de su domicilio
                        </Text>
                        <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Referencia
                         </Text>
                </View>
                        <Input
                        //placeholder=' Referencia del domicilio'
                        keyboardType='ascii-capable'
                        maxLength={150}
                        value={this.state.referencia}
                        onChangeText={this.handleReference}
                        placeholderTextColor={myTheme['color-material-primary-400']}
                        onBlur={(e)=>{               
                       }}
                        inputStyle={
                            style.input
                        }
                       
                        />
                        <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertReferencia ? 'flex' : 'none'}}>
                          Ingrese la referencia de su domicilio
                        </Text>

                {/* <Picker
                style={[style.internalPickerContainer,{marginTop:10}]}
                mode='dialog'
                iosHeader="Select Type "
                selectedValue={this.state.estadocivil}
                onValueChange={this.handleEstadoCivil}
                itemStyle={[style.pickerIosListItemContainer]}
                itemTextStyle={[style.pickerIosListItemText,{backgroundColor: 'red'}]}
                >
                  <Picker.Item label="Seleccione su Estado Civil" value="null" />
                  <Picker.Item label="* Soltero" value="soltero" />
                  <Picker.Item label="* Casado" value="casado" />
                  <Picker.Item label="* Divorciado" value="divorciado" />
                  <Picker.Item label="* Viudo" value="viudo" />
                </Picker> */}
                <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginTop:'7%' ,marginVertical: '1%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'center',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Estado Civil
                         </Text>
                </View>

                <RNPicker
                  dataSource={this.state.dataEstadoCivil}
                  ///dummyDataSource={this.state.dataSource}
                  defaultValue={false}
                  pickerTitle={"Estado Civil"}
                  //showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={"none"}
                  searchBarPlaceHolder={"Buscar....."}
                  showPickerTitle={true}
                  searchBarContainerStyle={this.props.searchBarContainerStyle}
                  pickerStyle={Styles.pickerStyle}
                  pickerItemTextStyle={Styles.listTextViewStyle}
                  selectedLabel={this.state.selectedEstadoCivil}
                  placeHolderLabel={this.state.placeHolderTextEstadoCivil}
                  selectLabelTextStyle={Styles.selectLabelTextStyle}
                  placeHolderTextStyle={Styles.placeHolderTextStyle}
                  dropDownImageStyle={Styles.dropDownImageStyle}
                  //dropDownImage={require("./res/ic_drop_down.png")}
                  selectedValue={(index, item) => this._selectedValueEstadoCivil(index, item)}
                />
                
                <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginTop: '7%', marginVertical: '1%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'center',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Ocupación
                         </Text>
                </View>
               

                <RNPicker
                  dataSource={this.state.dataSource}
                  ///dummyDataSource={this.state.dataSource}
                  defaultValue={false}
                  pickerTitle={"Ocupaciones"}
                  showSearchBar={true}
                  disablePicker={false}
                  changeAnimation={"none"}
                  searchBarPlaceHolder={"Buscar....."}
                  showPickerTitle={true}
                  searchBarContainerStyle={this.props.searchBarContainerStyle}
                  pickerStyle={Styles.pickerStyle}
                  pickerItemTextStyle={Styles.listTextViewStyle}
                  selectedLabel={this.state.selectedText}
                  placeHolderLabel={this.state.placeHolderText}
                  selectLabelTextStyle={Styles.selectLabelTextStyle}
                  placeHolderTextStyle={Styles.placeHolderTextStyle}
                  dropDownImageStyle={Styles.dropDownImageStyle}
                  //dropDownImage={require("./res/ic_drop_down.png")}
                  selectedValue={(index, item) => this._selectedValue(index, item)}
                />

            <Text style={{
                  textAlign:'center', 
                  color: 'red', 
                  display: this.state.alertOcupation ? 'flex' : 'none'}}>
                  Seleccione una ocupación
                </Text>

                <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Correo Electrónico
                         </Text>
                </View>

                <Input
                        //placeholder=' Correo Electrónico'
                        keyboardType='email-address'
                        value={this.state.correo}
                        onChangeText={this.handleEmail}
                        placeholderTextColor={myTheme['color-material-primary-400']}
                        onBlur = {
                          ()=>
                         {
                          if(this.state.correo.length > 0){
                            if (!this.validateEmail(this.state.correo)) {
                              this.setState({ alertCorreo: true})
                            }
                            else{
                              this.setState({alertCorreo: false})
                            }
                          }
                         }
                        }
                          
                        inputStyle={
                            style.input
                        }
                        />
                        <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertCorreo ? 'flex' : 'none'}}>
                          El correo ingresado no es válido
                        </Text>

                        <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Contraseña
                         </Text>
                </View>

                   <View style={{flexDirection: 'row', alignItems: 'center', marginRight: '10%'}}>
                   <Input
                    //placeholder=' Contraseña'
                    secureTextEntry={!this.state.showPassword}
                    value={this.state.contrasena}
                    onChangeText={this.handlePassword}
                    placeholderTextColor={myTheme['color-material-primary-400']}
                    
                    onBlur = {
                      ()=>
                     {
                      if(this.state.contrasena.length > 0){
                        if (!this.validatePassword(this.state.contrasena)) {
                          this.setState({alertContrasena: true})
                          
                        }
                        else{
                          this.setState({alertContrasena: false})
                        }
                        
                      }
                      else{
                        this.setState({alertContrasena: false})
                      }
                     }
                    }
                    
                    inputStyle={
                        style.input
                    }
                    />
                    <TouchableOpacity style={{}} onPress={()=>{this.setState({showPassword: !this.state.showPassword})}} >
                      <Icon 
                        name='remove-red-eye'
                        size={30}
                        color={this.state.showPassword ? myTheme['color-material-primary-700'] : myTheme['color-material-primary-400']}
                      />

                    </TouchableOpacity  >
                   </View>
                        <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertContrasena ? 'flex' : 'none'}}>
                            {
                              msgRequirePassword
                            }
                        </Text>
                        <View style={{flexDirection:'row', marginLeft: '2%', marginRight: '2%', marginVertical: '0%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                          flex:1,
                           color: myTheme['color-material-primary-400'],
                           textAlign: 'left',
                            fontSize: 17,
                            marginTop:'3%',
                            marginRight:'5%',
                            
                          }}>
                           Confirmar Contraseña
                         </Text>
                </View>
                     <Input
                    //placeholder=' Confirmar Contraseña'
                    secureTextEntry={!this.state.showPassword}
                    value={this.state.contrasena2}
                    onChangeText={this.handlePassword2}
                    placeholderTextColor={myTheme['color-material-primary-400']}
                    inputStyle={
                        style.input
                    }
                    onBlur = {
                      ()=>
                     {
                      if(this.state.contrasena2.length > 0){
                        if (this.state.contrasena === this.state.contrasena2) {
                          this.setState({alertContrasena2: false})
                        }
                        else{
                          this.setState({alertContrasena2: true})
                        }
                        
                      }
                      else{
                        //alert(this.state.contrasena + '=> '+this.state.contrasena2)
                        this.setState({alertContrasena2: false})
                      }
                     }
                    }
                    />
                     <Text style={{
                          textAlign:'center', 
                          color: 'red', 
                          display: this.state.alertContrasena2 ? 'flex' : 'none'}}>
                          Las contraseñas no coinciden
                        </Text>
                     <View style={styles.container}>
                    
   </View>

                  

                    <View style={style.boxterminos}>
                      <CheckBox 
                        value={this.state.acceptTerms}
                        onValueChange={(value)=>{
                          
                          this.setState({acceptTerms: value})
                        }}
                       
                      />
                        <Text style={style.terminos}>
                            Acepto los Términos y Condiciones de uso, la Política de Privacidad de los Datos de AdopciónPG
                        </Text>
                    </View>

                    <ButtonCustom  
                            title="Registrarse"
                            colorcustom={myTheme['color-success-700']}
                            buttonStyle={
                                style.button

                            }
                            onPress={()=>{
                              this.existeUsuario(this.state.cedula)
                                if(this.state.existUser){
                                  alert('Ya existe un usuario con esta identificacion');
                                }
                                else{
                                  this.createUser()
                                }
                                
                            }}
                            
                           />
                </View>
                </KeyboardAwareScrollView>
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1,
        
    },
    form:{
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25
    },
    boxlogo:{
        marginTop: 50,
        alignItems: 'center'
    },
    logo:{
        resizeMode: 'stretch',
        height: 150,
        width: 300,
      },
      input:{
        color: 'black',
        fontSize: 17,
        marginTop:0
      },
      button:{
        marginTop:20,
        borderRadius: 25,
        height: 50,
        
      },
      boxterminos:{
          marginTop: 10,
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: '5%'
      },
      terminos:{
          textAlign: 'center',
          fontWeight: 'bold'
      },
      internalPickerContainer: {
        flex: Platform.OS === 'ios' ? 1 : 1, // for Android, not visible otherwise.
        width: Platform.OS === 'ios' ? undefined : '100%',
        color: '#000',
        
        //justifyContent: 'space-around',
        //fontSize: 18,
        //fontWeight: 'bold',
        borderWidth: 2,
        marginHorizontal: '3%',
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
        fontSize: 22,
        fontWeight: 'bold',
        color: myTheme['color-primary-700']

    }
})

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
   });

   const Styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
  
    searchBarContainerStyle: {
      marginBottom: 10,
      flexDirection: "row",
      height: 40,
      shadowOpacity: 1.0,
      shadowRadius: 5,
      shadowOffset: {
        width: 1,
        height: 1
      },
      backgroundColor: "rgba(255,255,255,1)",
      shadowColor: "#d3d3d3",
      borderRadius: 10,
      elevation: 3,
      marginLeft: 10,
      marginRight: 10
    },
  
    selectLabelTextStyle: {
      color: "#000",
      textAlign: "left",
      width: "99%",
      padding: 10,
      flexDirection: "row"
    },
    placeHolderTextStyle: {
      color: "#D3D3D3",
      padding: 10,
      textAlign: "left",
      width: "99%",
      flexDirection: "row"
    },
    dropDownImageStyle: {
      marginLeft: 10,
      width: 10,
      height: 10,
      alignSelf: "center"
    },
    listTextViewStyle: {
      color: "#000",
      marginVertical: 10,
      flex: 0.9,
      marginLeft: 20,
      marginHorizontal: 10,
      textAlign: "left"
    },
    pickerStyle: {
      marginLeft: 18,
      elevation:3,
      paddingRight: 25,
      marginRight: 10,
      marginBottom: 2,
      shadowOpacity: 1.0,
      shadowOffset: {
        width: 1,
        height: 1
      },
      borderWidth:0,
      shadowRadius: 10,
      backgroundColor: "rgba(255,255,255,1)",
      shadowColor: "#d3d3d3",
      borderRadius: 5,
      flexDirection: "row"
    }
  });

export default withStyles(NewAccount, myTheme => ({
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
