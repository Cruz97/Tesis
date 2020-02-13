import React, { Component } from 'react'
import { Text, 
    View, 
    StyleSheet, 
    //Image, 
    TouchableOpacity,
    ScrollView,
TextInput, Picker, ActivityIndicator, FlatList } from 'react-native'
import {Card, Button, Divider} from 'react-native-paper';
//import { thisExpression } from '@babel/types';
import AwesomeIcon from '../src/components/AwesomeIcon'
import { Icon, Image } from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple';
import Database from '../database'
import SendIntentAndroid from 'react-native-send-intent';
import FilterPicker from '../src/components/FilterPicker'
import moment from 'moment';
import Load from '../src/components/Load'
// import {  } from 'react-native-gesture-handler';


const schemaName = 'Restaurants';
//const uuid = "c06f07e9-aebe-48ce-9ef7-6fb05d8ea14e";

const IconStar = ({name}) => 
    <Icon 
                name={name}
                type='material'
                color='#A88C3D'
                size={23}
            />
const IconClock = () =>
<Icon 
                name='schedule'
                type='material'
                color='#FFF'
                size={23}
            />

export class Restaurants extends Component {
    static navigationOptions ={
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            
            showFilter: false,
            f1 : false, f2: false, f3: false,f4: false,
            showInfo: false,
            city: '',
            title:'',
            schedule:'',
            schedule_weekend: '',
            schedule_ini:null,
            schedule_weekend_ini: null,
            schedule_fin: null,
            schedule_weekend_fin: null,
            user: '',
            texto: '',
            restaurants: Array.from(Database.CloudDB.searchAll(schemaName)),
            //loading: new Array(Array.from(Database.CloudDB.searchAll(schemaName)).length)
        }
    }

    // componentDidMount(){
    //     this.state.loading.map((item,index)=>{
    //         this.state.loading[index] = true
    //     })
    // }
     getTime = () => {
        var date = moment().utc(true)
        //subtract(2, 'hours');
        //var minute = date.minutes();
        
        return date.format('HH:mm');
        //.subtract(minute, 'minutes')
      }


      compareHour = (hour1, hour2) => {
          var hourlocal =  parseInt(moment().utc(true).format('HH'))
          var minlocal =  parseInt(moment().utc(true).format('mm'))
          var hourOpen = parseInt(moment(hour1).utc().format('HH')) 
          var minOpen = parseInt(moment(hour1).utc().format('mm'))
          var hourClose = parseInt(moment(hour2).utc().format('HH')) 
          var minClose = parseInt(moment(hour2).utc().format('mm'))
          var hora = `${hourlocal}:${minlocal}`
          var horaOpen = `${hourOpen}:${minOpen}`
          var horaClose = `${hourClose}:${minClose}`
          //return moment(hour1).utc().format('HH')
          var horaActual = moment(hora, 'h:mm');
          var horaInicio = moment(horaOpen, 'h:mm');
          var horaFin = moment(horaClose, 'h:mm');
          
          if(horaActual.isAfter(horaInicio) && horaActual.isBefore(horaFin)){
            return(
                <Text style={modal.statusOpen}>(Abierto ahora)</Text>
            )
          }
          else{
            return(
                <Text style={modal.statusClose}>(Cerrado ahora)</Text>
            )
          }
      }

      getStatusRestaurant = (hour1, hour2) => {
        var hourlocal =  parseInt(moment().utc(true).format('HH'))
        var minlocal =  parseInt(moment().utc(true).format('mm'))
        var hourOpen = parseInt(moment(hour1).utc().format('HH')) 
        var minOpen = parseInt(moment(hour1).utc().format('mm'))
        var hourClose = parseInt(moment(hour2).utc().format('HH')) 
        var minClose = parseInt(moment(hour2).utc().format('mm'))
        var hora = `${hourlocal}:${minlocal}`
        var horaOpen = `${hourOpen}:${minOpen}`
        var horaClose = `${hourClose}:${minClose}`
        //return moment(hour1).utc().format('HH')
        var horaActual = moment(hora, 'h:mm');
        var horaInicio = moment(horaOpen, 'h:mm');
        var horaFin = moment(horaClose, 'h:mm');
        
        if(horaActual.isAfter(horaInicio) && horaActual.isBefore(horaFin)){
          return(
              <Text style={style.textstatus}>(Abierto ahora)</Text>
          )
        }
        else{
          return(
              <Text style={style.textstatus}>(Cerrado ahora)</Text>
          )
        }
    }


  

    _renderModalInfo = () => {
        return(
            <Dialog title={this.state.title}
                    animationType="fade"
                    onTouchOutside={ () => this.openInfo(false) }
                    visible={ this.state.showInfo } 
                    titleStyle={
                        {
                            fontSize: 23,
                            fontWeight: 'bold',
                            textAlign: 'left',
                            
                        }
                    }

                    dialogStyle={
                        {
                            borderRadius: 10,
                            backgroundColor: 'white',
                        }
                    }

                    contentStyle={{
                        //backgroundColor: 'red',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingHorizontal: 5
                       
                    }}

                    

                   
                    
                    >
                    <View style={modal.body}>
                        <Text style={modal.subtitle}>Horario de atención</Text>
                        {this.compareHour(this.state.schedule_ini,this.state.schedule_fin)}
                        {/* <Text style={modal.statusOpen}>{this.compareHour(this.state.schedule_ini,this.state.schedule_fin)}</Text>
                        <Text style={modal.statusOpen}>{this.getTime()}</Text> */}
                        <Text style={modal.schedule}>Lun-Vie: {moment(this.state.schedule_ini).utc().format('HH:mm') + ' - '+moment(this.state.schedule_fin).utc().format('HH:mm')}</Text>
                        <Text style={modal.schedule}>Sáb-Dom: {
                        moment(this.state.schedule_weekend_ini).utc().format('HH:mm')+' - ' +moment(this.state.schedule_weekend_fin).utc().format('HH:mm')}</Text>
                    </View>

                    <View style={{alignItems: 'flex-end', marginTop:20}} >
                        <TouchableOpacity  onPress={ () => this.openInfo(false)}>
                            <Text style={{letterSpacing:0, textTransform: "uppercase", fontWeight: 'bold', fontSize: 18, color: '#A88C3D', marginBottom: 10, marginRight: 15}}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
        )
    }

    _renderItem = (item) => {
        return(
            <Card style={style.card}>
                    <View style={style.containerimg}>
                        {/* <Card.Cover style={style.img}  source={{uri: item.status}} 
                        defaultSource={require('../assets/img/iconov.png')}
                        //style={{ backgroundColor: '#f1eff0'}}
                        //blurRadius={3}
                            //onLoad={(e) => this.setState({loading: true})}
                            //onError={(e) => this.setState({loading: false})}
                            // onLoadStart={(e) => this.setState({loading: false})}
                        /> */}
                        <Image
                            source={{ uri: item.image }}
                            //style={{ width: 200, height: 200 }}
                            style={style.img,{width: '100%',height: 190}} 
                            resizeMode='cover'
                            placeholderStyle={
                                {
                                    backgroundColor: 'white'
                                }
                            }
                            PlaceholderContent={
                                <View style={{flexDirection: 'row',marginBottom: 50}}>
                                    <Image style={{width: 150, height: 100, }} resizeMode='contain' source={require('../assets/img/logo-ov.png')}  />
                                    <ActivityIndicator size="large" color={'#A88C3D'} style={{marginLeft: 20}} />
                                </View>             
                            
                            // <Image source={require('../assets/img/iconov.png')} style={{width: 100, height: 100}}/>
                        }
                            />
                          
                        <View style={style.boxstatus}>
                        {this.getStatusRestaurant(item.schedule_ini,item.schedule_fin)} 
                            <IconClock/>
                        </View>
                    </View>
                   
                    <Card.Content style={style.boxinfo}>
        <Text style={style.title}>{item.name}</Text>
                        {this.renderStars(item.stars)}
                    </Card.Content>
                    <Card.Actions style={style.boxbuttons}>
                        {this.renderButtonCall('Llamar','call',item.phone)}
                        {this.renderButtonMap('Mapa','room',item)}
                        {this.renderButtonInfo('Info','info',item)}   

                    </Card.Actions>
                   
                </Card>
        )
    }


    handleTexto= (text) => {
        
        let restaurants = null;
        let search = text;
        //alert(search)
        if(search === '')
            restaurants = Array.from(Database.CloudDB.searchAll(schemaName))
        else
            restaurants = Array.from(Database.CloudDB.search(schemaName,  `name CONTAINS[c] '${search}'`))

        this.setState({ texto: text, restaurants: restaurants })
     }
    render() {
       
        return (
            <View style={{flex:1}}>
                {/* {alert(JSON.stringify(this.state.loading))} */}
                {this._renderDialogFilter()}
                {this._renderModalInfo()}
                <View style={style.header}>
                    <TouchableOpacity  onPress={()=> this.props.navigation.openDrawer()} style={style.back}>
                        <Icon  name='menu' type='material' color='#FFF' size={30} />
                    </TouchableOpacity>

                    <TextInput style={style.input} placeholder="Restaurantes y bares" onChangeText={this.handleTexto}></TextInput>

                    <TouchableOpacity style={style.filter} onPress= {()=> this.openFilter(true)}>
                        <Icon name='filter' type='material-community' color='#FFF' size={30}/>
                    </TouchableOpacity>

                </View>
            <View style={style.main}>
            {/* <Text>{this.state.texto}</Text> */}
                {
                    this.Contenido()
                }
                
            </View>
            </View>
            
        )
    }
 

    renderStars = (number) => {
            return(
            <View style={style.boxstars}>
                {[...Array(5).keys()].map((item) => 
                    <IconStar key={item} name={(item+1)>number ? "star-border" : 'star'}/>
                )} 
            </View>)
    }

    renderButtonCall = (textbtn,icon, number) => {
        
        return(
            <TouchableOpacity onPress={()=>{
                SendIntentAndroid.sendPhoneCall(number,false);
            }}
            style={{alignItems: 'center'}}
            contentStyle={
                {
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 10,
                    
                }
            } 

            
            
            // icon={()=> <Icon 
            //     name={icon}
            //     type='material'
            //     color='#A88C3D'
            //     size={30}
            //     iconStyle={{  alignItems: 'center', marginLeft: -16, marginRight: 0,  }}
            //     ></Icon>
            // } 
            >
                <Icon 
                name={icon}
                type='material'
                color='#A88C3D'
                size={30}
                iconStyle={{  alignItems: 'center'  }}
                ></Icon>
            <Text style={style.buttons}>{textbtn}</Text>
        </TouchableOpacity>
        )
    }

    renderButtonMap = (textbtn,icon, item) => {
        
        return(
            <TouchableOpacity 
            style={{alignItems: 'center'}}
            contentStyle={
                {
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 10,
                    
                }
            } 

            
            
            // icon={()=> <Icon 
            //     name={icon}
            //     type='material'
            //     color='#A88C3D'
            //     size={30}
            //     iconStyle={{  alignItems: 'center', marginLeft: -14, marginRight: 4,  }}
            //     ></Icon>
            // } 
            onPress={()=>{
                SendIntentAndroid.openMaps(item.address);
            }}>
                <Icon 
                name={icon}
                type='material'
                color='#A88C3D'
                size={30}
                ></Icon>
            <Text style={style.buttons}>{textbtn}</Text>
        </TouchableOpacity>
        )
    }

    renderButtonInfo = (textbtn,icon,item) => {
      
        return(
            <TouchableOpacity 
            style={{alignItems: 'center'}}
            contentStyle={
                {
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    
                }
            } 
            onPress={()=>{
                this.setState({
                    title: item.name, 
                    schedule_ini: item.schedule_ini, 
                    schedule_fin: item.schedule_fin, 
                    schedule_weekend_ini: item.schedule_weekend_ini ,
                    schedule_weekend_fin: item.schedule_weekend_fin ,
                    showInfo: true})
            }}

            // icon={()=> <Icon 
            //     name={icon}
            //     type='material'
            //     color='#A88C3D'
            //     size={30}
            //     iconStyle={{  alignItems: 'center', marginLeft: -16, marginRight: 4,  }}
            //     ></Icon>}
                
            >
                <Icon 
                name={icon}
                type='material'
                color='#A88C3D'
                size={30}
                iconStyle={{  alignItems: 'center'  }}
                ></Icon>
                
            <Text style={style.buttons}>{textbtn}</Text>
        </TouchableOpacity>
        )
    }

    // state ={
    //     showFilter: false,
    //     op1: false,
    //     op2: false,
    //     op3: false,
    //     op4: false
    // }

    // state = {
        

    // }

   updateUser = (user) => {
      this.setState({ user: user })
   }



    openFilter = (show) => {
        let restaurants
        let ciudad
        if(show){
            // alert('open filter: if')
            this.switchFilter(false,false,false,false)
             this.setState({  showFilter: show});
            // ciudad = this.state.city;
            // // let restaurants
            // if(ciudad == '')
            //     restaurants = Array.from(Database.CloudDB.searchAll(schemaName))
            // else
            //     restaurants = Array.from(Database.CloudDB.search(schemaName,`city = '${ciudad}'`))
            //return;
        }else{
            if(this.state.f1){
                ciudad = 'Guayaquil'
            }
            else{
                if(this.state.f2){
                    ciudad = 'Manta'
                }else{
                    if(this.state.f3){
                        ciudad = 'Cuenca'
                    }else{
                        if(this.state.f4){
                            ciudad = 'Machala'
                        }else{
                            ciudad = ''
                        }

                    }

                }

            }
            
           
            
            // else{
            //     ciudad = ''
            // }


            this.switchFilter(false,false,false,false)
            // ciudad = this.state.city;
            
            if(ciudad == '')
                restaurants = Array.from(Database.CloudDB.searchAll(schemaName))
            else
                restaurants = Array.from(Database.CloudDB.search(schemaName,`city = '${ciudad}'`))
            //alert(this.state.city)
            this.setState({restaurants: restaurants,  showFilter: show})
            // alert('open filter: else')
            
            

        }
        
    }

    openInfo = (show) => {
        this.setState({title: '', schedule: '', schedule_weekend: '', showInfo: show})
    }


    switchFilter = (op1,op2,op3,op4) => {
      
        if(op1){
            this.setState({
                f1: !this.state.f1, f2: false, f3: false, f4: false
            })
        }else{
            if(op2){
                this.setState({
                    f1: false, f2: !this.state.f2, f3: false, f4: false
                })
            }else{
                if(op3){
                    this.setState({
                        f1: false, f2: false, f3: !this.state.f3, f4: false
                    })
                }else{
                    if(op4){
                        this.setState({
                            f1: false, f2: false, f3: false, f4: !this.state.f4
                        })
                    }
                    else{
                        this.setState({
                            f1: false, f2: false, f3: false, f4: false, city: ''
                        })
                    }
                }
            }
        }
        

    }

   


    _renderDialogFilter = () => {
        return(
            <Dialog 
                    title="ELIJA UNA CIUDAD"
                    keyboardDismissMode='none'
                    animationType="fade"
                    onTouchOutside={ () => this.openFilter(false) }
                    visible={ this.state.showFilter } 
                    titleStyle={
                        {
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center' 
                        }
                    }
                    dialogStyle={
                        {
                            borderRadius: 10,
                            backgroundColor: 'white'
                        }
                    }
                    

                    >

                        
                    <View style={style.boxitems}>

                        <TouchableOpacity style={[style.itemfilter, this.state.f1 ? style.itemfilteractive : null]}
                            onPress={ () => 
                                this.switchFilter(true,false,false,false)
                            }>
                            <Text style={[style.itemfiltertext, this.state.f1 ? style.itemtextactive : null]}>Guayaquil</Text>
                            
                        </TouchableOpacity>
                        <Divider />

                        <TouchableOpacity style={[style.itemfilter, this.state.f2 ? style.itemfilteractive : null]}
                            onPress={ () => 
                                this.switchFilter(false,true,false,false)
                            }>
                            <Text style={[style.itemfiltertext, this.state.f2 ? style.itemtextactive : null]}>Manta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[style.itemfilter,this.state.f3 ? style.itemfilteractive : null]}
                            onPress={()=>  this.switchFilter(false,false,true,false)}
                        >
                            <Text style={[style.itemfiltertext, this.state.f3 ? style.itemtextactive : null]}>Cuenca</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[style.itemfilter,this.state.f4 ? style.itemfilteractive : null]}
                            onPress={()=>  this.switchFilter(false,false,false,true)}>
                            <Text style={[style.itemfiltertext, this.state.f4 ? style.itemtextactive : null]}>Machala</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: 10, borderTopWidth: 1, borderTopColor: '#cccccc'}} >
                        <TouchableOpacity  onPress={ () => this.openFilter(false)}>
                            <Text style={{textTransform: "uppercase", fontWeight: 'bold', fontSize: 18, letterSpacing:0,color: '#A88C3D'}}>Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
        )

        
    }


    Contenido = () => {
        //alert(this.state.restaurants)
        if(this.state.restaurants==''){
            return(
                <View style={stylemsg.main}>
                    <Text style={[stylemsg.title,stylemsg.colortxt]}> No hay resultados </Text>
                    <Text style={[stylemsg.subtitle,stylemsg.colortxt]}> No se encontraron bares o restaurantes en esta ciudad</Text>
                </View>
            )
        }
        else{
            return(
                <FlatList
                data={this.state.restaurants}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item})=>
                    <View >{this._renderItem(item)}</View>
                }
                />


                // this.state.restaurants.map((item,index)=>{
                //     return(
                //         <View key={index}>{this._renderItem(item)}</View>
                //     )})
            )
        }
    }


}

