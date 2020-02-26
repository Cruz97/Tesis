import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet,TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import {myTheme} from '../../src/assets/styles/Theme'

export class Solicitudes extends Component {

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
            usuario: {},
            keysSolicitudes: [],
            keysFoundations:[],
            myrequests: [],
            fundaciones: {}
            
        }
    }

    componentDidMount(){
        let id = firebase.auth().currentUser.uid;

        let refFoundations = firebase.database().ref('usuarios/'+id)
        let refRequests = refFoundations.child('myrequests')
        refRequests.on('value',(snapshot)=>{
            var requests = [];
            snapshot.forEach((childSnapshot)=>{
                let value = childSnapshot.val();
                let key = childSnapshot.key;
                let idFoundation = value.idFoundation;
                let idRequest = value.idRequest;
                let obj = {key,idFoundation,idRequest}
                //requests.push(obj)
                let arrayRequest = this.state.solicitudes;
                arrayRequest.push(obj)
                this.setState({solicitudes: arrayRequest})
            })

            let solicitudes = this.state.solicitudes;

            solicitudes.map((request)=>{
                let refRequest = firebase.database().ref('solicitudes/'+request.idFoundation+'/'+request.idRequest);
                refRequest.on('value',(snapshot)=>{
                    let myrequests = this.state.myrequests;
                    let obj = {key: snapshot.key, data: snapshot.val(), idFoundation: request.idFoundation}
                    //alert(JSON.stringify(obj,null,4))
                    myrequests.push(obj);
                    this.setState({myrequests})
                })
            })

        })

        let refFundaciones = firebase.database().ref('fundaciones');
        refFundaciones.on('value',(snapshot)=>{
            var fundaciones = this.state.fundaciones;
            snapshot.forEach((childSnapshot)=>{
                fundaciones[String(childSnapshot.key)] = childSnapshot.val()

                let idFoundation = childSnapshot.key;
                let refPublicaciones = firebase.database().ref('publicaciones/'+idFoundation)
                
                refPublicaciones.on('value',(snapshot)=>{
                    var arrayPublicaciones = this.state.publicaciones;
                    snapshot.forEach((child)=>{
                        arrayPublicaciones[String(child.key)] = child.val()
                        //alert(JSON.stringify(child))
                    })
                    //alert(JSON.stringify(arrayPublicaciones,null,4))
                    this.setState({publicaciones: arrayPublicaciones})
                })

            })
            //alert(JSON.stringify(fundaciones,null,4))
            this.setState({fundaciones})
        })

        

        
        //Obtiene los Datos del Usuario Actual
        let refUsuarios= firebase.database().ref('usuarios/'+firebase.auth().currentUser.uid)
        refUsuarios.on('value',(snapshot)=>{
            //alert(JSON.stringify(snapshot,null,4))
            this.setState({usuario: snapshot.val()})
        })




    }

    _keyExtractor = item => item.key;

    _renderItem = ({ item }) => this._renderItemSolicitud(item)

    _renderItemSolicitud = (item) => {
      
       
        const {key,data, idFoundation} = item;
        //var obj = {}
        //alert(data.idPet)
        //let idFoundation = firebase.auth().currentUser.uid;
        let pet = data ? this.state.publicaciones[data.idPet] : null;
        let user = this.state.usuario;
        let foundation = this.state.fundaciones[idFoundation];

        //alert(JSON.stringify(data.idFoundation,null,4))
 
        
        return(
            pet && user && foundation ? 
            (
                <TouchableOpacity 
                //      onPress={()=>{
                // this.props.navigation.navigate('InfoSolicitud',{user,pet, request: data})
            
                >
                    <ListItem
            title={'Mascota: '+pet.name}
            subtitle={'Fundación: '+foundation.name}
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
                             <Text style={style.new}>Enviada</Text>
                            )
                            break;
                         case 'IN REVIEW':
                             return(
                                <Text style={style.review}>Revisada</Text>
                             )
                             break;
                         case 'REJECTED':
                             return(
                                 <Text style={style.rejected}>Rechazada</Text> 
                             )
                             break;
                         case 'APPROVED':
                             return(
                                <Text style={style.approved}>Aprobada</Text> 
                              
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
            ): null
        )
    }

    render() {
        //alert(JSON.stringify(this.state.myrequests,null,4))
        return (
            <View style={style.main}>
                {
                    this.state.myrequests.length > 0 ?
                    (
                        <FlatList 
                    style={{flex:1}}
                    data={this.state.myrequests}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
                    ) :
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold', 
                            fontSize: 22, 
                            color: '#999999'
                            }}>No se encontraron solicitudes</Text>
                    </View>

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

export default Solicitudes
