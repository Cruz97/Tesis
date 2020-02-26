import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,ScrollView, FlatList, PickerIOSItem } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Image,Icon} from 'react-native-elements'
import ActionButton from 'react-native-action-button'
import { myTheme } from '../../src/assets/styles/Theme'
import Selection from '../../src/components/Selection'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import AlertDeleteCustom from '../../components/AlertDeleteCustom';



const dropdownlist = [
    {
        key: '1',
        value: '1'
    },
    {
        key: '2',
        value: '2'
    }
]

export class MascotasF extends Component {

    static navigationOptions = {
        title: 'Publicaciones',
        hideRightComponent: 'hide',
    }

    constructor(props){
        super(props);

        this.state={
            selected:'',
            mascotas: [],
            modalVisible: false, 
            key: '',
            refresh: false
        }
    }



    componentDidMount(){
       
          
      
           
          

        // if (!firebase.messaging().isRegisteredForRemoteNotifications) {
        //      firebase.messaging().registerForRemoteNotifications();
        //   }
        //firebase.messaging().set

        //alert(JSON.stringify(fcmToken))
        
        //alert(JSON.stringify(this.props.navigation))
        //alert('didmount')
        //this.setState({mascotas: []})
        const fundacion = firebase.auth().currentUser;
        //this.setState({mascotas:[]})
        let arraymascotas = []
        let refFoundation = firebase.database().ref('publicaciones/'+fundacion.uid)
        //alert('didmout')
        refFoundation.on('value',snapshot => {
            //alert('entro al on')
            let newarray = []
          snapshot.forEach((data)=>{
              let mascota = data.val()
              newarray.push({key: data.key, value: mascota})
          })  
          this.setState ( {
              mascotas: Array.from(newarray),
              refresh: true
          })
          //alert(JSON.stringify(newarray,null,4))
         })

         //this.setState({refresh: false})



        refFoundation.on('child_added',snapshot => {        
            arraymascotas.push({key: snapshot.key,value: snapshot.val()})
         this.setState ( {
             mascotas: Array.from(arraymascotas)
         })
        // alert('added => '+JSON.stringify(this.state.mascotas,null,4))
        })

        refFoundation.on('child_changed',snapshot => {
            let arrayAcual = this.state.mascotas;
            arrayAcual.map((item,index)=>{
                if(item.key === snapshot.key){
                    arrayAcual[index] = {key: snapshot.key, value: snapshot.val()}
                }
            })
            this.setState({mascotas: arrayAcual})
           // alert('changed => '+JSON.stringify(this.state.mascotas,null,4))
         })


         refFoundation.on('child_removed',snapshot => {    
             //alert(JSON.stringify(snapshot,null,4)) 
            let array1 = this.state.mascotas;
            let arrayFinal = this.state.mascotas;
            let indice = -1;
            array1.map((item,index)=>{
                if(item.key === snapshot.key){
                    indice = index;
                    // /break;
                    // arrayFinal.splice(index,1)
                    // this.setState({mascotas: arrayFinal})
                }
            })
            if(indice != -1){
                array1.slice(indice,1)
                this.setState({mascotas: array1})

            }
            
           // alert('remove => '+JSON.stringify(this.state.mascotas,null,4))
            
         })
       
        
    }

    onPressCancel = () => {
        this.setState({modalVisible: false, key: ''})
    }

    onPressOK = () =>{
        const key = this.state.key;
        const fundacion = firebase.auth().currentUser;
        let refPet = firebase.database().ref('publicaciones/'+fundacion.uid+'/'+key);
                   
        refPet.remove().then(()=>{
            // setTimeout(() => {
             
                 this.setState({
                     key: '',
                     modalVisible: false
                 })

                 
 
         }).catch(error=>{
             alert(error.message)
         });

        //this.setState({modalVisible: false})
    }

    _keyExtractor = item => item.key;
    
    _renderItem = ({ item }) => this.renderItemPet(item)
    
