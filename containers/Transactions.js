import React, { Component } from 'react'
import { Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    Platform} from 'react-native';
import { 
    Avatar, 
    Button, 
    Card, 
    Title, 
    Paragraph
     } from 'react-native-paper';
import Database from '../database'
import moment from 'moment';
import {Dialog} from 'react-native-simple-dialogs';

const schemaName = 'User'
// const uuid = "ec366d60-0a9b-11ea-82b1-e37e650f4e3b";

export class Transactions extends Component {
    static navigationOptions = {
        title: 'Transacciones',
        hideRightComponent: 'hide',
      };

      constructor(props){
        super(props);
       
        this.state = {
           
        }
      }

    //   state={
    //       dataTran: Database.CloudDB.get(schemaName,uuid).membresy
    //   }
    openModal = (show, item) => {
        
            this.setState({show: show, item: item})
        
       

    }

    _renderTransac = (item)=> {
        const buy = item.concept
        const date = moment(item.date_purchase).format("DD MMM YYYY")
        const total = parseFloat(item.amount)
        return(
            <View>
               <Card style={style.card}>
                   <Card.Content>
                   <Text style={style.textotitle}>{buy}</Text>
                    
                    <View style={style.box}>
                        <Text>{date}</Text>
                        <Text style={style.value}>USD $ {total.toFixed(2)}</Text>
                    </View>
                   </Card.Content>
                   <Card.Actions style={style.boxbutton}>
                       <TouchableOpacity style={style.boton} onPress={()=> this.openModal(true,item)}>
                           <Text style={style.textobtn}>DETALLES</Text>
                       </TouchableOpacity>
                       
                   </Card.Actions>

               </Card>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={style.main}>
                <View style={stylemsg.main}>
                        <Text style={[stylemsg.title,stylemsg.colortxt]}> No hay resultados </Text>
                        <Text style={[stylemsg.subtitle,stylemsg.colortxt]}> No se encontraron transacciones</Text>
                 </View>
            </ScrollView>
        )
    }
}


// const dataTran=[
//     {
//         buy: 'Compra 1', 
//         date: '30 Sep 2020', 
//         value: 300.00},

//     {
//         buy: 'Compra 2', 
//         date: '30 Sep 2020', 
//         value: 400},
//      {
//         buy: 'Compra 3', 
//         date: '30 Sep 2020', 
//         value: 500},
//     {
//         buy: 'Compra 4', 
//         date: '30 Sep 2020', 
//         value: 600},

        
//]

const style = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor: '#f2f2f2',
    },
    card:{
        borderRadius: 5,
        marginLeft: 15, 
        marginRight:15,
        marginTop: 20,
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    boton:{
        //alignItems: 'center',
        marginTop: 5,
        justifyContent: 'center'
    },
    textotitle:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    textobtn:{
        color: '#A88C3D',
        textTransform: "uppercase",
        fontSize: 15,
        letterSpacing: 0,
        fontWeight: 'bold'
    },
    box:{
        marginTop: 4,
        marginRight:10,
        flexDirection: 'row',
        justifyContent:  'space-between',
        alignItems: 'baseline'
       
        
    },
    boxbutton:{
        marginTop: 0,
        marginBottom: 10,
        marginRight:10,
        flexDirection : 'row',
        justifyContent: 'flex-end',
        
    },
    value:{
        fontSize: 20
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
        textAlign: 'center',
        fontSize: 18
    }
    
});

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


export default Transactions;
