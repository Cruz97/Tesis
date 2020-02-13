import React, { Component } from 'react'
import { Text, View, Image,StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native'
import {
    Input,
    Layout,
  } from 'react-native-ui-kitten';
  import { Icon, colors } from 'react-native-elements';
  import { List } from 'react-native-paper';

export class ConsumptionsCenter extends Component {
    static navigationOptions={
        title: 'Restaurantes y Bares',
        hideRightComponent: 'hide'
    }

    state = {
        expanded: true
      }
    
    _renderMap = () => {
        return(
            <View style={style.boxmap}>
                <Image 
                style={style.mapa}
                source={require('../assets/img/googlemaps.png')}
                
                ></Image>
            </View>
        )
    }
    
      _handlePress = () =>
        this.setState({
          expanded: !this.state.expanded
        });

    render() {
        return (
            <View style={style.main}>
                <View style={style.boxsearch}>
                    <TextInput 
                    style={[style.inputsearch, style.hinput]} 
                    placeholder="Buscar"
                    placeholderTextColor="#8c8c8c"
                
                    />
                    <TouchableOpacity style={style.iconsearch}>
                        <Icon 
                            name="search" 
                            size={35} 
                            color='#8c8c8c' 
                        />
               
                    </TouchableOpacity>
                </View>
                <View style={style.result}>
                    <Text style={style.textresult}>4 resultados en "Cuenca"</Text>
                </View>


                <View>
                

                <List.Section style={style.section}>

                <List.Accordion
                    title="GOURMET DELI"
                    //left={props => <List.Icon {...props} icon="folder" />}
                    style={style.accordion}
                    theme={theme}
                    titleStyle={titleStyle}
                    //expanded={this.state.expanded}
                    onPress={this._handlePress}
                    >
                   
                    {this._renderMap()}
                    
                </List.Accordion>

                <List.Accordion
                    title="EL PATIO"
                    //left={props => <List.Icon {...props} icon="folder" />}
                    style={style.accordion}
                    theme={theme}
                    titleStyle={titleStyle}
                    //expanded={this.state.expanded}
                    //onPress={this._handlePress}
                    >
                    {/* <List.Item title="First item" />
                    <List.Item title="Second item" /> */}
                    <View style={style.boxmap}>
                    {this._renderMap()}
                    </View>
                </List.Accordion>

                <List.Accordion
                    title="LA FONDUE"
                    //left={props => <List.Icon {...props} icon="folder" />}
                    style={style.accordion}
                    theme={theme}
                    titleStyle={titleStyle}
                    //expanded={this.state.expanded}
                    //onPress={this._handlePress}
                    >
                    {/* <List.Item title="First item" />
                    <List.Item title="Second item" /> */}
                    <View style={style.boxmap}>
                    {this._renderMap()}
                    </View>
                </List.Accordion>
                <List.Accordion
                    title="PLAZA BAR"
                    //left={props => <List.Icon {...props} icon="folder" />}
                    style={style.accordion}
                    theme={theme}
                    titleStyle={titleStyle}
                    //expanded={this.state.expanded}
                    //onPress={this._handlePress}
                    >
                    {/* <List.Item title="First item" />
                    <List.Item title="Second item" /> */}
                    <View style={style.boxmap}>
                    {this._renderMap()}
                    </View>
                </List.Accordion>
            </List.Section>
           
                </View>
            </View>
        )
    }
}

const theme = {
    colors:{
        text: 'white'
    }
}

const titleStyle = {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
         textAlign: 'center',
}

const style = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    boxsearch:{
        flexDirection: 'row',
        
        alignItems: 'center',
        marginTop: 20
    },
    inputsearch:{
        flex: 1,
        
        marginLeft: 25,
        marginRight: 20,
        //width: '70%',
        paddingVertical: 0,
        paddingHorizontal: 10,
        margin: 0,
        fontSize: 18,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
        //borderWidth: 1,
        color: '#8c8c8c',

        borderRadius: 4,
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
    hinput:{
        height: 40,
    },
    iconsearch:{
        marginRight: 20,
        color: '#8c8c8c'
    },
    textresult:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 35,
        marginTop: 15   
    },
    section:{
        marginTop: 20,
        
        
    },
    accordion:{
        backgroundColor: '#484e65',
        marginTop: 10,
        //marginLeft: 20,
        //marginRight: 20,
        //borderRadius: 20
        
    },
    mapa:{
        width: "100%",
        height: 150,
        resizeMode: 'cover'
        },
    boxmap:{
       
        
    }
});

export default ConsumptionsCenter
