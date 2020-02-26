import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import {PieChart, BarChart} from 'react-native-chart-kit'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import {myTheme} from '../../src/assets/styles/Theme'

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
        title: 'Datos estadísticos',
        hideRightComponent: 'hide'
    }

    constructor(props){
        super(props);
        this.state = {
            data: [],
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
              }
        }
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


        // let idFoundation = firebase.auth().currentUser.uid;
        // let refPublicaciones = firebase.database().ref('publicaciones/'+idFoundation)
        

        // refPublicaciones.on('value',(snapshot)=>{
        //     var arrayPublicaciones = {};
        //     snapshot.forEach((child)=>{
        //         arrayPublicaciones[String(child.key)] = child.val()
        //     })
        //     //alert(JSON.stringify(arrayPublicaciones,null,4))
        //     this.setState({publicaciones: arrayPublicaciones})
        // })

    }

    render() {
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
          const screenWidth = Dimensions.get("window").width;

        return (
            <ScrollView style={style.main}>
                <View style={style.boxtitle}>
                    <Text style={style.title}>Mascotas de la fundación</Text>
                </View>
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
            //hasLegend={true}
            />
        
                
                
                <View style={style.boxtitle}>
                    <Text style={style.title}>Solicitudes de adopción de mascotas</Text>
                </View>
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
        justifyContent: 'center'
    },
    title:{
        fontSize:18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})


export default Reports
