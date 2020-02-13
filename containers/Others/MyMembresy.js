import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import CustomIcon from '../components/CustomIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Card, Button} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import Database from '../database'


 const schemaName = 'User'
//const uuid = "ec366d60-0a9b-11ea-82b1-e37e650f4e3b";

export class MyMembresy extends Component {

  static navigationOptions = {
    title: 'Mi Membresía',
    hideRightComponent: 'hide',
  };

  constructor(props){
    super(props);
    const uuid = Database.LocalDB.searchAll('User')[0].user_identify
    //const userid = props.navigation.state.params.uuid;
    //alert('membresy: '+userid)
    //alert(JSON.stringify(Database.LocalDB.searchAll('User'),null,2))
    
    this.state = {
      //Data: null
      uuid,
      Data: Database.CloudDB.get(schemaName,uuid).membresy
    }
  }

 

  formatNumberCard = (number) => {
    var n = Array.from(number)
    var str = '';
    for(var i=0; i<n.length; i++){
      if(i==3 || i==13)
        str += n[i]+ '  ';
      else
        str += n[i];
      
    }
    return str;
  }
  
  render() {
   
    return (
      <View style={style.container}>
            <View style={style.card}>
            {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={style.linearGradient}> */}
                <Image source={require('../assets/img/fondo-black.png')} resizeMode='cover' style={style.fondo}/>
              {/* </LinearGradient> */}
                <View style={{ flexDirection: 'row',justifyContent: 'space-between'}}>
                  <Image source={require('../assets/img/passoroverde.png')}  style={style.logopasaport}></Image>
                  <View>
                  <Image   source={require('../assets/img/Isologotipo-09.png')} style={{ 
                                ...StyleSheet.absoluteFillObject,
                                tintColor: '#c7b481',
                                opacity: 0.9,
                                width: 90,
                                height: 55,
                                marginTop:20,
                                zIndex: 20
                                
                            
                            }} 
                            resizeMode='contain'/>
                  <Image source={require('../assets/img/Isologotipo-09.png')}  style={style.logohotel}></Image>
                  </View>
                </View>
                <View style={{flex:1,alignItems: 'center'}}> 
                  <Text style={style.numbercard}>
                    {this.formatNumberCard(this.state.Data.digits_card)}
                  </Text>
                </View>
                <View style={{flex:1,alignItems: 'flex-end'}}>
                  <View style={style.boxvalid}>
                    <Image source={require('../assets/img/valid.png')} style={style.valid}/>
                    <Text style={style.textvalid}>
                     {
                       moment(this.state.Data.date_expire).format('MM/YY')
                     }
                    </Text>
                  </View>
                </View>
                <View style={style.boxdetails}>
                  <View style={style.detailscard}>
                    <Text style={style.namecard}>
                      {
                        this.state.Data.name_card
                      }
                    </Text>
                  </View>
                </View>
            </View>
            
              <Card style={style.options}>
                <Card.Content style={{flex: 1}}>

                <View style={style.itemHome}>
                <View >
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>this.props.navigation.navigate('Profile',{uuid: this.state.uuid})}>
                  <CustomIcon name="home1" size={25}></CustomIcon>
                  <Text style={style.text}>Mi Perfil</Text>
                  </TouchableOpacity>
                </View>
                  </View> 

                <View style={style.itemHome}>
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                    var SendIntentAndroid = require('react-native-send-intent');
                    SendIntentAndroid.openChooserWithOptions({
                      subject: 'Hotel Oro Verde',
                      text: 'Lo mejor de la gastronomía local e internacional lo encontraras en nuestra variedad de 5 restaurantes que ofrece Hotel Oro Verde para satisfacer tu paladar. Visita nuestro sitio web  https://www.oroverdeguayaquil.com/ para más información.' ,
                    }, 'Compartir con');
                  }}>
                  <CustomIcon name="home3" size={25}></CustomIcon>
                  <Text style={style.text}>Recomiéndanos</Text>
                  </TouchableOpacity>
                </View> 

               <View style={style.itemHome}>
                  <CustomIcon name="home4" size={25}></CustomIcon>
                  <Text style={style.text}>Socio desde</Text>
                  <Text style={[style.text,style.detail]}>
                    {
                      
                      moment(this.state.Data.partner_from).format('D MMM YYYY')
                    }
                  </Text>
                </View> 
               

              
               <View style={style.itemHome}>
                  <CustomIcon name="home5" size={25}></CustomIcon>
                  <Text style={style.text}>Visitas totales</Text>
                  <Text style={[style.text,style.detail]}>
                    {this.state.Data.visits}
                    </Text>
                </View> 
               

                
                <View style={style.itemHome}>
                  <CustomIcon name="home6" size={25}></CustomIcon>
                  <Text style={style.text}>Consumo total</Text>
                    <Text style={[style.text,style.detail]}>$
                    {parseFloat(this.state.Data.consumption).toFixed(2)}
                    </Text>
                </View> 
                

                
                <View style={style.itemHome}>
                  <CustomIcon name="home7" size={25}></CustomIcon>
                  <Text style={style.text}>Total de descuentos</Text>
                  <Text style={[style.text,style.detail]}>$
                  {parseFloat(this.state.Data.discount).toFixed(2)}
                  </Text>
                </View> 
                
                </Card.Content>
              </Card>

              <View style={style.footer}>
                <Text style={style.copyr}>Powered By 5bits</Text>

              </View>
              
            
      </View>
    );
  }
}