const modal = StyleSheet.create({
    body:{
        paddingLeft: 20
    },  
    subtitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4c4c4c',
    },
    statusOpen:{
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold'
    },
    statusClose:{
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold'
    },
    schedule: {
        color: '#4c4c4c',
        fontSize: 18,
        
    }
})

const style = StyleSheet.create({
    main:{
        flex:1
    },
    header:{
        height: 50,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    back:{
        marginLeft: 20,
        marginTop: 10
    },
    filter:{
        marginRight: 20,
        marginTop: 10
    },  
    card:{
        height: 300,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
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
    boxinfo:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        
    },
    title:{
        flex: 2,
        fontWeight: 'bold',
        fontSize: 19
    },
    boxbuttons:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
        ,marginTop: 0,
    },
    buttons:{
        color: '#A88C3D',
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 5,
        letterSpacing: 0,

    },
    boxstars:{
        flex: 1,
        flexDirection: 'row',
        
    },
    
    containerimg:{
        flex: 1,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        overflow: 'hidden'
        
        //height: "50%",
    },
    img:{
        flex: 1,
       // marginTop: 10,
        borderRadius: 6,
        //backgroundColor: '#FFF'
    },
    boxstatus:{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: "100%",
        padding: 10, 
        justifyContent: 'flex-end'
    },
    textstatus:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    
        
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
    boxitems:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemfilter:{
        width: '100%',
        alignItems: 'center',
        //backgroundColor: 'skyblue',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderColor: '#cccccc',

       
        
    },
    itemfilteractive:{
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#A88C3D',
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderColor: '#cccccc',
        //fontWeight: 'bold'

       
        
    },
    itemfiltertext:{
        fontSize: 17,
        //color: '#4c4c4c'
        //color: '#fff'
    },
    itemtextactive:{
        fontWeight: 'bold',
        color: '#fff'
    }


    

})

const stylemsg = StyleSheet.create({
    main:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    subtitle:{
        fontSize: 15,
        marginLeft: 50,
        marginRight:50,
        textAlign: 'center',
        marginTop: 15
    },
    colortxt:{
        color: '#8c8c8c'
    }
})


export default Restaurants;
