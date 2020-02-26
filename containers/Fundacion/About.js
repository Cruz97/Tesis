import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import { myTheme } from '../../src/assets/styles/Theme';
import {ListItem, Icon} from 'react-native-elements';



const ItemAbout = props => {
    const {title,subtitle,iconName,containerStyle} = props;
   return(

    <ListItem
    //key={i}
    //onPress={()=>{}}
    leftIcon = {
        <Icon name={iconName} size={24} color={ myTheme['color-primary-700']} iconStyle={{marginLeft: 10}} />
    }
    // leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
    title={title}
    subtitle={subtitle}
    titleStyle={{
        fontSize: 17,
        fontWeight: 'bold',
        color: myTheme['color-material-primary-400']
    }}

    subtitleStyle={{
        //marginLeft: 20
    }}

    containerStyle={containerStyle}

   contentContainerStyle={{
       marginLeft: '4%',
       
       //paddingBottom: 0,
       //paddingVertical: 0
   }}
    
   
/> 

   )
}

const TitleItem = props => {
    const {title} = props
    return(
        <ListItem title={title}
    containerStyle={{ paddingBottom: '5%'}} 
    titleStyle={{fontWeight: 'bold', fontSize: 18, color: myTheme['color-material-primary-400']}} />
    )
}


export class About extends Component {

    static navigationOptions = {
        title: 'Acerca de',
        hideRightComponent: 'hide',
        back: true
    }

    render() {
        return (
            <ScrollView style={style.main}>
                <View style={style.boxitem}>
                    {/* <View style={style.item}> */}
                        <ListItem
                            //key={i}
                            leftIcon = {
                                <Icon name='stay-primary-portrait' size={60} color={myTheme['color-primary-700']}/>
                            }
                            // leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                            title='Adopcion PG'
                            subtitle='adopcionpgoficial@gmail.com'
                            titleStyle={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: myTheme['color-material-primary-500']
                            }}

                            containerStyle={{paddingBottom: 15, }}
                            //bottomDivider
                        />

                        <ItemAbout title='Versión' subtitle='0.0.1' iconName='info'
                         containerStyle={{
                            paddingBottom: '0%',
                            paddingTop: '1%',
                            
                    
                        }} />
                        <ItemAbout title='Licencia' iconName='class'  
                          />

 
                            {/* <View style={style.boxinfo}>
                                <Text style={style.title}>texto</Text>
                            </View> */}
                        {/* </View> */}
                    </View>

                    <View style={style.boxitem}>
                        <TitleItem title='Autores' />
                        <ItemAbout title='José Cruz' 
                        subtitle='jose.cruzal@ug.edu.ec'
                         iconName='account-circle'
                         containerStyle={{
                            paddingBottom: '0%',
                            paddingTop: '1%',
                    
                        }} />

                        <ItemAbout title='Lorena Morales'
                         subtitle='lorena.moralesl@ug.edu.ec'
                          iconName='account-circle' />
                    </View>

                    <View style={style.boxitem}>
                        <TitleItem title='Organización' />
                        <ItemAbout title='Ciudad' subtitle='Guayas - Ecuador' iconName='room' 
                        containerStyle={{
                            paddingBottom: '0%',
                            paddingTop: '1%',
                    
                        }} />
                        <ItemAbout title='Copyright' subtitle='2020 ©AdopciónPG' iconName='copyright' />
                    </View>
                
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor:'#e6e6e6'
        //backgroundColor:'#A88C3D'
    },
    boxitem:{
        //flex:2,
        //backgroundColor: 'skyblue',    
        //height: 250,
        //width: '100%',
        marginHorizontal: '5%',
        marginVertical: '4%',
      
        //borderWidth: 1,
        
    },
    item:{
        flex: 2,
       // width: '100%',
       
        flexDirection: 'column',
        marginVertical: 15,
        marginHorizontal: 15,
        borderRadius: 0,
        //resizeMode: 'c',
        overflow: 'hidden',
        height: 210,
        //width: '30%',
        borderColor: 'rgba(0,0,0,0.6)',
        backgroundColor: '#A88C3D',
        
    
        shadowColor: "#8c8c8c",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 1,
    },
    elevation: 20
       },
       boximg:{
        width: '100%',
        height: 150
        
       },
       boxinfo:{
           
        //flex:1,
        paddingVertical:10,
        backgroundColor: myTheme['color-primary-600'],
        justifyContent: 'center'
        //paddingBottom: 60,
        //marginTop: 10
       },
       img:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        
       },
       title:{
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#000'
       
        //marginTop: 5,
        //marginBottom: 10
    },
    infofundacion:{
        fontSize: 13,
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
})

export default About
