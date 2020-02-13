import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native'
import Database from '../database'


let titleScreen = '';
const schemaName = 'Offers'
const schemaNameTypeOffer = 'TypeOffer'
const schemaNameItemPack = 'ItemPackage'
const schemaNameItemAdd = 'ItemAdditional'

export class OfferDetails extends Component {

    constructor(props){
        super(props);
        const { navigation } = this.props;
        const id = navigation.getParam('id')
        const title = navigation.getParam('title')
        const data = Database.CloudDB.get(schemaName,id);
        navigation.
        //alert(JSON.stringify(data,null,2))
        titleScreen = title;
        this.state ={
            offer: data
        }
        
    }

    static navigationOptions = {
        title: titleScreen,
        hideRightComponent: 'hide',
        back: true,
        drawerLockMode: "locked-closed",
            disableGestures: true
    }

    render() {
        return (
            <ScrollView style={style.main}>
                <View style={style.boxdetails}>
                    <View style={style.boximage}>
                        
                        <Image style={style.img} source={{uri: this.state.offer.image}} resizeMode='cover' />
                       
                        {/* <Image style={style.img} source={{uri: this.state.offer.status}} resizeMode='cover' /> */}
                        <View style={style.boxstatus}>
        <Text style={style.textstatus}>{this.state.offer.disponibility}</Text>
                                
                        </View>
                    </View>
                    <View style={style.boxtypes}>
                        {
                            [...this.state.offer.types].sort((a, b) => a.price - b.price).map((item,index)=>{
                                return(
                                    <View key={index} style={style.type}>
                                        <Text style={style.subtitle}>
                                            {item.name}:

                                        </Text>
                                        <Text style={style.description} >
                                            {item.description}

                                        </Text>

                                        <Text style={style.price} >$
                                            {parseFloat(item.price).toFixed(2)} + impuestos

                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View style={style.boxpackage}>
                        <Text style={style.titlepackage}>Incluye: </Text>
                        {
                            this.state.offer.items.map((item,index)=>{
                                return(
                                    <View key={index} style={style.itempackage}>
                                        <Text style={style.textpackage}>
                                            • {item.description}

                                        </Text>
                                        
                                    </View>
                                )
                            })
                        }
                    </View>


                    <View style={style.boxpackage}>
                        <Text style={style.titlepackage}>Servicios adicionales: </Text>
                        {/* <Text> */}
                            {
                                Array.from(this.state.offer.additionals).length == 0 ? 
                                // <View  style={style.itempackage}>
                                   <Text style={[style.textpackage,{marginLeft: 20}]}>
                                    • No incluye servicios adiconales

                                    </Text>
                                    // </View>
                                 : 
                                
                                    this.state.offer.additionals.map((item,index)=>{
                                        return(
                                            <View key={index} style={style.itempackage}>
                                                <Text style={style.textpackage}>
                                                    • {item.description}
        
                                                </Text>
                                                
                                            </View>
                                        )
                                    })
                                
                            }
                        {/* </Text> */}
                        {
                            
                            
                        }
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const types = [
    {
        id: '1',
        type: 'Clasico',
        description: 'Habitación Deluxe King',
        price: '$110 más impuestos'
    },
    {
        id: '2',
        type: 'De Lujo',
        description: 'Leading Suite King',
        price: '$130 más impuestos'
    },
    {
        id: '3',
        type: 'Inolvidable',
        description: 'Premium Floor King',
        price: '$120 más impuestos' 
    }
]

const packages = [
    {
        id: '1',
        text: 'Desayuno americano en la Habitación o Buffet en Cafetería El Patio',
        
    },
    {
        id: '2',
        text: 'Botella de Champagne',
        
    },
    {
        id: '3',
        text: 'Frutillas con Chocolate',
        
    },
    {
        id: '4',
        text: 'Late Check Out hasta las 16:00 ',
        
    },
    {
        id: '5',
        text: 'Parqueo de Cortesía Durante la Estadía',
        
    }
]

const aditionals = [
    {
        id: '1',
        text: 'Internet Wi-Fi ilimitado desde la habitación y en áreas publicas',
        
    },
    {
        id: '2',
        text: 'Minibar con bebidas soft por estadía',
        
    },
    {
        id: '3',
        text: 'Uso de todas las instalaciones',
        
    },
]

const  style = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor: '#f2f2f2'
    },
    boxdetails:{
        flex: 1,
        //height: '100%',
        margin: 10,
        //backgroundColor: 'skyblue'
    },
    boxstatus:{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        //backgroundColor: 'red',
        width: "100%",
        padding: 10, 
        justifyContent: 'flex-start',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    boximage:{
        height: 200,
        //borderRadius: 15,
        //backgroundColor: 'red'
    },
    textstatus:{
        color: '#FFF',
        //color: 'red',
        //fontWeight: 'bold',
        //borderRadius: 15,
        fontSize: 13,
        marginRight: 10,
        //textTransform: 'uppercase'
    
        
    },
    img:{
        flex: 1,
        borderRadius: 10,
       // marginTop: 10,
        //borderRadius: 10
    },
    boxtypes:{
        flex: 1,
        //height: 100,
        marginTop: 10,
        borderRadius: 10,
        //backgroundColor: 'skyblue',
        padding: 10,
        //borderRadius: 6,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: '#fff',
        

        shadowColor: "#8c8c8c",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        },
        elevation: 5
    },
    type:{
        
        flexDirection: 'row',
        //alignItems: 'center'
        //backgroundColor: 'red'
        borderBottomWidth: 1,
        borderBottomColor: '#7F6A2C',
        marginTop:5,
        paddingBottom: 5
        
    },
    subtitle:{
        textAlignVertical: 'center',
        flex:1.5,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#7F6A2C'

    },
    description: {
        textAlignVertical: 'center',
        flex:2.5,
        fontSize: 14,
        marginLeft: 5,
    },
    price: {
        flex:1,
        fontSize: 14,
        marginLeft: 5,
    },
    titlepackage:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7F6A2C'


    },
    boxpackage:{
        flex: 1,
        //height: 100,
        marginTop: 10,
        borderRadius: 10,
        //backgroundColor: 'skyblue',
        padding: 10,
        //borderRadius: 6,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: '#fff',
        

        shadowColor: "#8c8c8c",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        },
        elevation: 5
    },
    itempackage:{
        
        flexDirection: 'row',
        //alignItems: 'center'
        //backgroundColor: 'red'
        // borderBottomWidth: 1,
        // borderBottomColor: '#7F6A2C',
        marginTop:5,
        marginLeft: 10,
        paddingBottom: 5
        
    },
    textpackage: {
        flex:1,
        fontSize: 14,
        marginLeft: 5,
        
    },
})

export default OfferDetails;
