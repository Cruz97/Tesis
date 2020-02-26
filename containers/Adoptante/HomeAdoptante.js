import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,ToastAndroid, ScrollView, FlatList, TextInput } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Image,Icon, Overlay} from 'react-native-elements'
import ActionButton from 'react-native-action-button'
import { myTheme } from '../../src/assets/styles/Theme'
import Selection from '../../src/components/Selection'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { NavigationEvents } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation';
import { RadioButton } from 'react-native-paper';
import AlertCustom from '../../components/AlertCustom'



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

export class HomeAdoptante extends Component {

    static navigationOptions = {
        // header: null
        title: 'Mascotas',
        hideRightComponent: 'hide',
        //back: true
    }

    constructor(props){
        super(props);
       
        
        this.state = {
            mascotas: [],
            checkedSpice: '-1',
            checkedGender: '-1',
            showFilter: false,
            countAdoptions: 0,
            modalVisible: false,
            titleAlert: '',
            msgAlert: ''
        }
       

        
       //alert(JSON.stringify(mascotas))

        // this.state={
        //     selected:'',
        //     mascotas: mascotas
        // }
    }

    // componentDidUpdate(prevProps){
    //     if(this.state.mascotas !== prevProps.mascotas){
    //         //this.setState({mascotas: prevProps.mascotas})
    //     }
    //     else{
    //         this.setState({mascotas: []})
    //     }
    // }
 



    componentDidMount(){

       
        //alert('didmount')
        //const fundacion = firebase.auth().currentUser;
        //alert(JSON.stringify(this.props.navigation))
        //ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
        //let mascotas = [];
        let refFoundation = firebase.database().ref('publicaciones/')
        //alert(refFoundation.key);
        refFoundation.on('value',(snapshot) => {
            this.setState({mascotas: []})
        //    alert(JSON.stringify(snapshot,null,4))
            var arrayKeyFoundation = [];
            snapshot.forEach((childSnapshot) =>{
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                arrayKeyFoundation.push(key)
            });
            //alert(JSON.stringify(arrayKeyFoundation,null,4))
            let arraymascotas = [];

            arrayKeyFoundation.map((keyfoundation)=>{
                
                let refMascotas = firebase.database().ref('publicaciones/'+keyfoundation);
                refMascotas.on('value',(snapshot)=>{
                    //alert(snapshot)
                    //alert(JSON.stringify(snapshot,null,4))
                    //let arrayChilds = [];
                    var arraymascotasstate = this.state.mascotas;
                    snapshot.forEach((childSnapshot) =>{
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;
                        //alert(key)
                        // childData will be the actual contents of the child
                        var dataMascota = childSnapshot.val();
                        //alert(JSON.stringify(childSnapshot,null,4))
                        var objMascota = {key: key, value: dataMascota, keyfoundation: keyfoundation}
                        
                        
                        if(dataMascota.status === 'FOR_ADOPTION'){
                            arraymascotasstate.push(objMascota)
                        }
                        
                    });

                    this.setState({mascotas: arraymascotasstate})
                })
            })
        })
        
    }


    Refresh = () => {
        let refFoundation = firebase.database().ref('publicaciones/')
        //alert(refFoundation.key);
        refFoundation.on('value',(snapshot) => {
            this.setState({mascotas: []})
        //    alert(JSON.stringify(snapshot,null,4))
            var arrayKeyFoundation = [];
            snapshot.forEach((childSnapshot) =>{
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                arrayKeyFoundation.push(key)
            });
            //alert(JSON.stringify(arrayKeyFoundation,null,4))
            let arraymascotas = [];

            arrayKeyFoundation.map((keyfoundation)=>{
                
                let refMascotas = firebase.database().ref('publicaciones/'+keyfoundation);
                refMascotas.on('value',(snapshot)=>{
                    //alert(snapshot)
                    //alert(JSON.stringify(snapshot,null,4))
                    //let arrayChilds = [];
                    var arraymascotasstate = this.state.mascotas;
                    snapshot.forEach((childSnapshot) =>{
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;
                        //alert(key)
                        // childData will be the actual contents of the child
                        var dataMascota = childSnapshot.val();
                        //alert(JSON.stringify(childSnapshot,null,4))
                        var objMascota = {key: key, value: dataMascota, keyfoundation: keyfoundation}
                        
                        if(dataMascota.status === 'FOR_ADOPTION')
                            arraymascotasstate.push(objMascota)
                        
                    });

                    this.setState({mascotas: arraymascotasstate})
                })
            })
        })
    }



