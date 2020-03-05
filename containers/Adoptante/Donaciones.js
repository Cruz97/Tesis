import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { List } from 'react-native-paper';
import {myTheme} from '../../src/assets/styles/Theme'
import {ListItem, Avatar} from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

const RenderItem = props => {
    const {title,source} = props;
    
    return( 
    <ListItem
    containerStyle={{
        marginVertical: 0,
        paddingVertical: 0
    }}
        title={title}
        leftElement={
                <Avatar
                size={100}
                source={source}
                
                activeOpacity={0.7}
                />
        }
        titleStyle={{
            marginLeft: 10,
            fontSize: 17
        }}

        bottomDivider
    /> )
}

export class Donaciones extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            expanded1: true,
            expanded2: false,
            expanded3: false
        }
    }

    static navigationOptions = {
        title: 'Donaciones',
        hideRightComponent: 'hide',
    }

    _handlePress1 = () =>
    this.setState({
      expanded1: !this.state.expanded1
    });

    _handlePress2 = () =>
    this.setState({
      expanded2: !this.state.expanded2
    });

    _handlePress3 = () =>
    this.setState({
      expanded3: !this.state.expanded3
    });

    

    render() {
        return (
            <ScrollView style={style.main}>
                <Text style={{fontSize: 15, color: myTheme['color-material-primary-700'],marginHorizontal: 10, textAlign: 'left'}}>
                Para realizar cualquier tipo de donaciones, por favor contáctese directamente con la fundación, para coordinar lugar, hora y fecha de entrega de su donación. 
                </Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Fundaciones')}>
                    <Text style={{fontSize: 15, color: myTheme['color-info-700'],marginHorizontal: 10, textAlign: 'center'}}>Ir a fundaciones </Text></TouchableOpacity>
                <List.Section 
                title="Artículos que se pueden donar a las fundaciones" 
                    theme={{
                        colors:{
                            primary: myTheme['color-primary-700']
                        }
                    }}
                >
                <List.Accordion
                theme={{
                    colors:{
                        primary: myTheme['color-primary-700']
                    }
                }}
                title="Alimentos "
                left={props => <List.Icon {...props} icon="folder" />}
                expanded={this.state.expanded1}
                onPress={this._handlePress1}
                >
                    <View style={{paddingLeft: -64}}>
                    <RenderItem title={'Balanceados (perros/gatos)'} source={require('../../assets/img/balanceado.jpg')}  />
                    <RenderItem title={'Comidas enlatadas (perros/gatos)'} source={require('../../assets/img/enlatadas.jpg')}  />
                    {/* <RenderItem title={'Croquetas (perros) / Wiskas (gatos)'} source={require('../../assets/img/croquetas.jpg')}  /> */}
                    <RenderItem title={'Barritas jugosas'} source={require('../../assets/img/barritas.png')}  />

                   </View>
  
                </List.Accordion>

                <List.Accordion
                title="Artículos"
                left={props => <List.Icon {...props} icon="folder" />}
                expanded={this.state.expanded2}
                onPress={this._handlePress2}
                >
                     <View style={{paddingLeft: -64}}>
                     <RenderItem title={'De Limpieza (cloro, aromatizantes, escobas, desinfectantes, etc)'} 
                                  source={require('../../assets/img/limpieza.jpg')}  />
                    <RenderItem title={'De Aseo animal'} 
                                  source={require('../../assets/img/aseo.jpg')}  />
                    <RenderItem title={'Arena para gatos'} 
                                  source={require('../../assets/img/arena2.jpg')}  />

                     </View>

                </List.Accordion>

                <List.Accordion
                title="Fármacos"
                left={props => <List.Icon {...props} icon="folder" />}
                expanded={this.state.expanded3}
                onPress={this._handlePress3}
                >

                <View style={{paddingLeft: -64}}>
                <RenderItem title={'Medicinas'} 
                                  source={require('../../assets/img/medicinas.jpeg')}  />
                <RenderItem title={'Alcholo etílico'} 
                                  source={require('../../assets/img/alcohol.jpg')}  />
                  <RenderItem title={'Gasas'} 
                                source={require('../../assets/img/gasas.jpg')}  />
                <RenderItem title={'Complejo B'} 
                                  source={require('../../assets/img/complex.jpg')}  />
                  <RenderItem title={'Pastillas antipulgas y garrapatas'} 
                                  source={require('../../assets/img/antipulgas.jpg')}  />
                <RenderItem title={'Pastillas desparasitantes para perros/gatos'} 
                                  source={require('../../assets/img/desparazitante.jpg')}  />
                </View>

                </List.Accordion>
            </List.Section>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    main:{
        flex:1
    },
    item:{
        marginBottom: 15,
        fontSize: 16
    }
})


export default Donaciones
