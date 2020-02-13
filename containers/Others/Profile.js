import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Avatar, Icon } from 'react-native-elements';
import Database from '../database'
import moment from 'moment';


export class Profile extends Component {

    static navigationOptions = {
        title: 'Mi perfil',
        hideRightComponent: 'hide',
    }
    constructor(props){
        super(props);
        const  uuid = props.navigation.getParam('uuid');
        this.state = {
            info: Database.CloudDB.get('User',uuid),
            
        }
    }

    componentDidMount(){
        //const membresy = Database.CloudDB.get('Membresy',this.state.info.)
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

      getNumberCert = () =>{
          let count = 0
          let cert = this.state.info.membresy.certificates;
          for(let i=0; i<this.state.info.membresy.certificates.length; i++){
            if(cert[i].status == 'not used')
                count++
          }
          return count
      }
    render() {
        return (
            <View style={style.main}>
                {/* {alert(JSON.stringify(this.state.info,null,2))} */}
                <View style={style.boxheader}>
                    {/* <View style={style.boxlogo1}>
                        <Image source={require('../assets/img/passoroverde.png')}  style={style.logopasaport}></Image>
                     </View> */}
                    {/* <View style={style.boxlogo2}>
                    <View>
                    <Image   source={require('../assets/img/Isologotipo-09.png')} style={{ 
                                ...StyleSheet.absoluteFillObject,
                                tintColor: '#c7b481',
                                opacity: 1,
                                width: 70,
                                height: 55,
                                //marginTop:2,
                                zIndex: 20
                                
                            
                            }} 
                            resizeMode='contain'/>
                         <Image source={require('../assets/img/Isologotipo-09.png')} style={style.logohotel}></Image>
                         </View>
                    </View> */}
                <Avatar
                containerStyle={{position: 'absolute',
                                top: 90,
                                zIndex: 1000,
                                borderWidth: 4,
                                borderColor: '#A88C3D',
                                borderRadius: 5
                                }}
                    //rounded
                    title={this.state.info.name[0]+''+ this.state.info.lastname[0]}
                    size={120}
                    // source={ require('../assets/img/profile.jpg')}
                    />


                    <Image 
                    source={require('../assets/img/DJI_0225.jpg')} 
                    style={style.picture}
                    resizeMode='cover'   
                    resizeMethod='auto'
                    />
                     <View style={style.box}>

                    </View>

                </View>

                <View style={style.boxinfo}>
                        <View style={style.name}>
                            <Text style={style.textname}>{this.state.info.name +' '+this.state.info.lastname}</Text>
                        </View>

                        <View style={style.card}>
                            <Text style={style.textcard}>{this.formatNumberCard(this.state.info.membresy.digits_card)}</Text>
                        </View>

                        <View style={style.boxaddress}>
                            <Icon
                            name='room'
                                type='material'
                                color='#517fa4'
                                size={20}
                                />
                                 <Text style={style.textpm}>{this.state.info.country}</Text>
                        </View>

                        <View style={style.boxaddress}>
                            <Icon
                                
                                name='location-city'
                                type='material'
                                color='#517fa4'
                                size={20}
                                />
                                 <Text style={style.textpm}>{this.state.info.address}</Text>
                        </View>

                        <View style={style.boxphonemail}>
                            <View style={style.boxphone}>
                            <Icon
                            
                            name='phone-android'
                            type='material'
                            color='#517fa4'
                            size={20}
                            />
                            <Text style={style.textpm}>{this.state.info.phone}</Text>

                            </View>

                            <View style={style.boxemail}>
                            <Icon
                            
                            name='email'
                            type='material'
                            color='#517fa4'
                            size={20}
                            />
                            <Text style={style.textpm}>{this.state.info.email}</Text>
                            </View>
                        </View>

                        <View style={style.boxmain}>
                            <View style={style.box1}>
                                <View style={style.box2}>
                                <Icon
                                    name='card-membership'
                                    type='material'
                                    color='#517fa4'
                                    size={35}
                                    />
                                    <Text style={style.textboxinfo}>Socio desde el</Text>
                                    <Text>{moment(this.state.info.membresy.partner_from).format('DD MMM YYYY')}</Text>
                                </View>
                                <View style={style.box2}>
                                <Icon
                                    name='new-releases'
                                    type='material'
                                    color='#517fa4'
                                    size={35}
                                    />
                                    <Text style={style.textboxinfo}>Vigencia hasta el</Text>
                                    <Text>{moment(this.state.info.membresy.date_expire).format('DD MMM YYYY')}</Text>
                               
                                </View>

                            </View>
                            <View style={style.box1}>
                                <View style={style.box2}>
                                <Icon
                                    name='monetization-on'
                                    type='material'
                                    color='#517fa4'
                                    size={35}
                                    />
                                    <Text style={style.textboxinfo}>Consumo actual</Text>
                                        <Text>$ {parseFloat(this.state.info.membresy.consumption).toFixed(2)}</Text>
                               
                                </View>
                                <View style={style.box2}>
                                <Icon
                                    name='receipt'
                                    type='material'
                                    color='#517fa4'
                                    size={35}
                                    />
                                    <Text 
                                    numberOfLines={1} 
                                    allowFontScaling={true} 
                                    //adjustsFontSizeToFit={true} 
                                    style={style.textboxinfo}>Certificados disponibles</Text>
                                        <Text>{
                                            this.getNumberCert()
                                            }</Text>
                                </View>

                            </View>

                        </View>


                </View>
               
            </View>
        )
    }
}

const style = StyleSheet.create({
    main:{
        flex:1,
    },
    boxheader:{
        flex:2,
        //width: '50%',
        //backgroundColor: 'skyblue',
        //borderBottomStartRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#A88C3D',
        //borderWidth: 4
        //height: 200
    },

    boxinfo:{
        flex: 6,
        borderTopColor: '#A88C3D',
        borderTopWidth: 4,
        //backgroundColor: 'red',
        zIndex: -1
    },
    picture:{
        width: '100%',
        height: '100%'
        //flex:1,
        //width: undefined, height: undefined
        
    },
    boxlogo1:{
        
        position:'absolute',
        bottom: 50, 
        left: 10,
        zIndex: 1001, 

    },
    boxlogo2:{
        
        position:'absolute',
        bottom: 50, 
        right: 30,
        zIndex: 1001, 

    },
    box:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,31,77,0.6)',
    },
    logopasaport:{
        resizeMode: 'stretch',
        height: 60,
        width: 100,
        marginTop:20,
        //marginLeft: 25
        
      },
      logohotel:{
        resizeMode: 'stretch',
        width: 70,
        height: 55,
        //top: 3
        //marginTop: 20
        //color: '#fff'
        //marginRight: 35
        
      },
      name:{
          marginTop: 70,
          flexDirection: 'row',
          justifyContent: 'center'
      },
      card:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
      textname:{
        ...Platform.select({
            ios: {
              //backgroundColor: 'red',
            },
            android: {
                fontFamily: 'Calibri',
            },
          }),
          
          fontSize: 17,
          fontWeight: 'bold'
      },
      textcard:{
        ...Platform.select({
            ios: {
              //backgroundColor: 'red',
            },
            android: {
                fontFamily: 'Calibri',
            },
          }),
        
        fontSize: 17,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: '#A88C3D',
        borderRadius: 15,
        color: 'white'
    },
      boxphonemail:{
          marginTop: 25,
          flexDirection: 'row',
          //justifyContent: 'space-evenly',
          //alignContent:  'center',

          //borderWidth: 1
          borderBottomWidth: 2,
          borderColor: '#A88C3D',
          paddingBottom: 8,
          marginLeft: 25,
          marginRight: 25,
         
         
      },
      boxphone:{
          flex: 1,
          flexDirection: 'row',
          borderRightWidth: 2,
          borderColor: '#A88C3D',
          marginLeft: 5
        //borderWidth: 4,
        //paddingBottom: 5,
        //borderColor: '#A88C3D',
        //borderBottomWidth: 4
        //alignContent: ''
      },
      boxemail:{
          flex: 1,
          flexDirection: 'row',
          marginLeft: 5
          //borderWidth: 4,
          //paddingBottom: 5,
          //borderColor: '#A88C3D',
          //borderBottomWidth: 4


      },
      textpm:{
        ...Platform.select({
            ios: {
              //backgroundColor: 'red',
            },
            android: {
                fontFamily: 'Calibri',
            },
          }),
          
          fontSize: 16,
          textAlign: 'center',
          marginLeft: 5,
          
         
      },
      boxaddress:{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 5
      },
      boxmain:{
          flex:1,
          //backgroundColor: 'red',
          margin: 20,
          borderRadius: 15,
          overflow: 'hidden',
            //borderWidth: 1
      },
      box1:{
          flex:1,
          flexDirection: 'row',
          //paddingBottom: 10,
          //marginTop: 10,
          //backgroundColor: 'green',
          //borderBottomWidth: 2
      }, 
      box2:{
        flex:1,
        borderBottomWidth: 2,
        borderColor: '#A88C3D',
        
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
        //flexDirection: 'column',
        
        //borderBottomWidth: 2
      },
      textboxinfo:{
          fontSize: 17,
          fontWeight: 'bold',
          textAlign: 'center',
          
          paddingBottom: 5
      }
      
    
})

export default Profile
