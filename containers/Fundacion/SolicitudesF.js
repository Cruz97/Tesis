import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet,TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import {myTheme} from '../../src/assets/styles/Theme'

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
            usuarios: {}
        }
    }

    componentDidMount(){
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
    }

    _keyExtractor = item => item.key;

    _renderItem = ({ item }) => this._renderItemSolicitud(item)

    _renderItemSolicitud = (item) => {
       
        const {key,data} = item;
        var obj = {}
        let idFoundation = firebase.auth().currentUser.uid;
        let pet = this.state.publicaciones[data.idPet];
        let user = this.state.usuarios[data.idUser];

        //alert(JSON.stringify(pet,null,4))
        return(
            pet && user ? 
            (
                <TouchableOpacity
                onPress={()=>{}} 
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
            rightElement={data.status_request === 'NEW REQUEST' ? 
            <TouchableOpacity
                onPress={data.status_request === 'NEW REQUEST' || 'IN REVIEW' ? 
                ()=>this.props.navigation.navigate('InfoSolicitud',{user,pet, request: data, idFoundation, key}) : ()=>{}}
            

            ><Text style={style.new}>Revisar</Text></TouchableOpacity> : 
            data.status_request === 'REJECTED' ? 
            <Text style={style.rejected}>Rechazada</Text> : data.status_request === 'APPROVED' ?  
            <Text style={style.approved}>Aprobada</Text> : 
            <TouchableOpacity
            onPress={data.status_request === 'NEW REQUEST' || 'IN REVIEW' ? 
            ()=>this.props.navigation.navigate('InfoSolicitud',{user,pet, request: data, idFoundation, key}) : ()=>{}}
    
        ><Text style={style.review}>En Revisión</Text></TouchableOpacity>
            }
            
            
           
        /> 
                </TouchableOpacity>
            ): null
        )
    }

    render() {
        return (
            <View style={style.main}>
                <FlatList 
                    style={{flex:1}}
                    data={this.state.solicitudes}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
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
