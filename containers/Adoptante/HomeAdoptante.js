import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,ToastAndroid, ScrollView, FlatList, TextInput } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {Image,Icon} from 'react-native-elements'
import ActionButton from 'react-native-action-button'
import { myTheme } from '../../src/assets/styles/Theme'
import Selection from '../../src/components/Selection'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { NavigationEvents } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation';


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
        header: null
        // title: 'Mascotas',
        // hideRightComponent: 'hide',
        //back: true
    }

    constructor(props){
        super(props);
       
        
        this.state = {
            mascotas: []
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
                        
                        
                        arraymascotasstate.push(objMascota)
                        
                    });

                    this.setState({mascotas: arraymascotasstate})

                    //alert(JSON.stringify(arrayChilds,null,4))
                    
                })

           

            })

            //alert(JSON.stringify(arraymascotas,null,4))

            // arrayKeyFoundation.map((keyfoundation)=>{
                
            //     let refMascotas = firebase.database().ref('publicaciones/'+keyfoundation);
            // refMascotas.on('value',(snapshot)=>{
            //     //alert(JSON.stringify(snapshot,null,4))
            //     //snapshot.forEach((childSnapshot) =>{
            //         // key will be "ada" the first time and "alan" the second time
            //         var key = snapshot.key;
            //         // childData will be the actual contents of the child
            //         var dataMascota = snapshot.val();
            //         arraymascotas.push({key: key, value: dataMascota, keyfoundation: keyfoundation})
            //    // });
                
            // })

            // })


            // this.setState({
            //     mascotas: arraymascotas
            // })
        })


        //this.refs.SearchInput.focus();
        
    }


    Refresh = () => {
        const fundacion = firebase.auth().currentUser;
        //alert(JSON.stringify(this.props.navigation))
        //ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
        //let mascotas = [];
        let refFoundation = firebase.database().ref('publicaciones/')
        //alert(refFoundation.key);
        refFoundation.on('value',(snapshot) => {
           
            var arrayKeyFoundation = [];
            snapshot.forEach((childSnapshot) =>{
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                arrayKeyFoundation.push(key)
            });
            //alert(arrayKeyFoundation)
            let arraymascotas = [];
            arrayKeyFoundation.map((keyfoundation)=>{
                
            let refMascotas = firebase.database().ref('publicaciones/'+keyfoundation);
            refMascotas.on('value',(snapshot)=>{
                //alert(JSON.stringify(snapshot,null,4))
                snapshot.forEach((childSnapshot) =>{
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var dataMascota = childSnapshot.val();
                    var objMascota = {key: key, value: dataMascota, keyfoundation: keyfoundation}
                    arraymascotas.push(objMascota)
                });
                
            })

            })


            this.setState({
                mascotas: arraymascotas
            })
        })


        //this.refs.SearchInput.focus();
    }



    _keyExtractor = item => item.name;
    
    _renderItem = ({ item }) => this.renderItemPet(item)
    
    render() {
        const mascotas = this.state.mascotas
        
        //alert(JSON.stringify(mascotas.length,null,4))
        return (
        <View style={{flex:1}}>
            <NavigationEvents
                onDidFocus={() => {
                    
                }}
                />
            <View style={style.header}>
                    <TouchableOpacity  onPress={()=> this.props.navigation.openDrawer()} style={style.back}>
                        <Icon  name='menu' type='material' color='#FFF' size={28} />
                    </TouchableOpacity>

                    <TextInput style={style.input} 
                    placeholder="Buscar..." 
                    onChangeText={this.handleTexto}
                    ref='SearchInput'
                    ></TextInput>

                    <TouchableOpacity style={style.filter} onPress= {()=>{}}>
                        <Icon name='filter' type='material-community' color='#FFF' size={30}/>
                    </TouchableOpacity>

                </View>
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
                                <Text style={{fontSize:20, marginHorizontal: '10%', textAlign: 'center'}}>
                                    No existen publicaciones de mascotas
                                </Text>
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
            
            </View>
        )
    }

    renderItemPet = (item) => {
        const {key, value, keyfoundation} = item;
        return(
            <View style={style.boxitem}>
           
        <View style={style.item}>

        
               <View style={[style.boximg]}>
                       <TouchableOpacity 
                       style={{width: '100%', height: '100%'}} 
                       onPress={()=> {
                           this.props.navigation.push('PetDetails',{pet: item})}} >
                           <Image style={style.img} source={{uri: value.picture}}  />
                       </TouchableOpacity>
               </View>
               <View style={style.boxinfo}>
                    <Text style={style.title}>{value.name}</Text>
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
        borderRadius: 0,
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
