import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import {Card, Button, Divider} from 'react-native-paper';
import { myTheme } from '../../src/assets/styles/Theme'
import { Avatar, Icon } from "react-native-elements";
import ButtonCustom from '../../components/ButtonCustom';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient'


const colorPrimary = myTheme['color-primary-600'];


export class PetDetails extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        const {navigation} = this.props;
        const pet = navigation.getParam('pet', null)
        var foundation = null;
        let refFoundation= firebase.database().ref('fundaciones/'+pet.keyfoundation);
        refFoundation.on('value',(snapshot)=>{
            //alert(JSON.stringify(snapshot,null,4))
            foundation = snapshot.val();
        })
        //alert(JSON.stringify(pet,null,4))
        //this.setState({pet})
        this.state={
            pet: pet,
            foundation: foundation
        }
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
        const {navigation} = this.props;
        const pet = navigation.getParam('pet', null)
        var foundation = {};
        let refFoundation= firebase.database().ref('fundaciones/'+pet.keyfoundation);
        //alert(refFoundation)
        refFoundation.on('value',(snapshot)=>{
            //alert(JSON.stringify(snapshot,null,4))
            foundation = snapshot.val();
            this.setState({foundation})
            
        })
        //alert(JSON.stringify(foundation))
        this.setState({pet})
        //al
        //alert(JSON.stringify(pet,null,4))
        
    }

    render() {
        const pet = this.state.pet;
        const spice = pet.value.spice === 0 ? 'Canino' : 'Felino';
        const gender = pet.value.gender === 0 ? 'Hembra' : 'Macho';
        //alert(this.state.foundation)
        // const foundation = this.state.foundation ? {} : ;
        //const {img} = this.state.foundation
        return (
            <ScrollView style={style.main}>
                 
                 {/* <Text style={style.name}>{pet.value.name}</Text> */}
                       
                  
                 <View style={[style.boximg]}>
                      
                           <Image style={style.img} source={{uri: pet.value.picture}}  />
                       
               </View>
{/*                
               <View style={[style.info]}>
                   
                  
                  
               </View>
             */}
               <View style={{flex:1}}>
               <View style={style.boxname}>
                            
                            <View style={style.boxIconFoundation}>
                    
                    <Avatar
                    size={90}
                    source={{uri: this.state.foundation === null ? 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' : this.state.foundation.img}}
                    rounded
                    containerStyle={{borderWidth:1, borderColor: myTheme['color-primary-800']}}
                    
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    />
                   </View>
                       </View>
                       
               <View style={{flexDirection:'column', marginTop: '5%', }}>
                {
                    this.renderItem('account-card-details',pet.value.name.toUpperCase(), 'Nombre','material-community')
                }
              
              
               {
                    this.renderItem('account-card-details',pet.value.description, 'Descripción','material-community')
                }
                <View style={{flex:1, flexDirection: 'row', marginTop: '3%', marginHorizontal: '5%'}}>
                {
                    this.renderItem('today',pet.value.age, 'Edad Apróx.')
                }
                 {
                    this.renderItem('pets',spice, 'Especie')
                }
                

                </View>
                <View style={{flex:1 ,flexDirection: 'row', marginTop: '3%', marginHorizontal: '5%'}}>
                {
                    this.renderItem('palette',pet.value.color, 'Color')
                }
                {
                    this.renderItem('gender-male-female',gender, 'Sexo','material-community')
                }
                
                </View>
                
               </View>
               <View style={style.boxbuttons}>
                     
                {/* <View style={{width: '100%', alignItems: 'center'}}> */}
                
                <TouchableOpacity onPress={()=>{
                this.props.navigation.push('PersonalInformation',{idPet: pet.key, idFoundation: pet.keyfoundation})
              }}>
              <LinearGradient colors={['#24254c', '#1c4068', '#075b7f', '#017691', '#28929d']} style={style.linearGradient}>
                        <Icon
                        name='open-in-new'
                        type='material-community'
                        size={25}
                        color='#fff'
                    />
                <Text style={style.buttonText}>
                  Quiero Adoptar
                </Text>
              </LinearGradient>
              </TouchableOpacity>
                     </View>
               


                   </View>

               {/* </View> */}
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: '#f2f2f2'
    },
    boximg:{
        //width: '100%',
        //flex:1,
        height: 220,
        //paddingTop: 30,
        //borderBottomWidth: 2,
        //borderColor: myTheme['color-primary-800'],
        backgroundColor: colorPrimary
        
       },
       img:{
           flex:1, 
           borderRadius: 5,
           //paddingBottom: 30,
           //width: undefined,
           //height: undefined,
           //resizeMode: 'stretch',
           //transform: [{scale: 0.5}]
           //resizeMode: 'cover'
        //width: '100%',
        //height: '100%',
        resizeMode: 'contain',
        
       },
    info: {
        //backgroundColor: myTheme['color-info-800'],
        //width: '100%',
        //height: 50,
        flex:1,
        //backgroundColor: myTheme['color-primary-700'],
        alignItems: 'center',
        //marginRight: 40
    },
    desc:{
        marginHorizontal: '5%',
        fontSize: 17,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    boxIconFoundation:{
        position: 'absolute',
        top: -50,
        right: 20,
        //zIndex: 1001
        //marginHorizontal: 10,
        //marginVertical: 20,
        //alignContent: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff',
        marginHorizontal: 30,
        //zIndex: 999
       // marginVertical: '3%'
    },
    boxname:{
        height: '5%',
        width: '100%',
        //backgroundColor: colorPrimary
    },
    boxdetails:{
        //backgroundColor: 'red',
        width: '100%',
        flex:1,
        height: '80%',
        //margin: 20
    },
    boxdescription:{
        flex:1,
        justifyContent: 'center'
        //alignContent: 'center',
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    description:{
        flex:1,
        marginHorizontal: 30,
        marginVertical: 20,
        //alignContent: 'center'
        
    },
    textdescription:{
        color: myTheme['color-material-primary-500'],
        marginHorizontal: 20,
        textAlign: 'center',
        //alignItems: 'center'
    },
    details:{
        flex:1,
        marginHorizontal: 30,
        marginVertical: 10,
        //backgroundColor: myTheme['color-info-800'],
        //borderRadius: 15,
        padding: 10
    },
    itemdetails:{
        flex:1,
        flexDirection: 'row',
        marginHorizontal: 10
    },
    boxvaluedetail:{
        flex:2,
        justifyContent: 'center'
    },
    boxtitledetail: {
        flex:1,
        justifyContent: 'center'
    },
    titledetail: {
        fontWeight: 'bold',
        fontSize: 14,
        //color: '#fff',
        marginHorizontal: '4%',
        marginVertical: '3%',
        color: myTheme['color-material-primary-500'],

    },
    valuedetails:{
        //fontWeight: 'bold',
        fontSize: 14,
        color: '#fff',
        marginHorizontal: '4%',
        marginVertical: '3%',
        color: myTheme['color-material-primary-500'],
    },
    boxicon:{
        //flex:1,
        marginRight: 10,
        justifyContent: 'center'
    },
    boxbuttons:{
        marginVertical: '10%',
        //flex:1,
        
        justifyContent: 'center',
        alignItems: 'center',
        //flexDirection: 'row',
        //paddingBottom: 20,
    },
    linearGradient: {
        //flex: 1,
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
        paddingVertical: 5,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center'
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
      item:{
        flex:1,
        //height: 60,
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginHorizontal: '2%',
        marginTop: 10,
        flexDirection: 'row'
    },
    boxiconinfo:{
        width: '15%',
        justifyContent: 'center',
        backgroundColor: colorPrimary,
        overflow: 'hidden',
        borderBottomLeftRadius: 15,
        //borderTopStartRadius: 15
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

})

export default PetDetails