const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f2f2f2'
        
    },
    header:{
      flexDirection: 'row',
      backgroundColor: 'black',
      alignContent: 'center',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 6
      //color: 'white'
    },
    iconheader:{
      color: 'white',
    },
    title:{
      color: 'white',
    },
    card:{
      //flex: 1,
      height: 225,
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      //paddingTop: 30
    },
    fondo:{
      flex: 1,
      height: null,
      width: null,
      borderRadius: 10,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent',
    },
    logopasaport:{
      resizeMode: 'stretch',
      height: 60,
      width: 100,
      marginTop:20,
      marginLeft: 25
      
    },
    logohotel:{
      resizeMode: 'stretch',
      width: 90,
      height: 55,
      marginTop: 20,
      marginRight: 35,
      //color: '#dabd6c'

      //display: ''
      
    },
    numbercard:{
      ...Platform.select({
        ios: {
          //backgroundColor: 'red',
        },
        android: {
          fontFamily: "Calibri",
          fontStyle: 'normal',
        },
      }),
      
      //color: '#c7b481',
      color: '#FFF',
      fontSize: 27,
      marginTop: 15,
      letterSpacing: 1
      
    },
    boxdetails:{
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    
    namecard:{
      ...Platform.select({
        ios: {
          //backgroundColor: 'red',
        },
        android: {
          fontFamily: "CREDC___",
          //fontFamily: 'Credit Card',
          fontStyle: 'normal',
        },
      }),
      
      //color: '#c7b481',
      color: '#FFF',
      textTransform: 'uppercase',
      fontSize: 20,
      
    },
    datecard:{
      fontFamily: "OCR A Std",
      fontStyle: 'normal',
      color: '#c7b481',
      fontSize: 10,
      marginTop: 5,
    },
    boxlogohotel:{
      position: 'absolute',
      right: 20,
      bottom: 10
    },
    detailscard:{
      position: 'absolute',
      left: 30,
      bottom: 20
    },
    
    options:{
      flex:1,
      marginTop: 25,
      marginLeft: 15,
      marginRight:15,
      justifyContent: 'space-around',
      alignContent: 'space-around',
      //marginBottom: 0,
      //padding: -10,
      //backgroundColor: 'red',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
      // borderColor: 'black',
      
      
    },
    itemHome:{
      flex: 1,
      flexDirection:'row',
      
      justifyContent: 'flex-start',
      alignItems: 'center',
      //alignContent: 'flex-end',
      marginTop: 10,
      marginLeft: 10,
      //marginBottom: 10,
      //backgroundColor: 'blue'
    },
    text:{
      marginLeft: 15,
      marginTop: 0,
      fontFamily: 'Roboto-Regular',
      fontSize: 17,
      color: '#404040',

      
    },
    footer:{
      //height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50
    },
    copyr:{
      
    },
    icono:{
      
    },
    description:{
      
    },
    detail:{
      position: 'absolute',
      right: 10
    },
    boxvalid:{
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 50,
      marginTop:-10,
      
    },
    valid:{
      resizeMode: 'stretch',
      width: 35,
       height: 20,
    },
    textvalid:{
      color: 'white',
      fontSize: 16,
      marginLeft: 5
    },
    linearGradient: {
      //flex: 1,
      //paddingLeft: 15,
      //paddingRight: 15,
      // /borderRadius: 5
      //backgroundColor: 'red'
    }

    

})

export default MyMembresy;
