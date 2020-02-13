import React, { Component } from 'react';
import { Text, 
    ScrollView,
    StyleSheet, 
    TouchableOpacity, 
    TouchableHighlight,
    Modal,
    View,
    ActivityIndicator,
    SafeAreaView, 
    //Image 
} from 'react-native';
import {Grayscale} from 'react-native-color-matrix-image-filters'
import { 
    Avatar, 
    Button, 
    Card, 
    Title, 
    Paragraph
     } from 'react-native-paper';
import { Dialog } from 'react-native-simple-dialogs';
import Database from '../database/index';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg'
import {Image} from 'react-native-elements'

const schemaName = 'User'
// const uuid = "ec366d60-0a9b-11ea-82b1-e37e650f4e3b";

export class Certificates extends Component {

    constructor(props){
        super(props);
        const {navigation} = props;
        const uuid = Database.LocalDB.searchAll('User')[0].uuid
        // alert(Database.LocalDB.searchAll('User')[0].token + ' - '+Database.LocalDB.searchAll('User')[0].mid)
        //const used = Database.CloudDB.search('')
         //alert(uuid)
        // this.setState({Data: Database.CloudDB.get('User',uuid)});
        this.state = {
          // Data: Database.CloudDB.get(schemaName,uuid).membresy
          qr: '',
          titulo: 'null',
          showDialog: false,
          showTerms: false,
          userData: Database.CloudDB.get(schemaName,uuid).membresy,
          description: '',
          code: ''
        }
      }

    static navigationOptions = {
        title: 'Certificados',
        hideRightComponent: 'hide',
        
      };
    
      
    // state = {
    //     titulo: 'null',
    //     showDialog: false,
    //     showTerms: false,
    //     userData: Database.CloudDB.get(schemaName, uuid).membresy,
    //     //membresy: this.state.userData,
    //     //certificates: Database.CloudDB.search('Membresy', 'uuid = '+userData.uuid).certificates,
    //     qr: ''
    // }

    openDialog = (show,texto,textoqr, uuid,code) => {
        let qr = code;
        this.setState({ showDialog: show, titulo: texto, qr: qr, showTerms: false,code: code });
    }

    openTerms = (show,description) => {
        this.setState({ showTerms: show, showDialog: false, description: description });
    }

