import React, { Component } from 'react'
import { Text, View, Image, StyleSheet,ScrollView, TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Database from '../database'
import {Dialog} from 'react-native-simple-dialogs'




export class Benefits extends Component {
    static navigationOptions = {
        title: 'Beneficios',
        hideRightComponent: 'hide',
    }

    constructor(props){
        super(props);
        //alert(JSON.stringify(Database.CloudDB.searchAll('Benefits')))
        this.state = {
           benefits: Array.from(Database.CloudDB.searchAll('Benefits')),
           items : [],
           show: false
        }
    }

    openModal = (show, id=null) => {
        if(id==null){
            this.setState({show: show, items: []})
        }
        else{
            const items = Array.from(Database.CloudDB.get('Benefits',id).item)
            this.setState({show: show, items: items})
        }
       

    }

    _renderItem = (item) => {
       
        <View style={style.item} >
            <View style={style.boximg}>
                    <TouchableOpacity style={{width: '100%', height: '100%'}}>
                        <Image style={style.img} source={{uri: item.image}}  />
                    </TouchableOpacity>
            </View>
            <View style={style.boxinfo}>
            <Card.Content>
                        <Text style={style.title}>{item.title}</Text>
                        <Text style={style.type}>({item.type})</Text>
            </Card.Content>
            <View style={style.boxbutton}>
            <TouchableOpacity style={style.button}>
                        <Text style={style.textbtn}>Detalles</Text>
                    </TouchableOpacity>

            </View>
                

            </View>

    </View>
    
    }

    render() {
        const r = this.state.img;
        return (
            <ScrollView style={style.main}>
               {
                   this.state.benefits.map((item,index) => {
                      return(
                        <View style={style.item} key={index}>
                        <View style={style.boximg}>
                                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=> this.openModal(true, item.uuid)}>
                                    <Image style={style.img} source={{uri: item.image}}  />
                                </TouchableOpacity>
                        </View>
                        <View style={style.boxinfo}>
                        <Card.Content>
                                    <Text style={style.title}>{item.title}</Text>
                                    <Text style={style.type}>({item.type})</Text>
                        </Card.Content>
                        <View style={style.boxbutton}>
                        <TouchableOpacity style={style.button} onPress={()=> this.openModal(true, item.uuid)}>
                                    <Text style={style.textbtn}>Detalles</Text>
                                </TouchableOpacity>
            
                        </View>
                            
            
                        </View>
            
                </View>
                 )
                       
                   })
               }


                
                <View style={style.item}>
                    <View style={[style.boximg,]}>
                            <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=>this.props.navigation.navigate('Certificates')} >
                                <Image style={style.img} source={require('../assets/img/Hotel_OVG_sunset.jpg')}  />
                            </TouchableOpacity>
                    </View>
                    <View style={style.boxinfo}>
                    <Card.Content>
                        <Text style={style.title}>Certificados electrónicos</Text>
                        <Text style={style.type}>(Transferible)</Text>
                    </Card.Content>
                    <View style={style.boxbutton}>
                    <TouchableOpacity style={style.button} onPress={()=>this.props.navigation.navigate('Certificates')}>
                                <Text style={style.textbtn}>Ver certificados</Text>
                            </TouchableOpacity>

                    </View>
                         

                    </View>

                </View>


                <Dialog title={"Beneficios"}
                    animationType="fade"
                    onTouchOutside={ () => this.openModal(false) }
                    
                    visible={ this.state.show} 
                    titleStyle={
                        {
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            
                            
                        }
                    }
                    dialogStyle={
                        {
                            borderRadius: 10,
                            backgroundColor: 'white',
                            
                        }
                    }>
                        <ScrollView style={style.boxterms}>
                           
                                {/* <Text style={{marginTop: 0}}> */}
                                    {
                                        //this.state.items.length >= 1 ? 
                                            this.state.items.map((item,index)=>{
                                                return(
                                    <Text key={index} style={style.txtmodal}>{ item.description}</Text>
                                                )
                                            })
          
                                    }



                            <View style={style.botonTerms}>
                                <TouchableOpacity onPress={()=> this.openModal(false)} style={{flex:1}}>
                                    <Text style={style.textobtn}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>


                    </Dialog>
                

            </ScrollView>
        )
    }
}




const style = StyleSheet.create({
   main:{
       flex:1,
       backgroundColor: '#f2f2f2'
       
   },

   item:{
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    overflow: 'hidden',
    height: 200,
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
    justifyContent: 'center',
    paddingBottom: 60,
   },
   img:{
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    
   },
   boxbutton:{
        //backgroundColor: '#dabd6c',
        backgroundColor: '#A88C3D',
        justifyContent: 'center',
        //textAlign: 'center',
        position: 'absolute',
        left: 20,
        right: 20,
        //top: '40%'
        bottom: 20,
        borderRadius: 20
      
       
       
   },
   button:{
    //position: 'absolute',
       //backgroundColor: 'rgba(218, 189, 108,0.9)',
       //backgroundColor: 'rgba(255, 255, 255,0.9)',
       alignItems: 'center',
       paddingTop: 10,
       paddingBottom: 10,
       //borderRadius: 0,
       
       //textAlign: 'center'
   },
   textbtn:{
       color: '#FFF',
       fontSize: 15,
       fontWeight: 'bold'
   },
   title:{
       fontWeight: 'bold',
       fontSize: 16,
       textAlign: 'center',
       marginTop: 10,
       //color: '#fff'
   },
   type:{
       color: '#A88C3D',
       fontWeight: 'bold',
       textAlign: 'center',
       marginTop: 10
   },
   botonTerms:{
    marginTop: 20,
    alignItems: 'center'
},
textobtn:{
    fontFamily: 'Roboto-Bold',
    //fontStyle: 'Bold',
    color: '#A88C3D',
    textTransform: "uppercase",
    flex:1,

    fontSize: 17,
    letterSpacing: 0,
    fontWeight: 'bold'
},
txtmodal:{
    textAlign: 'justify',
    fontSize: 14
}

  });

export default Benefits
