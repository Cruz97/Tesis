import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet,ActivityIndicator ,TouchableOpacity} from 'react-native'
import {Card, Button, Title} from 'react-native-paper'
import Database from '../database/index'
import ImageView from 'react-native-image-view'
import {Image} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'

const schemaName = "Hotels";

export class Hotels extends Component {
    static navigationOptions = {
        title: 'Hoteles',
        hideRightComponent: 'hide',
        
    }

    state = {
        hotels:  Array.from(Database.CloudDB.searchAll(schemaName)),
        isImageViewVisible: false,
        images: [],
        imagesGye: [],
        imagesMac: [],
        imagesMan: [],
        imagesCue: [],
        imagesPar: [],
        imagesUni: [],
        imagesEsc: [],
    }

    _ViewGalery = (city) => {
        switch (city) {
            case "Guayaquil":
                this.setState({images: this.state.imagesGye, isImageViewVisible: true})
                break;
            case "Machala":
                this.setState({images: this.state.imagesMac, isImageViewVisible: true})
                break;
            case "Manta":
                 this.setState({images: this.state.imagesMan, isImageViewVisible: true})
                 break;
            case "Cuenca":
                 this.setState({images: this.state.imagesCue, isImageViewVisible: true})
                break;
            case "Parque":
                    this.setState({images: this.state.imagesPar, isImageViewVisible: true})
                   break;
                   case "Unipark":
                    this.setState({images: this.state.imagesUni, isImageViewVisible: true})
                   break;
                   case "Escalesia":
                    this.setState({images: this.state.imagesEsc, isImageViewVisible: true})
                   break;
        
            default:
                break;
        }

        
    }

    _renderHotel = (item,index)=> {
        let images = [];
        


        return(
            <View key={index}>
                {
                    
                     item.images.map((item,index)=>{
                         
                        let obj = {
                            source: {
                                uri: item.url
                            },
                            title: item.name,
                            width: 750,
                            height: 600
                        }
                        //alert(obj)
                        if(item.city == "Guayaquil")
                            this.state.imagesGye.push(obj);
                        if(item.city == "Machala")
                            this.state.imagesMac.push(obj);
                        if(item.city == "Manta")
                            this.state.imagesMan.push(obj);
                        if(item.city == "Cuenca")
                            this.state.imagesCue.push(obj);
                        if(item.city == "Parque")
                            this.state.imagesPar.push(obj);
                        if(item.city == "Unipark")
                        this.state.imagesUni.push(obj);
                        if(item.city == "Escalesia")
                        this.state.imagesEsc.push(obj);
                        
                        
                        
                        
                    })


                }
            {/* {alert(ima)} */}
           

            <ImageView
                images={ 
                    this.state.images
                }
                backgroundColor= "#000"
                imageIndex={0}
                isVisible={this.state.isImageViewVisible}
            // renderFooter={(currentImage) => (
            //     <View style={{justifyContent: 'center', alignItems: 'center',marginBottom: 60, backgroundColor: '#FFF',paddingVertical: 20}}>
            //         <Text style={{color: '#c7b481', fontSize: 16}}>{currentImage.title}</Text>
            //     </View>)}
                 onClose={()=> {this.setState({isImageViewVisible: false})}}
            />
            {/* {alert(JSON.stringify(this.state.imagesGye))} */}
                <Card style={style.card} onPress={()=> this._ViewGalery(item.city) }>
                    <Card.Content>
                     <Text style={{marginBottom: 5, marginTop: 0, fontWeight: 'bold',
        fontSize: 19}}>{item.name}</Text>
                    
                     <View style={{width: '100%', height: 125, }}>
                         <Image
                            source={{uri: item.images[0].url}}
                            style={{height: '100%'}}
                            resizeMode='cover' resizeMethod='auto' 
                            containerStyle={
                                {
                                    backgroundColor: 'white',
                                    //borderRadius: 20
                                }
                            }
                            placeholderStyle={
                                {
                                    backgroundColor: 'white',
                                    //borderRadius: 20
                                }
                            }
                            PlaceholderContent = {
                                <View style={{flexDirection: 'row',marginBottom: 10}}>
                                        <Image style={{width: 150, height: 100, }} resizeMode='contain' source={require('../assets/img/logo-ov.png')}  />
                                        <ActivityIndicator size="large" color={'#c7b481'} style={{marginLeft: 20}} />
                                    </View>
                            }
                            
                         />
                            {/* <Image style={{height: '100%'}} source={{uri: item.images[0].url }} resizeMode='cover' resizeMethod='auto' /> */}
                     </View>
                     <View style={{width: '100%', height: 70, flexDirection: 'row', marginTop: 3}}>
                        <View style={{flex:1}}>
                        <Image style={{height: '100%'}} source={{uri: item.images[1].url }} resizeMode='cover' resizeMethod='auto' />

                        </View>
                        <View style={{flex: 1, marginLeft: 3, marginRight: 3}}>
                        <Image style={{height: '100%'}} source={{uri: item.images[2].url }} resizeMode='cover' resizeMethod='auto' />
                    

                        </View>
                        <View style={{flex: 1}}>
                        <Image style={{height: '100%'}} source={{uri: item.images[3].url }} resizeMode='cover' resizeMethod='auto' />
                    
                        </View>
                     </View>
                    </Card.Content>
                    <Card.Actions style={style.boxbutton}>
                        <TouchableOpacity style={[style.boton]} onPress={()=> this._ViewGalery(item.city)}>
                                <Text style={style.textobtn}>Ver galeria</Text>
                        </TouchableOpacity>
                    </Card.Actions>
                </Card>
              </View>
        )
    }

    render() {
        return (
            <View style={style.container}>
                {/* {alert(JSON.stringify())} */}
                {/* {alert(JSON.stringify(this.state.hotels, null, 2))} */}
                <FlatList
                    data={this.state.hotels}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item})=>this._renderHotel(item,item.uuid)}
                />

                
                {/* {
                    this.state.hotels.map((item,index)=>{
                        return(
                            this._renderHotel(item,index)
                        )
                    })
                } */}

                {/* {this._renderHotel()} */}
                {/* {this._renderHotel()} */}
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f2f2f2',
        paddingBottom: 40
    },
    boton:{
        //alignItems: 'center',
        marginTop: 0,
        justifyContent: 'center'
    },
    card:{
        borderRadius: 5,
        marginLeft: 15, 
        marginRight:15,
        marginTop: 10,
        marginBottom: 5,
        
        
    },
    textobtn:{
        fontFamily: 'Roboto-Bold',
        //fontStyle: 'Bold',
        color: '#A88C3D',
        textTransform: "uppercase",
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 0,
        letterSpacing: 0
        //fontWeight: 'bold'
    },
    boxbutton:{
        justifyContent: 'center'
    }
})

export default Hotels
