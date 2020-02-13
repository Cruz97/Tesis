import React, { Component } from 'react'
import { Text, View, StyleSheet,TextInput, Picker, ImageBackground, Image, Alert, TouchableHighlight, TouchableOpacity} from 'react-native'

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
       
      

        this.state = {
            selectedIndexGender: -1,
            selectedIndexType: -1,
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
            key: null
          }
          this.updateIndexGender = this.updateIndexGender.bind(this)
          this.updateIndexType = this.updateIndexType.bind(this)
    }

    componentDidMount(){
        const {navigation} = this.props;
        let pet = navigation.getParam('pet',null)
        //alert(JSON.stringify(pet,null,4))
        let action = navigation.getParam('action',null)
        var image = null
        
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
                    // alert(r)
                    this.setState({
                        images,
                        action: action,
                        name: pet.value.name,
                        description,
                        edad: age,
                        selectedIndexGender: gender,
                        selectedIndexType: spice,
                        color,
                        //typepublish, 
                        key: pet.key

                    })
                });
            });
            //this.updateIndexGender(gender)
        //     this.setState({
               
        //         //pet
        //    })
        }

        //alert(this.state.images.length)
       
        // if(action === null && pet === null){
        //     this.setState({
        //         action: 'create'
        //     })
        // }else{
        //     this.setState({
        //         action: action,
        //         name: pet.value.name,
        //         //pet
        //     })
        // }

    }

    savePetPublish = () => {
        const {name, especie, genero, color, edad, description, typepublish, selectedIndexGender, selectedIndexType} = this.state;
        const imagen = this.state.images[0];    
        const fundacion = firebase.auth().currentUser;
        let date = new Date();
        var storageRef = firebase.storage().ref('/petphotos/'+fundacion.uid+'/'+date+'_'+name);
        //alert(storageRef)

        if(this.state.key != null){
            let refEditPublish = firebase.database().ref('publicaciones/'+fundacion.uid+'/'+this.state.key);
                   
            refEditPublish.update({
                name: name,
                //picture: imagen,
                spice: selectedIndexType,
                gender: selectedIndexGender,
                color: color,
                age: edad,
                description: description,
                //typepublish: typepublish
            }).then(()=>{
               // setTimeout(() => {
                
                    this.setState({
                        loadVisible: false,
                        modalVisible: true
                    })

            }).catch(error=>{
                alert(error.message)
            });

            return;
        }
        
        let task = storageRef.putString(imagen,'base64');
        task.on('state_changed', (taskSnapshot) => {
            var progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
            var lote = progress/10;
            //var num = this.state.uploadValue;
            var cont = 0
            while(cont < lote){
                cont++;
                var num = this.state.uploadValue + lote;
                //setTimeout(()=>{
                    this.setState({loadVisible: true,uploadValue: num})
               // },300)
            }
            
           
                  
                                
          });

        
           
          task.then(() => {
            storageRef.getDownloadURL().then((imageUrl)=>{
                let refPublish = firebase.database().ref('publicaciones/'+fundacion.uid);
                   
                refPublish.push({
                    name: name,
                    picture: imageUrl,
                    spice: selectedIndexType,
                    gender: selectedIndexGender,
                    color: color,
                    age: edad,
                    description: description,
                    //typepublish: typepublish
                }).then(()=>{
                   // setTimeout(() => {
                    
                        this.setState({
                            loadVisible: false,
                            modalVisible: true
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
        const { selectedIndexGender } = this.state
        const { selectedIndexType } = this.state
        return (
            <View style={style.main}>
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
                        <Text style={style.label}>Género</Text>
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
                            Edad Aproximada</Text>

                        <TextInput style = {[style.input,{ borderColor: themedStyle.colors.primary,}]}
                            value={this.state.edad}
                            returnKeyType='next'
                            underlineColorAndroid = "transparent"
                            //placeholder = "Nombre de la mascota"
                            placeholderTextColor = {themedStyle.text.primary}
                            autoCapitalize = "none"
                            onChangeText = {this.handleYears}/>

                      


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
                <View style={{alignItems: 'center', width: '100%'}}>
                   <ButtonCustom  
                            title="Publicar"
                            icon = {
                                <Icon name='send' size={20} color={themedStyle.colors.icon} />
                            }
                            //iconName='send'
                            colorcustom={'#780C88'}
                            buttonStyle={
                                {
                                    marginTop:10,
                                    borderRadius: 20,
                                    width: 250,
                                    height: 50,
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
