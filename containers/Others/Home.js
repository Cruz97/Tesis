import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
//import Database from '../database/index'
//import Realm from 'realm'

const schemaName = 'Certificates3'

const cert1 = {
    cuid: '1',
    title: 'Un día de entrenamiento',
    date: '30 Sep 2020',
    url: 'https://josecruzal.000webhostapp.com/Sources/certif1.png'
}
const cert2 = {
    cuid: '2',
    title: 'Suite de Bodas',
    date: '10 Dic 2020',
    url: 'https://josecruzal.000webhostapp.com/Sources/certif2.png'
}

export class Home extends Component {

    constructor(){
        super();
        // try{
            
        
        //Database.LocalDB.create(schemaName,cert1)
        //Database.LocalDB.create(schemaName, cert1, ()=> alert('Certificado registrado'))
        //Database.LocalDB.create(schemaName, cert2, ()=> alert('Certificado registrado'))
        //alert(JSON.stringify(Database.LocalDB.searchAll(schemaName)))
        //Database.LocalDB.get(schemaName,'1');
        //Database.LocalDB.deleteAllObjects(schemaName);
        // }
        // catch(e){
        //     alert(e);
        // }
    }
    
   
    static navigationOptions = {
        title: 'Home'
    }

    
  
        
    

    render() {
        return (
            
            <View style={style.main}>
                <Text style={[style.title,style.colortxt]}> Inicio</Text>
             </View>
        )
    }
}


const style = StyleSheet.create({
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

export default Home;
