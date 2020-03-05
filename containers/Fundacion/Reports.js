import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView,TouchableOpacity, Alert, FlatList  } from 'react-native'
import {PieChart, BarChart} from 'react-native-chart-kit'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import {myTheme} from '../../src/assets/styles/Theme'
import CalendarPicker from 'react-native-calendar-picker';
import {Dialog} from 'react-native-simple-dialogs';
import moment from 'moment'
import {ListItem, Icon} from 'react-native-elements'

const data = [
    {
      name: "Sin Hogar",
      population: 5,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Adoptadas",
      population: 10,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 5,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 5,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 4,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

export class Reports extends Component {

    static navigationOptions = {
        title: 'Reportes',
        hideRightComponent: 'hide'
    }

    constructor(props){
        super(props);
        this.state = {
            data: [],
            showCalendar1: false,
            showCalendar2: false,
            showReport1: false,
            showReport2: false,
            timestamp1: 0,
            timestamp2: 0,
            results: [],
            publicaciones: {},
            usuarios: {},
            datamascotas: [],
            solicitudes: [],
            totalmascotas: 0,
            totalsolicitudes: 0,
             dataBar:{
                labels: ["Por Revisar", "En revision", "Aprobadas", "Rechazadas"],
                datasets: [
                  {
                    data: [10, 20, 25, 10]
                  }
                ]
              },
              selectedStartDate: null,
              selectedEndtDate: null
        }
        this.onDateChange1 = this.onDateChange1.bind(this);
        this.onDateChange2 = this.onDateChange2.bind(this);
    }

    onDateChange1(date) {
      let aux = moment(date.toString()).format('YYYY-MM-DD') 
      var timestamp = (new Date(aux)).getTime()/1000
      this.setState({
        selectedStartDate: date, timestamp1: timestamp, showCalendar1: false
      });
    }

    onDateChange2(date) {
      let aux = moment(date.toString()).format('YYYY-MM-DD') 
      var timestamp = (new Date(aux)).getTime()/1000
      this.setState({
        selectedEndtDate: date, timestamp2: timestamp, showCalendar2: false
      });
    }

    componentDidMount(){
        let id = firebase.auth().currentUser.uid;
        let refSolicitudes = firebase.database().ref('solicitudes/'+id);
        refSolicitudes.on('value',(snapshot)=>{
            var arrayChilds = [];
            var data = [];
            let for_review = 0;
            let in_review = 0;
            let approved = 0;
            let rejected = 0;
            let success = 0;
            let totalsolicitudes = 0;

            snapshot.forEach((childSnapshot) =>{
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                var status = childData.status_request;
                switch(status){
                    case 'NEW REQUEST':
                        for_review++;
                        break;
                    case 'IN REVIEW':
                        in_review++;
                        break;
                    case 'APPROVED':
                        approved++;
                        break;
                    case 'REJECTED':
                        rejected++;
                        break;
                    case 'SUCCESS':
                        success++;
                        break;
                }
                

                //arrayChilds.push({key: key,data: childData})
            });

            let datos = [
                {
                    name: "Por Revisar",
                    population: for_review,
                    color: "blue",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                  },
                  {
                    name: "En Revisión",
                    population: in_review,
                    color: "orange",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                  },
                  {
                    name: "Aprobadas",
                    population: approved,
                    color: "green",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                  },
                  {
                    name: "Rechazadas",
                    population: rejected,
                    color: "red",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                  },
                  {
                    name: "Finalizadas",
                    population: success,
                    color: "yellow",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                  },
            ]

            totalsolicitudes = for_review + in_review +approved+rejected+success;

            this.setState({
                data: datos,
                totalsolicitudes
            })
        })



        let refPublicaciones = firebase.database().ref('publicaciones/'+id);
        refPublicaciones.on('value',(snapshot)=>{

          var arrayPublicaciones = {};
            snapshot.forEach((child)=>{
                arrayPublicaciones[String(child.key)] = child.val()
            })
            //alert(JSON.stringify(arrayPublicaciones,null,4))
            this.setState({publicaciones: arrayPublicaciones})

            var arrayChilds = [];
            var data = [];
            let for_adoption = 0;
            let adopted = 0;
            let totalmascotas = 0;
            snapshot.forEach((childSnapshot) =>{
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                var status = childData.status;
                switch(status){
                    case 'FOR_ADOPTION':
                        for_adoption++;
                        break;
                    case 'ADOPTED':
                        adopted++;
                        break;
                }

                //arrayChilds.push({key: key,data: childData})
            });

            let datos = [
                {
                    name: "Adoptadas",
                    population: adopted,
                    color: "green",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                  },
                  {
                    name: "No Adoptadas",
                    population: for_adoption,
                    color: "red",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                  }
                  
            ]

            totalmascotas = adopted + for_adoption;

            this.setState({
                datamascotas: datos,
                totalmascotas
            })
        })

        
        let refUsuarios= firebase.database().ref('usuarios')
        

        refUsuarios.on('value',(snapshot)=>{
            var arrayUsuarios = {};
            snapshot.forEach((child)=>{
                arrayUsuarios[String(child.key)] = child.val()
            })
            //alert(JSON.stringify(arrayPublicaciones,null,4))
            this.setState({usuarios: arrayUsuarios})
        })

    }

    diference = (timestamp1, timestamp2) => {
      var EndTime = timestamp1*1000
      var StartTime = timestamp2*1000
      var resolution = moment(EndTime - StartTime).asHours();
      return resolution;
  }

    _keyExtractor = item => item.key;

    _renderItem = ({ item }) => this._renderItemSolicitud(item)

    _renderItemSolicitud = (item) => {
       
        const {key,data} = item;
        var obj = {}
        let idFoundation = firebase.auth().currentUser.uid;
        let pet = this.state.publicaciones[data.idPet];
        let user = this.state.usuarios[data.idUser];
        let list_status = data.list_status;

        let tiempo_transcurrido = 0;
        let tiempo_inicio = list_status['new'];

        let fecha_inicio = new Date(tiempo_inicio*1000)
        let fecha_fin = ''
        switch (data.status_request) {
          case 'NEW REQUEST':
            var now = new Date();
            var utc = new Date(now.getTime());
            var timestamp = (utc.getTime()/1000 |0)
            tiempo_transcurrido = timestamp - tiempo_inicio;
            fecha_fin = new Date(timestamp*1000)
              break;
           case 'IN REVIEW':
             tiempo_transcurrido = list_status['review'] - tiempo_inicio;
             fecha_fin = new Date(list_status['review']*1000)
               break;
           case 'REJECTED':
            tiempo_transcurrido = list_status['rejected'] - tiempo_inicio;
            fecha_fin = new Date(list_status['rejected']*1000)
             break;
           case 'APPROVED':
            tiempo_transcurrido = list_status['approved'] - tiempo_inicio;
            fecha_fin = new Date(list_status['approved']*1000)
               break;
           case 'SUCCESS':
            tiempo_transcurrido = Math.floor((list_status['adopted']*1000-tiempo_inicio*1000) / (1000));
            fecha_fin = new Date(list_status['adopted']*1000)

          default:
              break;
      }
      let fecha1 = moment(fecha_fin, 'YYYY-MM-DD HH:mm:ss');
      let fecha2 = moment(fecha_inicio,'YYYY-MM-DD HH:mm:ss')
      let fechatotal = fecha2.diff(fecha1, 'm'); 
      let dias = fecha2.diff(fecha1, 'd'); 
      let horas = fecha2.diff(fecha1, 'h');
      let minutos = fecha2.diff(fecha1, 'm');
      let stringFecha = dias*(-1) + ' días con '+ horas*(-1) + ' horas y '+  minutos*(-1) + ' minutos'
        return(
            pet && user ? 
            (
                <TouchableOpacity
                onPress={()=>{
                    //alert(JSON.stringify(data.idPet,null,4))
                }} 
                 >
                    <ListItem
            title={'Mascota: '+pet.name}
            subtitle={'Adoptante: '+user.name+ ' '+user.lastname + '\nTiempo transcurrido: ' +stringFecha}
            leftAvatar={{
                source: {uri: pet.picture},
                title: item.name,
                size: 'medium'
            }}
            bottomDivider
            
            rightElement={
               ()=>{
                   switch (data.status_request) {
                       case 'NEW REQUEST':
                           return(
                            <TouchableOpacity
                            onPress={
                            ()=>{
                            }}
                            
            
                        ><Text style={style.new}>Por Revisar</Text></TouchableOpacity>
                           )
                           break;
                        case 'IN REVIEW':
                            return(
                                <TouchableOpacity
                                onPress={()=>{}} 
                                ><Text style={style.review}>En Revisión</Text></TouchableOpacity>
                            )
                            break;
                        case 'REJECTED':
                            return(
                                <Text style={style.rejected}>Rechazada</Text> 
                            )
                            break;
                        case 'APPROVED':
                            return(
                                <TouchableOpacity
                                onPress={()=>{} }
                            >
                                <Text style={style.approved}>Aprobada</Text> 
                             </TouchableOpacity>  
                            )
                            break;
                        case 'SUCCESS':
                            return(
                                <Text style={style.approved}>Adoptado</Text>
                            )

                   
                       default:
                           break;
                   }

               }
            }
            />

        </TouchableOpacity>
            ): null )
    
    

        
    }

    render() {
      const { selectedStartDate, selectedEndtDate } = this.state;
      let fechainicio = selectedStartDate ?  moment(selectedStartDate.toString()).format('YYYY-MM-DD') : 'YYYY-MM-DD';
      let fechafin = selectedEndtDate ?  moment(selectedEndtDate.toString()).format('YYYY-MM-DD') : 'YYYY-MM-DD';
      let startDate = (new Date(fechainicio)).getTime()/1000
      let endDate = (new Date(fechafin)).getTime()/1000
        const chartConfig = {
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            },
            strokeWidth: 2, // optional, default 3
            barPercentage: 1
            
          }
          // const screenWidth = Dimensions.get("window").width;
          const screenWidth = 300;

        return (
            <ScrollView style={style.main}>
               <Dialog title={"Seleccione la fecha de inicio"}
                    animationType="fade"
                    onTouchOutside={ () => this.setState({showCalendar1: false}) }
                    visible={ this.state.showCalendar1 } 
                    titleStyle={
                        {
                            fontSize: 17,
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
                      <View style={style.containerPicker1}>
                      <CalendarPicker
                        onDateChange={this.onDateChange1}
                        width= {300}
                        height= {300}
                      />
                      {/* <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={style.btnCancel} 
                        onPress={()=> this.setState({showCalendar1: false})}>
                          <Text style={style.textfilter}>
                            Cancelar
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.btnAccept}>
                          <Text style={style.textfilter}>
                            Aceptar
                          </Text>
                        </TouchableOpacity>
                     </View> */}
                      <View>

                      </View>
                      </View>

                    </Dialog>


                    <Dialog title={"Seleccione la fecha de fin"}
                    animationType="fade"
                    onTouchOutside={ () => this.setState({showCalendar2: false}) }
                    
                    visible={ this.state.showCalendar2 } 
                    titleStyle={
                        {
                            fontSize: 17,
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
                      <View style={style.containerPicker1}>
                      <CalendarPicker
                        onDateChange={this.onDateChange2}
                        width= {300}
                        height= {300}
                      />
                      {/* <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={style.btnCancel} 
                    onPress={()=> this.setState({showCalendar2: false})}>
                      <Text style={style.textfilter}>
                        Cancelar
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.btnAccept}>
                      <Text style={style.textfilter}>
                        Aceptar
                      </Text>
                    </TouchableOpacity>
            </View> */}
                      <View>

                      </View>
                      </View>

                    </Dialog>

                    <Dialog title={"Mascotas de la fundación"}
                    animationType="fade"
                    onTouchOutside={ () => this.setState({showReport1: false}) }
                    visible={ this.state.showReport1 } 
                    titleStyle={
                        {
                            fontSize: 17,
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
                      <View style={style.boxtitle}>
                        <Text style={style.title}>Total: { this.state.totalmascotas} mascotas</Text>
                      </View>

            
                      <PieChart
                        data={this.state.datamascotas}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                        />

                    </Dialog>

                    <Dialog title={"Solicitudes de adopción"}
                    animationType="fade"
                    onTouchOutside={ () => this.setState({showReport2: false}) }
                    visible={ this.state.showReport2 } 
                    titleStyle={
                        {
                            fontSize: 17,
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
                      <View style={style.boxtitle}>
                        <Text style={style.title}>Total: { this.state.totalsolicitudes} solicitudes</Text>
                                </View>

                            <PieChart
                            data={this.state.data}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="10"
                            absolute
                            />

                    </Dialog>
                {/* <View style={style.boxtitle}>
                    <Text style={style.title}>Mascotas de la fundación</Text>
                </View> */}
                
                <TouchableOpacity
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    marginVertical: 10,
                    marginHorizontal: 20,
                    backgroundColor: myTheme['color-info-800'],
                    borderRadius: 25
                  }}
                  onPress={()=>{
                    this.setState({showReport1: true})
                  }}
                >
                  <Text style={style.textfilter}>Ver estadística general de las mascotas</Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    marginVertical: 5,
                    marginHorizontal: 20,
                    backgroundColor: myTheme['color-success-700'],
                    borderRadius: 30
                  }}
                  onPress={()=>{
                    this.setState({showReport2: true})
                  }}
                >
                  <Text style={style.textfilter}>Ver estadística general de las solicitudes de adopción</Text>

                </TouchableOpacity>
                
                
                {/* <View style={style.boxtitle}>
                    <Text style={style.title}>Solicitudes de adopción de mascotas</Text>
                </View> */}
                 <View style={{marginVertical: '2%',justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold', 
                            fontSize: 16, 
                            color: '#999999'
                            }}>Búsqueda de solicitudes por fechas</Text>
                    </View>
                

            <View style={style.boxfilters}>
                    <View style={{flexDirection: 'row',justifyContent: 'center'}}> 
                      
                      <View style={[style.boxdate,{alignItems: 'flex-start', marginLeft: 20}]}>
                      <Text style={style.txtdate}>
                          Fecha de inicio
                        </Text> 
                      </View>
                      
                      <TouchableOpacity
                       onPress={()=> this.setState({showCalendar1: true})}
                        style={{
                          backgroundColor: myTheme['color-primary-500'],
                          marginHorizontal: '10%',
                          padding: 5,
                          borderRadius: 10
                        }}
                      >
                        <Icon 
                        name='today'
                        size={25}
                        color='#FFF'

                          
                        />

                      </TouchableOpacity>
                      <View style={style.boxdate}>
                        <Text style={style.txtdate}>{fechainicio}</Text>
                      </View>
                      

                    </View>

                    <View style={{marginTop: 10,flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={[style.boxdate,{alignItems: 'flex-start', marginLeft: 20}]}>
                      <Text style={style.txtdate}>
                          Fecha de fin
                        </Text> 
                      </View>
                      <TouchableOpacity
                       onPress={()=> this.setState({showCalendar2: true})}
                        style={{
                          backgroundColor: myTheme['color-primary-500'],
                          marginHorizontal: '10%',
                          padding: 5,
                          borderRadius: 10
                        }}
                      >
                        <Icon 
                        name='today'
                        size={25}
                        color='#FFF'

                          
                        />

                      </TouchableOpacity>
                      <View style={style.boxdate}>
                        <Text style={style.txtdate}>{fechafin}</Text>
                      </View>
                    </View>

                    
            </View>
            
            <View style={{marginHorizontal: 20,flexDirection: 'row', justifyContent: 'center',alignSelf: 'flex-end' , marginTop: 20}}>
                    <TouchableOpacity style={style.btnsearch} 
                    onPress={()=>{
                     
                      
                      let id = firebase.auth().currentUser.uid;
                      // alert(this.state.timestamp2)
                      let refSolicitudes = firebase.database().ref('solicitudes/'+id);
                      refSolicitudes.on('value',(snapshot)=>{
                        var results = [];
                        snapshot.forEach((child)=>{
                          let request = child.val();
                          let key = child.key;
                          let obj = {key, data: request}
                          if((request.dateProcess >= this.state.timestamp1 && request.dateProcess <= this.state.timestamp2) || (request.dateProcess === this.state.timestamp1 && request.dateProcess === this.state.timestamp2) ){
                            results.push(obj);
                            
                          }
                        })
                        this.setState({results})
                        // alert(JSON.stringify(results,null,4))
                      })
                     
                    }}
                      // onPress={()=> this.setState({showCalendar1: true})}
                      >
                        <Icon 
                          name='search'
                          size={20}
                          color='#fff'
                        />
                        <Text style={style.textsearch}>
                          Buscar
                        </Text>
                      </TouchableOpacity>

                    </View>

                    {
                    this.state.results.length > 0 ?
                    (
                        <FlatList 
                    style={{flex:1}}
                    data={this.state.results.sort((a)=>{
                        if(a.data.status_request === 'REJECTED'){
                            return -1
                        }
                    }).sort((a)=>{
                        if(a.data.status_request === 'SUCCESS'){
                            return -1
                        }
                    }).sort((a)=>{
                        if(a.data.status_request === 'APPROVED'){
                            return -1
                        }
                    }).sort((a)=>{
                        if(a.data.status_request === 'IN REVIEW'){
                            return -1
                        }
                    }).sort((a)=>{
                        if(a.data.status_request === 'NEW REQUEST'){
                            return -1
                        }

                    })
                
                }
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />

                    ):
                    (
                    <View style={{flex:1,marginTop: 10 ,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold', 
                            fontSize: 22, 
                            color: '#999999'
                            }}>Sin resultados......</Text>
                    </View>

                    )
                }
           

       

            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    main:{
        flex:1
    },
    boxtitle:{
        marginTop: '3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    boxfilters:{
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    btnfilter1:{
      flex:1,
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginVertical: '1%',
      marginHorizontal: '1%',
      backgroundColor: myTheme['color-primary-500']
    },
    btnfilter2:{
      flex:1,
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginVertical: '1%',
      marginHorizontal: '1%',
      backgroundColor: myTheme['color-primary-500']
    },
    textfilter: {
      // flex:1,
      color: '#fff',
      textAlign: 'center'
    },
    containerPicker1:{
      //flex:1,
      
    },
    btnCancel:{
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginVertical: '1%',
      marginHorizontal: '5%',
      backgroundColor: myTheme['color-danger-500']
    },
    btnAccept:{
      paddingHorizontal: 30,
      paddingVertical: 10,
      marginVertical: '1%',
      marginHorizontal: '5%',
      backgroundColor: myTheme['color-primary-700']
    },
    boxdate:{
      flex:1,
      justifyContent: 'center'
    },
    txtdate:{
      color: '#999999',
      fontWeight: 'bold',
      fontSize: 16,

    },
    btnsearch:{
      flexDirection: 'row',
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: myTheme['color-primary-700']
    },
    textsearch:{
      color: '#fff'
    },
    approved:{
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius:10,
      backgroundColor: myTheme['color-success-500'],
      color: '#fff'
  },
  rejected:{
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius:10,
      backgroundColor: myTheme['color-danger-500'],
      color: '#fff'
  },
  new:{
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius:10,
      backgroundColor: myTheme['color-primary-700'],
      color: '#fff'
  },
  review:{
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius:10,
      backgroundColor: myTheme['color-warning-600'],
      color: '#fff'
  }
})


export default Reports