    render() {
        //const mascotas = Array.from(this.state.mascotas)
        const mascotas = this.state.mascotas;
        return (
        <View style={{flex:1}}>

                   <AlertDeleteCustom 
                    modalVisible={this.state.modalVisible}
                    onBackdropPress={()=>{this.setState({modalVisible: false}); this.props.navigation.navigate('MascotasF')}}
                    source={require('../../assets/img/trashgif.gif')}
                    title='Atencion!'
                    subtitle='Esta seguro de que desea eliminar esta mascota?'
                    textOK='Aceptar'
                    textCancel='Cancelar'
                    onPressCancel={this.onPressCancel.bind(this)}
                    onPressOK = {this.onPressOK.bind(this)}

                />

                 
                     <FlatList
                     style={{flex:1}}
                     data={this.state.mascotas}
                     keyExtractor={this._keyExtractor}     //has to be unique   
                     renderItem={this._renderItem} //method to render the data in the way you want using styling u need
                     horizontal={false}
                    //  refreshing={this.state.refresh}
                    //  extraData={this.state}
                    //  onRefresh = {()=>{
                    //      this.setState({mascotas: []})
                    //  }}
                     //chan
                     numColumns={2}
                               />
                    

            
          
                <ActionButton
                    buttonColor={'#780C88'}
                    onPress={() => this.props.navigation.push('Publication') }
                    
                    position='right'
                    offsetX={10}
                    offsetY={40}
                    
                    />
           
            
            </View>
        )
    }

    renderItemPet = (item) => {
        const {key,value} = item;
        return(
            <View style={style.boxitem}>
           
        <View style={[style.item,{borderColor: value.status === 'ADOPTED' ? 'red' : 'green', borderWidth:1}]}>

            {/* <TouchableOpacity> */}
               <View style={[style.boximg]}>
                       <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=> {}} >
                           <Image style={style.img} source={{uri: value.picture}}  />
                       </TouchableOpacity>
               </View>
              
              <View style={[style.boxinfo]}>
                    <Text style={style.title}>{value.name}</Text>
                    <TouchableOpacity style={{marginRight: 10}}
                        onPress={()=>{
                            this.props.navigation.navigate('Publication',{pet: item, action: 'edit'})
                        }}
                    >
                        <Icon name='edit' size={26} color={myTheme['color-material-primary-400']} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    disabled = {value.status === 'ADOPTED'? true : false}
                    onPress={
                        ()=>{
                            
                            this.setState({
                                modalVisible: true, 
                                key
                            })
                        }
                    }>
                        <Icon name='delete-sweep' size={26} color={myTheme['color-material-primary-400']} />
                    </TouchableOpacity>
               </View>
              
               {/* </TouchableOpacity> */}
               
               

           </View>
        </View>
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
        //flex:2,
        // backgroundColor: 'blue',    
        //height: 250,
        width: '50%',
        //marginHorizontal: 10,
        
    },
    item:{
        //flex: 2,
       // width: '100%',
        flexDirection: 'column',
        marginBottom: 5,
        //marginLeft: 15,
        //marginRight:15,
        marginTop: 10,
        marginHorizontal: '5%',
        borderRadius: 5,
        //resizeMode: 'c',
        overflow: 'hidden',
        height: 210,
        //width: '30%',
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
        width: '100%',
        height: 160,
       
        
       },
       boxinfo:{
           
        // flex:1,
        paddingVertical:10,
        paddingHorizontal: 10,
        
        flexDirection: 'row',
        //backgroundColor: myTheme['color-primary-600'],
        justifyContent: 'flex-start',
        //paddingBottom: 60,
        //marginTop: 10
       },
       img:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        
       },
       title:{
           flex:1,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'left',
        marginHorizontal: 10,
        color: myTheme['color-material-primary-500']
        //color: '#FFF'
       
        //marginTop: 5,
        //marginBottom: 10
    },
    infofundacion:{
        fontSize: 13,
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
})

export default MascotasF
