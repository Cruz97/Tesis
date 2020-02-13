import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet,ActivityIndicator ,TouchableOpacity} from 'react-native'
import {Card, Button, Title} from 'react-native-paper'
import Database from '../database/index'
import ImageView from 'react-native-image-view'
import {Image,Icon} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'

const schemaName = "Hotels";

const IconStar = ({name}) => 
    <Icon 
                name={name}
                type='material'
                color='#A88C3D'
                size={15}
            />

export class Hotels2 extends Component {
    static navigationOptions = {
        title: 'Hoteles',
        hideRightComponent: 'hide',
        
    }
    constructor(props){
        super(props);
        const  hoteles = Array.from(Database.CloudDB.searchAll(schemaName))
        //alert(JSON.stringify(hoteles))
        this.state = {
            hotels:  hoteles,
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

    }

    renderStars = (number) => {
        return(
        <View style={style.boxstars}>
            {[...Array(5).keys()].map((item) => 
                <IconStar key={item} name={(item+1)>number ? "star-border" : 'star'} />
            )} 
        </View>)
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
            <View style={style.boxitem}>
           
           <View style={style.item}>

                
                    <View style={[style.boximg]}>
                            <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={()=> this._ViewGalery(item.city)} >
                                <Image style={style.img} source={{uri: item.img_main}}  />
                            </TouchableOpacity>
                            <View style={style.boxstars}>
                                {
                                    this.renderStars(item.stars)
                                }

                            </View>
                    </View>
                    <View style={style.boxinfo}>
                    <Card.Content style={{marginLeft:-5}}>
                    <Text style={style.title}>{item.name}</Text>
                        {this.renderStars(5)}
                        <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}} >
                            <Icon
                                    
                                    name='location-city'
                                    type='material'
                                    color='#517fa4'
                                    size={20}
                                    />
                                 <Text style={style.infohotel}>{`${item.location}, ${item.country}`}</Text>
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                            <Icon
                                    
                                    name='room'
                                    type='material'
                                    color='#517fa4'
                                    size={20}
                                    />
                                 <Text style={style.infohotel}>{item.address}</Text>
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                            <Icon
                                    
                                    name='phone'
                                    type='material'
                                    color='#517fa4'
                                    size={20}
                                    />
                                 <Text style={style.infohotel}>{item.phone}</Text>
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center'}}>
                            <Icon
                                    
                                    name='location-city'
                                    type='material'
                                    color='#517fa4'
                                    size={20}
                                    />
                                 <Text style={style.infohotel}>{item.email}</Text>
                        </View>

                       
                           
                        
                    </Card.Content>
                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 40, height: 70, flexDirection: 'row'}}>
                        <View style={{flex:1}}>
                        <Image style={{height: '100%'}} source={{uri: item.images[1].url }} resizeMode='cover' resizeMethod='auto' />

                        </View>
                        <View style={{flex: 1, marginLeft: 2, marginRight: 2}}>
                        <Image style={{height: '100%'}} source={{uri: item.images[2].url }} resizeMode='cover' resizeMethod='auto' />
                    

                        </View>
                        <View style={{flex: 1}}>
                        <Image style={{height: '100%'}} source={{uri: item.images[3].url }} resizeMode='cover' resizeMethod='auto' />
                    
                        </View>
                     </View>
                    <View style={style.boxbutton}>
                    <TouchableOpacity style={style.button} onPress={()=> this._ViewGalery(item.city)}>
                                <Text style={style.textbtn}>Ver galería</Text>
                            </TouchableOpacity>

                    </View>

                    
                         

                    </View>

                </View>
                </View>

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
        //paddingBottom: 40
    },
    boton:{
        //alignItems: 'center',
        marginTop: 0,
        justifyContent: 'center'
    },
    card:{
        borderRadius: 5,
        // marginLeft: 15, 
        // marginRight:15,
        //marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row'
        
        
    },
    // textobtn:{
    //     fontFamily: 'Roboto-Bold',
    //     //fontStyle: 'Bold',
    //     color: '#A88C3D',
    //     textTransform: "uppercase",
    //     fontSize: 17,
    //     fontWeight: 'bold',
    //     letterSpacing: 0,
    //     letterSpacing: 0
    //     //fontWeight: 'bold'
    // },
    // boxbutton:{
    //     justifyContent: 'center'
    // },
    boxitem:{
        flex:1,
        backgroundColor: '#fff',
    },
    item:{
        flex: 1,
       // width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        //borderRadius: 20,
        //resizeMode: 'c',
        overflow: 'hidden',
        height: 320,
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
        width: '40%',
        //height: undefined,
        //marginLeft:10
        
       },
       boxinfo:{
        flex:1,
        //justifyContent: 'center',
        paddingBottom: 60,
        marginTop: 10
        //alignItems: 'center'
        //alignContent: 'center'
        //justifyContent: 'flex-start'
        //height: 300,
        //backgroundColor: ''
        //backgroundColor: 'rgba(30,54,96,0.97)',
       },
       img:{
        //flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        //marginLeft: 10
        
       },
       boxbutton:{
            //backgroundColor: '#dabd6c',
            backgroundColor: '#A88C3D',
            justifyContent: 'center',
            //textAlign: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            //top: '40%'
            bottom: 0,
            //borderRadius: 20
          
           
           
       },
       boxstars:{
           flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'flex-end',
        //textAlign: 'center',
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // //top: '40%'
        // bottom: 0,

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
           fontSize: 18,
           textAlign: 'center',
           marginTop: 5,
           marginBottom: 10
           //marginLeft: 5,
           //color: '#fff'
       },
       infohotel:{
        //fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10
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
    
})

export default Hotels2
