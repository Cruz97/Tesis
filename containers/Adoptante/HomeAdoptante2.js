import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { withStyles } from 'react-native-ui-kitten';
import {myTheme} from '../../src/assets/styles/Theme'
import { Avatar, Icon } from 'react-native-elements';
import ButtonCustom from '../../components/ButtonCustom'
import {  Button, Card, Title,Paragraph } from 'react-native-paper';
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import ActionButton from 'react-native-action-button'


export class HomeAdoptante extends Component {

    constructor(props){
        super(props);
       // alert(JSON.stringify(firebase.auth().currentUser,null,4))
    }

    static navigationOptions = {
        title: 'Inicio Adoptante',
        hideRightComponent: 'hide',
    }
    render() {
        let arr = [1,2,3,4,5]
        return (
        <View style={style.main}>
           <ScrollView style={style.main}>
                
               {
                   arr.map((index,ele)=>{
                       return(
                        // this.renderItem(index,ele)
                        <MyCard/>
                       )
                   })
               }

              
               

           </ScrollView>

           </View>
        )
    }

    renderItem = (index,element) => {
        return(
            <View key={index} style={style.box}>
               
                <View style={style.boxdetails}>
                    <View style={style.boximg}>
                    <Avatar
                        // rounded
                        size={120}
                        source={require('../../assets/img/masc2.jpg')}
                        />
                         <View style={style.title}>
                            <Text style={style.txttitle}>Tony</Text>
                        </View>
                    </View>
                    <View style={style.boxinfo}>
                        <Text style={style.description}>
                            Género : Macho
                        </Text>
                        <Text style={style.description}>
                            Edad : Cachorro
                        </Text>
                        <Text style={style.description}>
                            Descripcion
                        </Text>
                        <Text style={style.txtdescripcion} numberOfLines={4}>
                        {/* Tony es un cachorrito de aproximadamente seis meses. 
                        Fue rescatado cuando estaba colgando de un árbol, sujetado por el cuello con un alambre de luz. 
                        Quien lo dejó así quizo ahorcarlo. Alguien, al pasar, lo vio en esa situación y lo ayudó. 
                        Es un perrito jugueton de raza mediana, muy activo; ideal para espacios grandes. 
                        Se encuentra vacunado y esterilizado. */}
                        </Text>
                        <View style={style.boxbtn}>
                        <ButtonCustom  
                            title="Ver más"
                            colorcustom={myTheme['color-primary-700']}
                            
                            buttonStyle={
                                {
                                    marginTop:10,
                                    width: 120,
                                    

                                    
                                }
                            }
                            onPress={()=>{
                               
                            }}
                            
                           />
                        </View>

                    </View>

                </View>

            </View>
        )
    }
}


const MyCard = () => (
    <Card onPress={()=>{alert('view')}} style={style.card}>
      
      <Card.Content>
                <View style={{
                            width: '100%',
                            height: 20,
                            backgroundColor: 'white',
                            alignItems: 'flex-start'
                            
                        }}>
                            <Text style={style.txttitle}>
                               Tony
                            </Text>

                        </View>
      <View style={style.boxdetails}>

                    
          
                    <View style={style.boximg}>
                       
                   
                    <Avatar
                        // rounded
                        size={120}
                        source={require('../../assets/img/masc1.jpg')}
                        />
                        <View style={style.boxbtn}>
                        <ButtonCustom  
                            title="Ver más"
                            colorcustom={myTheme['color-primary-700']}
                            buttonStyle={
                                {
                                    marginTop:10,
                                    width: 120,
                                    borderRadius: 5,
                                    marginTop: -5
                                   
                                    
                                }
                            }
                            onPress={()=>{
                               
                            }}
                            
                           />

                        </View>
                    
                    </View>
                    <View style={style.boxinfo}>
                    
                    
                        <View style={style.iteminfo}>
                        <Icon
                                    name='pets'
                                    type='material'
                                    color='#517fa4'
                                    size={20}
                                    />
                            <Text style={style.description}>
                                Género : Macho
                            </Text>

                        </View>
                        <View style={style.iteminfo}>
                        <Icon
                                    name='today'
                                    type='material'
                                    color='#517fa4'
                                    size={20}
                                    />
                            <Text style={style.description}>
                                Edad : Cachorro
                            </Text>

                        </View>

                        <View style={style.iteminfo}>
                        <Icon
                                    name='room'
                                    type='material'
                                    color='#517fa4'
                                    size={20}
                                    />
                            <Text style={style.description} numberOfLines={1}>
                                Ubicacion : Av Francisco de Orellana
                            </Text>

                        </View>

                        <View style={style.iteminfo}>
                        <Icon
                                    name='store'
                                    type='material'
                                    color='#517fa4'
                                    size={20}
                                    />
                            <Text style={style.description}>
                                Fundación :  
                            </Text>

                        </View>
                        <Text style={style.txtdescripcion} numberOfLines={4}>
                        {/* Tony es un cachorrito de aproximadamente seis meses. 
                        Fue rescatado cuando estaba colgando de un árbol, sujetado por el cuello con un alambre de luz. 
                        Quien lo dejó así quizo ahorcarlo. Alguien, al pasar, lo vio en esa situación y lo ayudó. 
                        Es un perrito jugueton de raza mediana, muy activo; ideal para espacios grandes. 
                        Se encuentra vacunado y esterilizado. */}
                        </Text>
                       

                        
                        

                    </View>

                </View>
       
      </Card.Content>
      
    </Card>
  );

const style = StyleSheet.create({
    main:{
        flex:1
    },
    card:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5,
        marginRight:5,
        marginTop: 5,
        overflow: 'hidden',
        height: 220,
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
    box:{
        marginTop: 20
    },
    title:{
        paddingTop: 5,
        paddingBottom:10,
        // backgroundColor: myTheme['color-info-transparent-300'],  
    },
    iteminfo:{
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 3,
    },
    txttitle:{
        fontSize: 17,
        fontWeight: 'bold',
        //marginLeft: 15,
        textAlign: 'left',
        color: '#8c8c8c'
        
        
    },
    boxdetails:{
        flexDirection: 'row',
        marginTop: 5
    },
    boximg:{
        flex: 1,
        
        //marginTop: 5,
        alignItems: 'center'
    },
    boxinfo:{
        flex:2,
        marginLeft: 20,
        marginRight: 10

    },
    img:{
        resizeMode: 'stretch',
        width:180,
        height:120,
        borderRadius: 50
    },
    boxbtn:{
        alignItems: 'center',
        //marginRight: 10
    },
    description:{
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 14,
        //marginTop: 5,
        color: '#8c8c8c'
    }
    ,
    txtdescripcion:{
        textAlign: 'left',
        fontSize: 13,
        color: '#8c8c8c',
        marginTop: 5

        
    }
})

export default HomeAdoptante

// export default withStyles(HomeAdoptante, theme => ({

  