    _keyExtractor = item => item.name;
    
    _renderItem = ({ item }) => this.renderItemPet(item)
    
    render() {
        const mascotas = this.state.mascotas
        const { checked } = this.state;
        //alert(JSON.stringify(mascotas.length,null,4))
        return (
        <View style={{flex:1}}>
             <AlertCustom 
                    modalVisible={this.state.modalVisible}
                    onBackdropPress={()=>{this.setState({modalVisible: false}); }}
                    source={require('../../assets/img/nopet3.jpg')}
                    title={this.state.titleAlert}
                    subtitle={this.state.msgAlert}
                    textButton='Aceptar'
                    onPress={()=>{
                        this.setState({modalVisible: false})
                        //this.setModalVisible(false)
                        
                    }}/>
            <Overlay
            isVisible={this.state.showFilter}
            windowBackgroundColor="rgba(0, 0, 0, .6)"
            overlayBackgroundColor="white"
            onBackdropPress={()=>{
                this.setState({
                    checkedGender: '-1',
                    checkedSpice: '-1',
                    showFilter: false
                })
                this.Refresh()
            }}
            width={350}
            height={230}
            overlayStyle={{
               
                paddingHorizontal:5, 
                paddingVertical:5, 
                borderRadius: 20}}
            >
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{textAlign: 'center', fontWeight:'bold', fontSize: 20}}>Filtrar por: </Text>
                        </View>
                
                <View style={{height: 70, 
                    //flex:1,
                    backgroundColor: '#fff', 
                    flexDirection: 'row', 
                    overflow: 'hidden'
                    }}>
                        
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    
                    <RadioButton.Group
                        onValueChange={value => this.setState({ checkedSpice: value })}
                        value={this.state.checkedSpice}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'center', flex:1}}>
                        <Text style={{fontWeight:'bold', fontSize: 16}}>Especie</Text>
                        
                        </View>
                        
                        <View style={{flexDirection: 'row', alignItems: 'center', flex:1}}>
                        <Text>Canina</Text>
                        <RadioButton value="0" />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', flex:1}}>
                        <Text>Felina</Text>
                        <RadioButton value="1" />
                        </View>
                    </RadioButton.Group>
                    </View>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <RadioButton.Group
                        onValueChange={value => this.setState({ checkedGender: value })}
                        value={this.state.checkedGender}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'center', flex:1}}>
                        <Text style={{fontWeight:'bold', fontSize: 16}}>Sexo</Text>
                        
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center',  flex:1}}>
                        <Text>Macho</Text>
                        <RadioButton value="1" />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', flex:1}}>
                        <Text>Hembra</Text>
                        <RadioButton value="0" />
                        </View>
                    </RadioButton.Group>
                    </View>
                </View>

                <View style={{height: 100, flexDirection: 'row' , justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{
                            backgroundColor: myTheme['color-danger-500'], 
                            paddingHorizontal: 20, 
                            borderRadius: 20,
                            paddingVertical: 5
                            }}
                            onPress={()=>{
                                this.setState({
                                    checkedGender: '-1',
                                    checkedSpice: '-1',
                                    showFilter: false
                                })
                                this.Refresh()
                            }}
                            >
                            <Text style={{color: '#fff'}}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: myTheme['color-success-500'], 
                            paddingHorizontal: 20,
                            borderRadius:20,
                            //marginTop: 5,
                            paddingVertical: 5
                            }}
                            
                            onPress={()=>{
                                //let refSearch = firebase.database().ref(publicaciones)
                                let indexEspecie = parseInt(this.state.checkedSpice) 
                                let indexGenero = parseInt(this.state.checkedGender) 

                                if(indexGenero == -1){
                                    alert('Seleccione todos los parámetros')
                                    return
                                }

                                //this.Refresh()

                                let newarray = [...this.state.mascotas].filter(obj => obj.value.spice == indexEspecie && obj.value.gender == indexGenero)
                                
                                let refFoundation = firebase.database().ref('publicaciones/')
        //alert(refFoundation.key);
        refFoundation.on('value',(snapshot) => {
            this.setState({mascotas: []})
            var arrayKeyFoundation = [];
            snapshot.forEach((childSnapshot) =>{
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                arrayKeyFoundation.push(key)
            });
            let arraymascotas = [];

            if(indexEspecie !== -1 && indexGenero !==-1){
                arrayKeyFoundation.map((keyfoundation)=>{
                
                    let refMascotas = firebase.database().ref('publicaciones/'+keyfoundation);
                    refMascotas.on('value',(snapshot)=>{
                        var arraymascotasstate = this.state.mascotas;
                        snapshot.forEach((childSnapshot) =>{
                            var key = childSnapshot.key;
                            var dataMascota = childSnapshot.val();
                            var objMascota = {key: key, value: dataMascota, keyfoundation: keyfoundation}
                            if(dataMascota.status === 'FOR_ADOPTION' && dataMascota.spice === indexEspecie && dataMascota.gender === indexGenero)
                                arraymascotasstate.push(objMascota)
                            
                        });
    
                        this.setState({mascotas: arraymascotasstate, 
                            checkedGender: '-1',
                            checkedSpice: '-1',
                            showFilter: false})
                    })
                })
            }
            else{
                arrayKeyFoundation.map((keyfoundation)=>{
                
                    let refMascotas = firebase.database().ref('publicaciones/'+keyfoundation);
                    refMascotas.on('value',(snapshot)=>{
                        var arraymascotasstate = this.state.mascotas;
                        snapshot.forEach((childSnapshot) =>{
                            var key = childSnapshot.key;
                            var dataMascota = childSnapshot.val();
                            var objMascota = {key: key, value: dataMascota, keyfoundation: keyfoundation}
                            //if(dataMascota.spice === indexEspecie)
                            arraymascotasstate.push(objMascota)
                            
                        });
    
                        this.setState({mascotas: arraymascotasstate, 
                            checkedGender: '-1',
                            checkedSpice: '-1',
                            showFilter: false})
                    })
                })
            }
        })
                            }}
                            
                            >
                            <Text style={{color: '#fff'}}>Buscar</Text>
                        </TouchableOpacity>

                    </View>
                    

            </Overlay>
            {/* <View style={style.header}>
                    <TouchableOpacity  onPress={()=> this.props.navigation.openDrawer()} style={style.back}>
                        <Icon  name='menu' type='material' color='#FFF' size={28} />
                    </TouchableOpacity>

                    <TextInput style={style.input} 
                    placeholder="Buscar..." 
                    onChangeText={this.handleTexto}
                    ref='SearchInput'
                    ></TextInput>

                    <TouchableOpacity style={style.filter} onPress= {()=>{
                        this.setState({showFilter: true})
                    }}>
                        <Icon name='filter' type='material-community' color='#FFF' size={30}/>
                    </TouchableOpacity>

                </View> */}
                

                    {
                        mascotas.length > 0 ?
                        (
                            <FlatList
                                style={{flex:1}}
                                data={mascotas}
                                keyExtractor={this._keyExtractor}     //has to be unique   
                                renderItem={this._renderItem} //method to render the data in the way you want using styling u need
                                horizontal={false}
                                numColumns={3}
                                        />
                        ):
                        (
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold', 
                            fontSize: 22, 
                            color: '#999999'
                            }}>No se encontraron resultados</Text>
                            <TouchableOpacity style={{
                                marginTop: 20,
                                paddingVertical: 15,
                                backgroundColor: myTheme['color-primary-transparent-500'],
                                paddingHorizontal: 40,
                                borderRadius: 25
                            }}
                                onPress={()=>{
                                    this.Refresh()
                                }}
                            >
                                <Text style={{
                                    color: '#fff'
                                }}>Actualizar</Text>
                            </TouchableOpacity>
                    </View>
                        )
                        
                        
                    }
                 
                     
                    

                
            
            


                {/* <Selection  
                items={dropdownlist} 
                title='Tipos' 
                selectedKey={false}   
                selectedValue={this.state.selected}  
                showValue={false}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                      selected: itemValue
                    })
                   
                }} */}
               
                {/* /> */}
            {/* </ScrollView> */}
            {/* <ActionButton
                    buttonColor={myTheme['color-primary-700']}
                    onPress={() => this.props.navigation.push('Publication') }
                    
                    position='right'
                    offsetX={10}
                    offsetY={5}
                    
                    /> */}
                   
                  
                       <ActionButton
                       buttonColor={'#780C88'}
                       onPress={() => this.setState({showFilter: true}) }
                       renderIcon={()=>{
                           return <Icon name='filter' type='material-community' color='#FFF' size={20}/>
                       }}
                       size={40}
                       
                       position='right'
                       offsetX={15}
                       offsetY={20}
                       
                       />
                   
            
            </View>
        )
    }

    goToDetails = (item) => {
        const {key, value, keyfoundation} = item;
        const idUser = firebase.auth().currentUser.uid;
        let refLog = firebase.database().ref('adoptionLog/'+keyfoundation);
                        var aux = -1;
                        var fecha = '';
                        refLog.on('value',(snapshot)=>{
                            var count = 0;
                            snapshot.forEach((child)=>{
                                let log = child.val()
                                let idUserLog = log.idUser;
                                
                                if(idUserLog === idUser)
                                    {
                                        count++;
                                        fecha = log.adoption_date
                                        aux = count
                                    }
                            })
                            if(count>0){
                                var arrayFecha = fecha.split(' ');
                                this.setState({
                                    titleAlert: 'Por el momento no puede adoptar ésta mascota.',
                                    msgAlert: 'Usted ya registra una adopción con ésta fundación. El '+arrayFecha[0]+' a las '+arrayFecha[1],
                                    modalVisible: true
                                })

                                
                                return
                            }
                            this.props.navigation.push('PetDetails',{pet: item})
                            //alert(JSON.stringify(snapshot,null,4))
                        })
    }

    renderItemPet = (item) => {
        const {key, value, keyfoundation} = item;
        const idUser = firebase.auth().currentUser.uid;
        return(
            <View style={style.boxitem}>
           
        <View style={style.item}>

        
               <View style={[style.boximg]}>
                       <TouchableOpacity 
                       style={{width: '100%', height: '100%'}} 
                       onPress={()=> {
                        this.goToDetails(item)
                        }
                        
                        } 
                           >
                           <Image style={style.img} source={{uri: value.picture}}  />
                       </TouchableOpacity>
               </View>
               <View style={style.boxinfo}>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.goToDetails(item)
                            
                        }}
                    >
                        <Text style={style.title}>{value.name}</Text>
                    </TouchableOpacity>
               </View>
               
               

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
    header:{
        height: 55,
        backgroundColor: myTheme['color-info-800'],
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    back:{
        marginLeft: 15,
        marginTop: 12
    },
    filter:{
        marginRight: 20,
        marginTop: 10
    },
    input:{
        flex: 1,
        
        //marginLeft: 25,
        //width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 10,
        
        margin: 10,
        fontSize: 15,
        fontWeight: '700',
        //borderWidth: 1,
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'white'
        
    }, 
    boxitem:{
        //flex:2,
        // backgroundColor: 'blue',    
        //height: 250,
        width: '33%'
    },
    item:{
        flex: 2,
       // width: '100%',
        flexDirection: 'column',
        marginBottom: 5,
        marginLeft: 2,
        marginRight:2,
        marginTop: 2,
        borderRadius: 10,
        //resizeMode: 'c',
        overflow: 'hidden',
        height: 190,
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
        height: 150
        
       },
       boxinfo:{
           
        flex:1,
        backgroundColor: myTheme['color-primary-600'],
        justifyContent: 'center'
        //paddingBottom: 60,
        //marginTop: 10
       },
       img:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        
       },
       title:{
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#FFF'
       
        //marginTop: 5,
        //marginBottom: 10
    },
    infofundacion:{
        fontSize: 13,
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10
    },
})

export default withNavigationFocus(HomeAdoptante);
