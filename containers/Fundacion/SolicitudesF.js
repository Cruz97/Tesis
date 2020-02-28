import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet,TouchableOpacity, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import {myTheme} from '../../src/assets/styles/Theme'
import { sendNotification } from '../../src/utils/PushNotifications'

export class SolicitudesF extends Component {

    static navigationOptions = {
        title: 'Solicitudes de Adopción',
        hideRightComponent: 'hide'
    }

    constructor(props){
        super(props);
       

        this.state = {
            solicitudes: [],
            item: {},
            publicaciones:{},
            usuarios: {},
            tokens: {}
        }
    }

    componentDidMount(){
        // var hoy = new Date()
        // var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        // var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        // var fechaYHora = fecha + ' ' + hora;
       

        let id = firebase.auth().currentUser.uid;
        let refSolicitudes = firebase.database().ref('solicitudes/'+id);
        refSolicitudes.on('value',(snapshot)=>{
            var arrayChilds = [];
            snapshot.forEach((childSnapshot) =>{
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                arrayChilds.push({key: key,data: childData})
            });
            this.setState({
                solicitudes: arrayChilds
            })
        })


        let idFoundation = firebase.auth().currentUser.uid;
        let refPublicaciones = firebase.database().ref('publicaciones/'+idFoundation)
        

        refPublicaciones.on('value',(snapshot)=>{
            var arrayPublicaciones = {};
            snapshot.forEach((child)=>{
                arrayPublicaciones[String(child.key)] = child.val()
            })
            //alert(JSON.stringify(arrayPublicaciones,null,4))
            this.setState({publicaciones: arrayPublicaciones})
        })

        
        let refUsuarios= firebase.database().ref('usuarios')
        

        refUsuarios.on('value',(snapshot)=>{
            var arrayUsuarios = {};
            snapshot.forEach((child)=>{
                arrayUsuarios[String(child.key)] = child.val()
            })
            //alert(JSON.stringify(arrayPublicaciones,null,4))
            this.setState({usuarios: arrayUsuarios})
        })

        let refTokens= firebase.database().ref('tokens')
        

        refTokens.on('value',(snapshot)=>{
            var arrayTokens = {};
            snapshot.forEach((child)=>{
                arrayTokens[String(child.key)] = child.val()
            })
            //alert(JSON.stringify(arrayPublicaciones,null,4))
            this.setState({tokens: arrayTokens})
        })


        // var idFoundation = this.state.idFoundation;
        //         //alert(idFoundation)
        //         let refToken = firebase.database().ref('tokens/'+idFoundation);
        //         refToken.on('value',(snapshot)=>{
        //             this.setState({tokenFoundation: snapshot.val().token})
        //         })
    }

    _keyExtractor = item => item.key;

    _renderItem = ({ item }) => this._renderItemSolicitud(item)

    _renderItemSolicitud = (item) => {
       
        const {key,data} = item;
        var obj = {}
        let idFoundation = firebase.auth().currentUser.uid;
        let pet = this.state.publicaciones[data.idPet];
        let user = this.state.usuarios[data.idUser];
        let objToken = this.state.tokens[data.idUser];

        //alert(JSON.stringify(pet,null,4))
        return(
            pet && user ? 
            (
                <TouchableOpacity
                onPress={()=>{
                    //alert(JSON.stringify(data.idPet,null,4))
                }} 
                 >
                    <ListItem
            title={'Mascota: '+pet.name}
            subtitle={'Adoptante: '+user.name+ ' '+user.lastname}
            leftAvatar={{
                source: {uri: pet.picture},
                title: item.name,
                size: 'large'
            }}
            bottomDivider
            chevron
            rightElement={
               ()=>{
                   switch (data.status_request) {
                       case 'NEW REQUEST':
                           return(
                            <TouchableOpacity
                            onPress={
                            ()=>{
                                let arrayTokens = [objToken.token];
                                if(data.status_request === 'NEW REQUEST'){
                                    sendNotification(
                                        arrayTokens,
                                        'Solicitud de Adopción',
                                        'La solicitud de adopción de mascota que enviaste está en revisión'
                                        )
                                }
                                this.props.navigation.navigate('InfoSolicitud',{user,pet, request: data, idFoundation, key, token: objToken.token}) 
            
                            }}
                            
            
                        ><Text style={style.new}>Revisar</Text></TouchableOpacity>
                           )
                           break;
                        case 'IN REVIEW':
                            return(
                                <TouchableOpacity
                                    onPress={data.status_request === 'NEW REQUEST' || 'IN REVIEW' ? 
                                    ()=>this.props.navigation.navigate('InfoSolicitud',{user,pet, request: data, idFoundation, key, token: objToken.token}) : ()=>{}}
                            
                                ><Text style={style.review}>En Revisión</Text></TouchableOpacity>
                            )
                            break;
                        case 'REJECTED':
                            return(
                                <Text style={style.rejected}>Rechazada</Text> 
                            )
                            break;
                        case 'APPROVED':
                            return(
                                <TouchableOpacity
                                onPress={
                                    ()=>this.props.navigation.navigate('InfoSolicitud',{user,pet, request: data, idFoundation, key, token: objToken.token}) 
                                }
                            >
                                <Text style={style.approved}>Aprobada</Text> 
                             </TouchableOpacity>  
                            )
                            break;
                        case 'SUCCESS':
                            return(
                                <Text style={style.approved}>Adoptado</Text>
                            )

                   
                       default:
                           break;
                   }

               }
            }
            />

        </TouchableOpacity>
            ): null )
    
    

        
    }

    render() {
        return (
            <View style={style.main}>
                {
                    this.state.solicitudes.length > 0 ?
                    (
                        <FlatList 
                    style={{flex:1}}
                    data={this.state.solicitudes.sort((a)=>{
                        if(a.data.status_request === 'REJECTED'){
                            return -1
                        }
                    }).sort((a)=>{
                        if(a.data.status_request === 'SUCCESS'){
                            return -1
                        }
                    }).sort((a)=>{
                        if(a.data.status_request === 'APPROVED'){
                            return -1
                        }
                    }).sort((a)=>{
                        if(a.data.status_request === 'IN REVIEW'){
                            return -1
                        }
                    }).sort((a)=>{
                        if(a.data.status_request === 'NEW REQUEST'){
                            return -1
                        }

                    })
                
                }
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />

                    ):
                    (
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold', 
                            fontSize: 22, 
                            color: '#999999'
                            }}>No se encontraron solicitudes</Text>
                    </View>

                    )
                }

                


            </View>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1
    },
    approved:{
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius:10,
        backgroundColor: myTheme['color-success-500'],
        color: '#fff'
    },
    rejected:{
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius:10,
        backgroundColor: myTheme['color-danger-500'],
        color: '#fff'
    },
    new:{
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius:10,
        backgroundColor: myTheme['color-primary-700'],
        color: '#fff'
    },
    review:{
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius:10,
        backgroundColor: myTheme['color-warning-600'],
        color: '#fff'
    }
})

export default SolicitudesF
