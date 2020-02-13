import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Image,Icon} from 'react-native-elements'
import SendIntentAndroid from 'react-native-send-intent';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { myTheme } from '../../src/assets/styles/Theme';

export class Fundaciones extends Component {

    static navigationOptions = {
        title: 'Fundaciones',
        hideRightComponent: 'hide'
    }

   constructor(props){
       super(props);
       this.state = {
           fundaciones: []
       }

       
   }

   componentDidMount(){
    let arrayfoundation = []
    let refFoundation = firebase.database().ref('fundaciones')
    refFoundation.on('value',snapshot => {
     //    alert(JSON.stringify(snapshot.child('amigosconcola').val()))
     snapshot.forEach((data)=>{
         let fundacion = data.val()
         arrayfoundation.push(fundacion)
         // alert(JSON.stringify(data.val(),null,4))
     })

     this.setState ( {
         fundaciones: arrayfoundation
     })
    //  alert(JSON.stringify(arrayfoundation,null,4))
    })

   }

    renderItem = (item) => {
        
        return(
            <View style={style.boxitem}>
           
        <View style={style.item}>

           
               <View style={[style.boximg]}>
                       <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=> {}} >
                           <Image style={style.img} source={{uri: item.img}}  />
                       </TouchableOpacity>
               </View>
               <View style={style.boxinfo}>
               <Card.Content style={{marginLeft:-5}}>
               <Text style={style.title}>{item.name}</Text>
                  
                   <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}} >
                       <Icon
                               
                               name='room'
                               type='material'
                               color='#517fa4'
                               size={20}
                               />
                             <Text style={style.infofundacion}>Guayaquil , {item.zone}</Text>
                   </View>

                   {/* <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                       <Icon
                               
                               name='room'
                               type='material'
                               color='#517fa4'
                               size={20}
                               />
                           <Text style={style.infofundacion}>Isidro Ayora</Text>
                   </View> */}

                   <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                       <Icon
                               
                               name='phone'
                               type='material'
                               color='#517fa4'
                               size={20}
                               />
                        <Text style={style.infofundacion}>{item.phone}</Text>
                        <Button 
                            onPress={()=>{
                                SendIntentAndroid.sendPhoneCall(item.phone,false);
                            }}
                        ><Text
                            style={{color: myTheme['color-success-700'],fontSize: 14, fontWeight: 'bold',letterSpacing:0}}
                        >Llamar</Text></Button>
                   </View>

                   <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                       <Icon
                               
                               name='email'
                               type='material'
                               color='#517fa4'
                               size={20}
                               />
                           {/* <TouchableOpacity> */}
                           {/* <Text style={style.infofundacion}>{item.email}</Text> */}
                           {/* </TouchableOpacity> */}
                           <Button 
                        //    rippleColor={myTheme['color-primary-600']}
                           //underlayColor={myTheme['color-primary-600']}
                            onPress={()=>{
                                SendIntentAndroid.sendMail(
                                    item.email,
                                    'Quiero adoptar una mascota',
                                    'Saludos cordiales'
                                    
                                )
                            }}
                        >
                            
                            <Text
                            style={{color: myTheme['color-success-700'],fontSize: 14, fontWeight: 'bold',letterSpacing:0}}
                        >Enviar correo</Text></Button>
                          
                           
                   </View>
                   

                   <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                       <Icon
                               
                               name='account-box'
                               type='material'
                               color='#517fa4'
                               size={20}
                               />
                           <Text style={style.infofundacion}>Representante: {item.manager}</Text>
                   </View>

               
                   
                   
               </Card.Content>

               </View>

           </View>
        </View>
        )
    }

    render() {
        const fundaciones = Array.from(this.state.fundaciones)
        // alert(JSON.stringify(fundaciones))
        //alert(JSON.stringify(this.state.fundaciones,null,4))
        return (
            <ScrollView style={style.container}>
                {
                    fundaciones.map((item)=>{
                       return(
                        this.renderItem(item)
                       )
                    })
                }
                {/* {this.renderItem()}
                {this.renderItem()} */}
           
             </ScrollView>
        )
    }


    
   


}

const style = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor: 'red'
        // backgroundColor: '#f2f2f2',
        //paddingBottom: 40
    },
    boxitem:{
        //flex:1,
        // backgroundColor: 'blue',    
        height: 250,
        width: '100%'
    },
    item:{
        flex: 1,
       // width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 10,
        marginRight:10,
        marginTop: 10,
        borderRadius: 20,
        //resizeMode: 'c',
        overflow: 'hidden',
        height: 320,
        borderColor: 'rgba(0,0,0,0.6)',
        backgroundColor: '#fff',
        
    
        shadowColor: "#8c8c8c",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 1,
    },
    elevation: 10
       },
       boximg:{
        width: '45%',

        
       },
       boxinfo:{
        flex:1,
        paddingBottom: 60,
        marginTop: 10
       },
       img:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        
       },
       title:{
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    infofundacion:{
        fontSize: 13,
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10
    },
})

export default Fundaciones
