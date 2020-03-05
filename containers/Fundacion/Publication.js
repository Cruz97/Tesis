import React, { Component } from 'react'
import { Text, 
    View, 
    StyleSheet,
    TextInput, 
    ActivityIndicator,
    Picker, 
    ImageBackground, 
    Image, 
    Alert, 
    TouchableHighlight, 
    TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import { ButtonGroup, Icon, Overlay} from 'react-native-elements'
import { RadioButton,Title,Headline } from 'react-native-paper';
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
import Slider from '@react-native-community/slider';
import {sendNotification} from '../../src/utils/PushNotifications';



const DATA = [
    { id: 1, title: 'Star Wars', releaseYear: 1977 },
    { id: 2, title: 'Back to the Future', releaseYear: 1985 },
    { id: 3, title: 'The Matrix', releaseYear: 1999 },
    { id: 4, title: 'Inception', releaseYear: 2010 },
    { id: 5, title: 'Interstellar', releaseYear: 2014 },
  ];


export class Publication extends Component {

    static navigationOptions = {
        title: 'Publicación de mascota',
        hideRightComponent: 'hide'
    }

    constructor(props){
        super(props)
        const {navigation} = this.props;
        let pet = navigation.getParam('pet',null)
      

        this.state = {
            selectedIndexGender: -1,
            selectedIndexType: -1,
            selectedIndexEdad:-1,
            slider: 1,
            especie: null,
            genero: null,
            // name: 'Skilled',
            // description: 'Skilled es una mascota muy amigable, le gusta pasear por las mañanas, le encantan las croquetas, y jugar con los balones ',
            // edad: '8 meses',
            name:'',
            description: '',
            edad: '',
            raza: '',
            color: '',
            typepublish: '',
            query: '',
            data: DATA,
            images: [],
            uploadValue: 0,
            pictureUrl: null,
            modalVisible: false,
            loadVisible: false,
            action: '',
            value_ini: 1,
            value_fin:12,
            key: null,
            loading: false,
            pet,
            arrayTokens: []
          }
          this.updateIndexGender = this.updateIndexGender.bind(this)
          this.updateIndexType = this.updateIndexType.bind(this)
          this.updateIndexEdad= this.updateIndexEdad.bind(this)
    }

    componentDidMount(){
        const {navigation} = this.props;
        let pet = navigation.getParam('pet',null)
        //alert(JSON.stringify(pet,null,4))
        let action = navigation.getParam('action',null)
        var image = null


        let refTokens = firebase.database().ref('tokens');
        refTokens.on('value',(snapshot)=>{
            var arrayTokens = []
            snapshot.forEach((child) => {
                let childToken = child.val()

                arrayTokens.push(childToken.token)
            });
            this.setState({arrayTokens})
        })
        
        // var spice = this.state.especie;
        // var gender = this.state.genero;

        // if(pet != null){
        //     spice = pet.value.spice;
        //     gender = pet.value.gender; 
        // }
        
        //alert(image)
        //let name = ''
        if(action === null && pet === null){
            this.setState({
                action: 'create',
                key: null
            })
        }else{
            // if(spice == -1) 
            // let spice = parseInt(this.state.especie);
            
            
            let gender = parseInt(pet.value.gender);
            let spice = parseInt(pet.value.spice);
            
            
            // let gender = parseInt(pet.value.gender);
            let description = pet.value.description;
            let color = pet.value.color;
            let age = pet.value.age;
            let arrayAge = age.split(' ');
            let indexEdad = -1
            let slider = parseInt(arrayAge[0])

            if(arrayAge[1] === 'Días')
                indexEdad = 0
            if(arrayAge[1] === 'Semanas')
                indexEdad = 1
            if(arrayAge[1] === 'Meses')
                indexEdad = 2
            //let typepublish = pet.value.typepublish;
            //alert(spice+ ' => '+gender)
            //alert(description)
            
            var xhr = new XMLHttpRequest()
            xhr.open("GET", pet.value.picture);
            xhr.responseType = "blob";
            xhr.send();
            xhr.addEventListener("load", ()=> {
                var reader = new FileReader();
                reader.readAsDataURL(xhr.response); 
                reader.addEventListener("loadend", ()=> {             
                    //alert(reader.result);
                    var images = [];
                    
                    var r = reader.result.replace('data:application/octet-stream;base64,','')
                    images.push(r)

                    this.updateIndexEdad(indexEdad)
                    // alert(r)
                    this.setState({
                        images,
                        action: action,
                        name: pet.value.name,
                        description,
                        edad: age,
                        selectedIndexGender: gender,
                        selectedIndexType: spice,
                        selectedIndexEdad: indexEdad,
                        color,
                        slider,
                        //typepublish, 
                        key: pet.key,
                        pet

                    })

                    
                });
            });

        }

    }

    savePetPublish = () => {
        const {name, especie, genero, color, edad, slider, description, typepublish, selectedIndexGender, selectedIndexType, selectedIndexEdad} = this.state;
        const imagen = this.state.images[0];    
        const fundacion = firebase.auth().currentUser;
        let date = new Date();
        const msgAge = selectedIndexEdad === 0 ? (slider === 1 ? ' Dia' : ' Días' ) : 
        selectedIndexEdad === 1 ? (slider === 1 ? ' Semana' : ' Semanas' ):
        selectedIndexEdad === 2 ? (slider === 1 ? ' Mes' : ' Meses' ) : '';

        var hoy = new Date()
        var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var fechaYHora = fecha + ' ' + hora;

        if(name == '' || imagen == null || selectedIndexGender == -1 || selectedIndexType == -1 ||
        color == '' || selectedIndexEdad == -1 || description == '' ){
            alert('Llene toda la información requerida')
            return;
        }

        this.setState({loading: true});

        if(this.state.key != null){
            var storageRef = firebase.storage().ref('/petphotos/'+fundacion.uid+'/'+this.state.key);
            let task = storageRef.putString(imagen,'base64');
            task.on('state_changed', (taskSnapshot) => {
                var progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
                var lote = progress/10;
                var cont = 0
                while(cont < lote){
                    cont++;
                    var num = this.state.uploadValue + lote;
                }                           
              });
              task.then(() => {
                storageRef.getDownloadURL().then((imageUrl)=>{
                    let refEditPublish = firebase.database().ref('publicaciones/'+fundacion.uid+'/'+this.state.key);
                   
                    refEditPublish.update({
                        name: name,
                        picture: imageUrl,
                        spice: selectedIndexType,
                        gender: selectedIndexGender,
                        color: color,
                        age: slider+msgAge,
                        description: description,
                        date: fechaYHora
                    }).then(()=>{
                        
                            this.setState({
                                loadVisible: false,
                                modalVisible: true,
                                loading: false
                            })

                    }).catch(error=>{
                        this.setState({
                            loading: false
                        })
                        alert(error.message)
                    });
                }).catch((error)=>{
                    alert(error.message);
                })
              })
              .catch((error) => {
                alert(error.message);
              });
            return;
        }

        let refPublish = firebase.database().ref('publicaciones/'+fundacion.uid);
                   
        let keyPublish = refPublish.push({
                        name: name,
                        spice: selectedIndexType,
                        gender: selectedIndexGender,
                        color: color,
                        age: slider+msgAge,
                        description: description,
                        status: 'FOR_ADOPTION',
                        date: fechaYHora
                    }).key

        var storageRef2 = firebase.storage().ref('/petphotos/'+fundacion.uid+'/'+keyPublish);
        
        let task = storageRef2.putString(imagen,'base64');
        task.on('state_changed', (taskSnapshot) => {
            var progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
            var lote = progress/10;
            var cont = 0
            while(cont < lote){
                cont++;
                var num = this.state.uploadValue + lote;
            }     
                                
          });

        
           
          task.then(() => {
            storageRef2.getDownloadURL().then((imageUrl)=>{
                let refPublish2 = firebase.database().ref('publicaciones/'+fundacion.uid+'/'+keyPublish);
                   
                refPublish2.update({
                    "picture": imageUrl
                }).then(()=>{
                    sendNotification(
                        this.state.arrayTokens,
                        'Una mascota ha sido publicada!',
                        'Hay una mascota que espera un hogar!.'
                        )
                    
                        this.setState({
                            loadVisible: false,
                            modalVisible: true,
                            loading: false
                        })

                }).catch(error=>{
                    alert(error.message)
                });
            }).catch((error)=>{
                alert(error.message);
            })
          })
          .catch((error) => {
            alert(error.message);
          });
    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    

    uploadImage = () =>{
        const img = this.state.images[0];
        let storageRef = firebase.storage().ref('/petphotos');
        const task = storageRef.child('/fundacion').putString(img,'base64');

        task.on('state_changed',snapshot=>{
            let percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) ;
            //alert(percentage)
            let n = percentage/100;
            let value = 0;
           // alert(snapshot.totalBytes )
           for(let i=0; i<n; i++){
              
               value = value+n;
              // alert()
               // setTimeout(()=>{
                    this.setState({
                        uploadValue: value,
                        //pictureUrl: downloadURL
                    })
                   //},1000)

            }
            //snapshot.ref.getDownloadURL().then((downloadURL)=>{
              

           // })
        }, 
        error => {
            alert(error.message)
        },
        ()=>{
               // snapshot.ref
               // snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setTimeout(() => {
                        this.setState({
                            //uploadValue: 100,
                            modalVisible: true
                            //picture: downloadURL
                        })

                    }, 1000);
                    //alert(this.state.pictureUrl)
                //
            
        }
        )
    }

 
    updateIndexEdad (selectedIndexEdad) {
        if(selectedIndexEdad == 0 ){
            this.setState({selectedIndexEdad, value_ini: 1, value_fin: 30, slider: 1})
        }
        if(selectedIndexEdad == 1){
            this.setState({selectedIndexEdad, value_ini: 1, value_fin: 36, slider: 1})
        }
        if(selectedIndexEdad == 2){
            this.setState({selectedIndexEdad, value_ini: 1, value_fin: 36, slider: 1})
        }
       
      }

    updateIndexGender (selectedIndexGender) {
        //alert(selectedIndexGender)
        this.setState({selectedIndexGender})
      }
      updateIndexType (selectedIndexType) {
          //alert(selectedIndexType)
        this.setState({selectedIndexType})
      }

      handleName = (text) => {
        if(this.validateOnlyText(text))
          this.setState({name: text,alertNombres: false})
        else 
          {
            this.setState({alertNombres: true})
            //return 
          }
          
      }

      validateOnlyText = (text) => {
        var re = /^[a-zA-Z\s]*$/;
          return re.test(text);
      };

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

    onChangeText = (query) => {
        this.setState({
            value: query,
            data: DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
        })
        //setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
      };
    
      onSelect = ({ title }) => {
        this.setState({
            value: title
        })
      };
    
      _filterData = (query) => {
        if (query === '') {
            return [];
          }
        const { data } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return data.filter(data => data.title.search(regex) >= 0);
      }

    onChangeImages = (images) => {
        this.setState({
            images
        })
    }
      

    render() {
        const {themedStyle} = this.props;
        const { query } = this.state;
        const data = this._filterData(query);
       
        const buttonsGender = ['Hembra', 'Macho']
        const buttonsType = ['Canina', 'Felina']
        const buttonsEdad = ['Días', 'Semanas','Meses']
        const { selectedIndexGender } = this.state
        const { selectedIndexType, selectedIndexEdad } = this.state
        return (
            <View style={style.main}>
                <Dialog title={"Publicando....."}
                    animationType="fade"
                    onTouchOutside={ () => this.setState({loading: false}) }
                    
                    visible={ this.state.loading } 
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
                <AlertCustom 
                    modalVisible={this.state.modalVisible}
                    onBackdropPress={()=>{this.setState({modalVisible: false}); this.props.navigation.navigate('MascotasF')}}
                    source={require('../../assets/img/successgif.gif')}
                    title='Genial!'
                    subtitle='La publicación se ha realizado con éxito'
                    textButton='Aceptar'
                    onPress={()=>{
                        this.setModalVisible(false)
                        this.props.navigation.navigate('MascotasF')
                    }}

                />

                <LoadingCustom  loadVisible={this.state.loadVisible} progress={this.state.uploadValue}  />

        
                <KeyboardAwareScrollView>
                <View style={style.form}>
                
                        
                        {/* <View style={style.boxinput}> */}

                        <Text style={{marginVertical: 10, fontWeight: 'bold' ,color: themedStyle.text.primary}}>
                            Nombre de la mascota</Text>
                        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                            value={this.state.name}
                            returnKeyType='next'
                            maxLength={25}
                            underlineColorAndroid = "transparent"
                            //placeholder = "Nombre de la mascota"
                            placeholderTextColor = {themedStyle.text.primary}
                            autoCapitalize = "none"
                            onChangeText = {this.handleName}/>

                        <Text style={{marginVertical: 10, fontWeight: 'bold' ,color: themedStyle.text.primary}}>
                            Foto de la mascota</Text>
                       <View style={{borderWidth:1, borderColor: myTheme['color-material-primary-300'], padding: 10, borderRadius: 10, marginTop: 0}}>
                       <ImagenPicker 
                       color={myTheme['color-material-primary-200']}
                        //title="Agregar imagenes de la mascota" 
                        images={this.state.images} 
                        onChangeImages={this.onChangeImages.bind(this)}
                        limit={1}
                        
                        />
                       </View>
                      

                          


                            
                        {/* </View> */}
                    <View style={style.boxinput}>
                        <Text style={style.label}>Especie</Text>
                        <ButtonGroup
                        onPress={this.updateIndexType}
                        selectedIndex={selectedIndexType}
                        buttons={buttonsType}
                        textStyle={style.txtbtngroup}
                        containerStyle={style.buttongroup}
                    />

                    
                    </View>

                    <View style={style.boxinput}>
                        <Text style={style.label}>Sexo</Text>
                        <ButtonGroup
                            onPress={this.updateIndexGender}
                            selectedIndex={selectedIndexGender}
                            buttons={buttonsGender}
                            textStyle={style.txtbtngroup}
                            containerStyle={
                                style.buttongroup
                            }
                        />

                    </View>

                   

                    <Text style={{marginVertical: 10, fontWeight: 'bold' ,color: themedStyle.text.primary}}>
                            Color/es</Text>
                    
                            <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                            value={this.state.color}
                            returnKeyType='next'
                            underlineColorAndroid = "transparent"
                            //placeholder = "Nombre de la mascota"
                            placeholderTextColor = {themedStyle.text.primary}
                            autoCapitalize = "none"
                            onChangeText = {this.handleColor}/>

{/* <View style={{borderWidth:1, borderColor: myTheme['color-material-primary-300'], borderRadius: 10, marginVertical: 10}}>
                     <View style={[style.boxList,{justifyContent: 'space-between'}]}>
                    <Text style={[style.label,{marginLeft: '6%'}]}>Color</Text>
                        <Picker
                            style={style.internalPickerContainer}
                            
                            mode='dialog'
                            iosHeader="Select Raza"
                            selectedValue={this.state.color}
                            onValueChange={this.handleColor}
                            //
                            itemStyle={style.pickerIosListItemContainer}
                            itemTextStyle={style.pickerIosListItemText}
                        >
                            <Picker.Item label="-- Seleccione un color --" value="null" />
                            <Picker.Item label="Blanco" value="Blanco" />
                            <Picker.Item label="Negro" value="Negro"/>
                            <Picker.Item label="Cafe" value="Cafe"  />
                        </Picker>
                        </View>
                        </View> */}


                       
                           
     <Text style={{marginVertical: 10, fontWeight: 'bold' ,color: themedStyle.text.primary}}>
                                Edad Aproximada de { this.state.selectedIndexEdad === -1 ? '' : this.state.slider }  
                              { this.state.selectedIndexEdad === 0 ? (this.state.slider === 1 ? ' Dia' : ' Días' ) : 
                                this.state.selectedIndexEdad === 1 ? (this.state.slider === 1 ? ' Semana' : ' Semanas' ):
                                this.state.selectedIndexEdad === 2 ? (this.state.slider === 1 ? ' Mes' : ' Meses' ) : ''} </Text>
                        <View style={style.boxinput}>
                            
                                    <ButtonGroup
                                        onPress={this.updateIndexEdad}
                                        selectedIndex={selectedIndexEdad}
                                        buttons={buttonsEdad}
                                        textStyle={style.txtbtngroup}
                                        containerStyle={
                                                style.buttongroup
                                            }
                                                />

                                </View>
                            <Slider
                                style={{flex:1, display: this.state.selectedIndexEdad === -1 ? 'none': 'flex'}}
                                minimumValue={this.state.value_ini}
                                maximumValue={this.state.value_fin}
                                minimumTrackTintColor="green"
                                maximumTrackTintColor="red"
                                value={this.state.slider}
                                onValueChange={(n)=>{
                                    this.setState({slider:parseInt(n)})
                                }}
                            />

                        {/* <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                            value={this.state.edad}
                            returnKeyType='next'
                            underlineColorAndroid = "transparent"
                            //placeholder = "Nombre de la mascota"
                            placeholderTextColor = {themedStyle.text.primary}
                            autoCapitalize = "none"
                            onChangeText = {this.handleYears}/> */}

                      


                        <Text style={{marginVertical: 10, fontWeight: 'bold' ,color: themedStyle.text.primary}}>
                            Descripción</Text>
                    
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
                            value={this.state.description}
                            onChangeText = {this.handleDescription}/>
                     
{/*                      
                    <View style={{borderWidth:1, borderColor: myTheme['color-material-primary-300'], borderRadius: 10, marginVertical: 10}}>
                     <View style={style.boxList}>
                    <Text style={style.label}>Publicar como: </Text>
                        <Picker
                            style={style.internalPickerContainer}
                            
                            mode="dialog"
                            iosHeader="Select Type "
                            selectedValue={this.state.typepublish}
                            onValueChange={this.handleTypePublish}
                            //
                            itemStyle={style.pickerIosListItemContainer}
                            itemTextStyle={style.pickerIosListItemText}
                        >
                            <Picker.Item label=" ** Seleccione el tipo de publicación **" value="null" />
                            <Picker.Item label="Adopción" value="Adopción" />
                            <Picker.Item label="Perdida" value="Perdida" />
                        </Picker>
                        </View>
                        </View> */}


                   
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
                <View style={{alignItems: 'center'}}>

                <TouchableOpacity 
                //disabled= {this.state.pet.value.status === 'ADOPTED' ? true : false}
                onPress={()=>{
                    // if(this.state.pet){
                    //     //alert(JSON.stringify(this.state.pet,null,4))
                    //     if(this.state.pet.value.status === 'ADOPTED'){
                    //         //NO SE ACTUALIZA
                    //         () => {}
                    //     }else{

                    //     }
                    // }
                    // else{
                        this.savePetPublish()
                    //}
                }}>
                    <LinearGradient colors={['#24254c', '#1c4068', '#075b7f', '#017691', '#28929d']} style={style.linearGradient}>
                        <Text style={style.buttonText}>
                        Publicar
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                   
                           {/* <Image
                                style={{ width: 150, height: 150, borderRadius: 10 }}
                                resizeMode={'cover'}
                                source={{ uri: this.state.pictureUrl }}
                                /> */}
                   </View>
                </KeyboardAwareScrollView>

               
            </View>
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
        width: '60%',
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
      height: 40,
      width: '100%',
     
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center'
       
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
          alignItems: 'center',
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
          //fontSize: 16,
          fontWeight: 'bold',
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
        flex: Platform.OS === 'ios' ? 1 : null, // for Android, not visible otherwise.
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
      linearGradient: {
        //flex: 1,
        marginTop: 20,
        paddingLeft: '15%',
        paddingRight: '15%',
        marginBottom: 20,
        paddingVertical: 5,
        borderRadius: 25
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
      
})

export default withStyles(Publication, myTheme => ({
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