    _renderImage = (img,status) => {
        if(status == 'not used'){
            return(<Image 
                source={{uri: img}} 
                style={{width: 'auto', height: 200, }}
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
                            <ActivityIndicator size="large" color={'#A88C3D'} style={{marginLeft: 20}} />
                        </View>
                }
                />)

        }
        else{
            return(
                <Grayscale>
                <Image 
                        source={{uri: img}} 
                        style={{width: 'auto', height: 200, }}
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
                                    <ActivityIndicator size="large" color={'#A88C3D'} style={{marginLeft: 20}} />
                                </View>
                        }
                        />
            </Grayscale>
            )

        }
    }

    _renderCertificado = (item)=> {
        const {title,date_expire,img, uuid,description, status,code} = item
        const date = moment(date_expire).format('DD MMM YYYY')
        //item.title,moment(item.date_expire).format('DD MMM YYYY'),item.img,item.uuid,item.description
        return(
            <View style={{}}>
                <Card style={style.card} onPress={()=> status == 'not used' ? this.openTerms(true,description) : {}}>
                    {/* <Card.Cover source={{uri: img}} onLoad={()=>{
                         <View style={{flexDirection: 'row',marginBottom: 10}}>
                         <Image style={{width: 150, height: 100, }} resizeMode='contain' source={require('../assets/img/logo-ov.png')}  />
                         <ActivityIndicator size="large" color={'#A88C3D'} style={{marginLeft: 20}} />
                     </View>
                    }
                        

                    } /> */}
                    

                    <View style={{borderTopStartRadius: 15, borderTopEndRadius: 15, overflow: 'hidden'}}>
                    
                        {this._renderImage(img,status)}

                        {/* <Image 
                        source={{uri: img}} 
                        style={{width: 'auto', height: 200, }}
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
                                    <ActivityIndicator size="large" color={'#A88C3D'} style={{marginLeft: 20}} />
                                </View>
                        }
                        /> */}
                    
                    </View>
                   
                    {/* <Card.Cover/> */}
                    
                    <Card.Content>
                        <Title>{title}</Title>
                    <Paragraph style={style.date}>Válido hasta {date}</Paragraph>
                    </Card.Content>
                    <Card.Actions style={[style.boton]}>
                    {
                            status == 'used' ? 
                            <TouchableOpacity   >
                                <Text style={style.textobtn}>certificado usado</Text>
                            </TouchableOpacity> : 
                            <TouchableOpacity  onPress={ () => this.openDialog(true,title, title+date, uuid,code)}>
                                <Text style={style.textobtn}>Mostrar certificado</Text>
                            </TouchableOpacity>
                        }
                                       
                                    {/* <Button onPress={ () => this.openDialog(true,title, title+date, uuid)}>
                                        <Text style={style.textobtn}>Mostrar certificado</Text>
                                    </Button> */}
                    </Card.Actions>
                    <View>
                        
                    </View>
                    
                        
                    
                </Card>
              </View>
        )
    

    
        
        
    }
    

    render() {
        return (
            <ScrollView style={style.container}>
                {/* {alert(JSON.stringify(this.state.userData.certificates,null,2))} */}
                <Dialog 
                    title={this.state.titulo}
                    animationType="fade"
                    onTouchOutside={ () => this.openDialog(false) }
                    
                    visible={ this.state.showDialog } 
                    titleStyle={
                        {
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'left' 
                        }
                    }
                    dialogStyle={
                        {
                            borderRadius: 10,
                            backgroundColor: 'white',
                            
                        }
                    }  
                    >
                    <View style={{alignItems: 'center'}}>
                    {/* <QRCode
                        value={this.state.qr}
                        size={200}
                        bgColor='purple'
                        fgColor='white'/> */}
                        <QRCode
      value={this.state.qr}
      logo={require('../assets/img/iconov.png')}
      size={200}
      logoBorderRadius={50}
      logoSize={40}
      quietZone={0}
      //ecl='M'
      logoMargin={5}
        logoBackgroundColor='#fff'
    />
                    {/* <Image source={require('../assets/img/img-qr.png')}></Image> */}
                    </View>
                    <View style={{marginTop: 10}}>
                    <Text style={{textAlign:'center', fontSize: 17, fontWeight: 'bold'}}>{this.state.code}</Text>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 10}} >
                        <TouchableHighlight  onPress={ () => this.openDialog(false)}  
                        
                         >
                             
                        <Text style={{textTransform: "uppercase",letterSpacing:0 ,color: '#A88C3D', fontWeight: 'bold', fontSize: 17}}>Cerrar</Text>
                            
                        </TouchableHighlight>
                    </View>
                </Dialog>

                <Dialog title={"Condiciones"}
                    animationType="fade"
                    onTouchOutside={ () => this.openTerms(false) }
                    
                    visible={ this.state.showTerms } 
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
                        <View style={style.boxterms}>
                           
                                <Text style={{marginTop: 0}}>
                                    {this.state.description}
                                </Text>


                            <View style={style.botonTerms}>
                                <TouchableOpacity onPress={()=> this.openTerms(false)}>
                                    <Text style={style.textobtn}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </Dialog>


               
                    
                {[...this.state.userData.certificates].sort((a)=>a.status==='used').map((item,index)=>{
                    
                        return(
                            <View key={index}>
                                {this._renderCertificado(item)}
                            </View>
                        )
                    
                })}
                

            </ScrollView>

            
        );
    }
}

// const dataCert=[
//     {
//         title: 'Un día de entrenamiento', 
//         date: '30 Sep 2020', 
//         img: require('../assets/img/certif1.png')},

//     {
//         title: 'Suite de bodas', 
//         date: '10 Dic 2020', 
//         img: require('../assets/img/certif2.png')},
//      {
//         title: 'Un día de buffet', 
//         date: '30 Jul 2020', 
//         img: require('../assets/img/buffet.jpg')},
//     {
//         title: 'Movilización privada', 
//         date: '30 Jul 2020', 
//         img: require('../assets/img/servicio-taxi.jpg')}

        
// ]


const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f2f2f2',
        paddingBottom: 40
    },
    card:{
        borderRadius: 15,
        //borderTopStartRadius: 15,
       // borderTopLeftRadius: 25,
        marginLeft: 15, 
        marginRight:15,
        marginTop: 20,
        marginBottom: 5,
        //backgroundColor: 'red'
        
    },
    boton:{
        //alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center'
    },
    textobtn:{
        fontFamily: 'Roboto-Bold',
        //fontStyle: 'Bold',
        color: '#A88C3D',
        textTransform: "uppercase",

        fontSize: 17,
        letterSpacing: 0,
        fontWeight: 'bold'
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        padding : 10,
        margin:50
      },
      touchableButton: {
        width: '70%',
        padding: 10,
        backgroundColor: '#f06292',
        marginBottom: 10,
        marginTop: 30,
      },
      date:{
          fontSize: 15
      },
      subTerms:{
          fontWeight: 'bold',
          marginTop: 10
      },
      botonTerms:{
          marginTop: 20,
          alignItems: 'center'
      }

})


export default Certificates;
