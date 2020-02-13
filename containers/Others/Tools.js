import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import {List, Switch, Button, TouchableRipple} from 'react-native-paper' 
import { colors } from 'react-native-elements'
import moment, { defaultFormat } from 'moment'
import ItemTools from '../components/ItemTools';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import {Dialog} from 'react-native-simple-dialogs'




const schemaLocal = 'AppSettings'
//const uuid = "ec366d60-0a9b-11ea-82b1-e37e650f4e3b" 

//const datalocal = Array.from(Database.LocalDB.searchAll(schemaLocal));
//const datalocal = Database.LocalDB.get(schemaLocal, uuid);

export class Tools extends Component {
    static navigationOptions={
        title: 'Ajustes',
        hideRightComponent: 'hide'
    }

    constructor(props){
        super(props)
        //const {navigation} = props;
        //const uuid = navigation.getParam('uuid','tools');
        const uuid = Database.LocalDB.searchAll('User')[0].uuid
        const datal = Database.LocalDB.get('AppSettings',uuid);
        
        this.state={
            uuid: uuid,
            show: false,
            showterms: false,
            showpriv: false,
            datalocal: datal,
            modal : "",
            //settings : ,
            // isSwitchOn1: false,
            // isSwitchOn2: false,
            // isSwitchOn3: false,
            isSwitchOn1: datal.connectionwifi,
            isSwitchOn2: datal.alerts,
            isSwitchOn3: datal.show_oferts,
        }
        
    }

    
    

_renderToggle = (isSwitchOn,number) => {

    return(
        <Switch
            value={isSwitchOn}
            trackColor={{false: 'gray', true: '#dabd6c'}}
            thumbColor='#dabd6c'
            onValueChange={() =>
            { 
                switch (number) {
                    case 1:
                        this.setState({isSwitchOn1: !isSwitchOn})
                        //Database.LocalDB.create(schemaLocal,)
                        //{alert(this.state.isSwitchOn1 ? 'active' : 'disable')}
                        Database.LocalDB.update(schemaLocal,{uuid: this.state.uuid, connectionwifi: !this.state.isSwitchOn1},()=>{})
                        break;
                    case 2:
                            this.setState({isSwitchOn2: !isSwitchOn})
                            Database.LocalDB.update(schemaLocal,{uuid: this.state.uuid, alerts: !this.state.isSwitchOn2},()=>{})
                            break;
                    case 3:
                            this.setState({isSwitchOn3: !isSwitchOn})
                            Database.LocalDB.update(schemaLocal,{uuid: this.state.uuid, show_oferts: !this.state.isSwitchOn3},()=>{})
                            break;
                
                    default:
                        break;
                }
                
            }

            
            
             }
        />
    )
}

    openModal = (show) => {
        this.setState({show: show})
    }

    openModalTerms = (show) => {
        this.setState({showterms: show})
    }

    openModalPriv = (show) => {
        this.setState({showpriv: show})
    }

    _renderText = (text) => {
        return(
            <Text style={{color: theme.colors.text, fontSize: 16, fontWeight: '500', marginTop: 10, marginRight: 20}}>
                {text}
            </Text>
        )
    }

    _renderModalVersion = () => {
        const {modal} = this.state;
        if(modal === "Version"){
        return(
            <Dialog 
                    //title={modal}
                    animationType="fade"
                    onTouchOutside={ () => this.openModal(false) }
                    visible={ this.state.show } 
                    titleStyle={{fontSize: 23,fontWeight: 'bold',textAlign: 'center'}}

                    dialogStyle={
                        {borderRadius: 10,backgroundColor: 'white'}
                    }

                    contentStyle={{paddingTop: 10,paddingBottom: 10,paddingHorizontal: 5}}
                    >
                    <View style={{width: '100%', height: 150,justifyContent:'center',alignItems: 'center'}}>
                        <View style={{}}>
                            <Image   source={require('../assets/img/logo-oror-verd.png')} style={{ 
                                ...StyleSheet.absoluteFillObject,
                                tintColor: '#000',
                                opacity: 0.9,
                                width: 100,
                                height: 100,
                            
                            }} 
                            resizeMode='contain'/>
                            <Image style={{width: 100, height: 100}} resizeMode='contain' source={require('../assets/img/logo-oror-verd.png')}  />
                            
                        </View>
                    </View>

                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Versión </Text>
                            <Text>1.0.0</Text>
                    </View>

                </Dialog> 
        )
        }
        if(modal=== "Terms"){
            return(
            <Dialog 
                    title="Términos de Uso"
                    animationType="fade"
                    onTouchOutside={ () => this.openModalTerms(false) }
                    visible={ this.state.showterms } 
                    titleStyle={{fontSize: 23,fontWeight: 'bold',textAlign: 'center'}}

                    dialogStyle={
                        {borderRadius: 10,backgroundColor: 'white'}
                    }

                    //contentStyle={{paddingTop: 10,paddingBottom: 10,paddingHorizontal: 5}}
                    >
                        <ScrollView style={{width: '100%', height: 250}}>
                            <Text style={{textAlign: 'justify'}}>
                            Oro Verde a través de su aplicación concede una licencia para que los usuarios utilicen  los productos que son vendidos en este medio de acuerdo a los Términos y Condiciones que se describen en este documento.
                            </Text>
                            <Text>
                            Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, modificado o sin modificar. Todos los productos son propiedad  de los proveedores del contenido. En caso de que no se especifique lo contrario, nuestros productos se proporcionan  sin ningún tipo de garantía, expresa o implícita. En ningún esta compañía será  responsables de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros productos.
                            </Text>
                        </ScrollView>
                    <View style={{justifyContent: 'flex-end',alignItems: 'center'}}>
                    <Button onPress={()=> this.openModalTerms(false)}>
                                    <Text style={style.textobtn}>Aceptar</Text>
                                </Button>
                    </View>

                </Dialog>
            ) 

        }

        if(modal=== "Priv"){
            return(
            <Dialog 
                    title="Privacidad"
                    animationType="fade"
                    onTouchOutside={ () => this.openModalPriv(false) }
                    visible={ this.state.showpriv} 
                    titleStyle={{fontSize: 23,fontWeight: 'bold',textAlign: 'center'}}

                    dialogStyle={
                        {borderRadius: 10,backgroundColor: 'white'}
                    }

                    //contentStyle={{paddingTop: 10,paddingBottom: 10,paddingHorizontal: 5}}
                    >
                        <ScrollView style={{width: '100%', height: 250}}>
                            <Text style={{textAlign: 'justify'}}>
                            Esta aplicación de Oro Verde garantiza que la información personal que usted envía cuenta con la seguridad necesaria. Los datos ingresados por usuario o en el caso de requerir una validación de los pedidos no serán entregados a terceros, salvo que deba ser revelada en cumplimiento a una orden judicial o requerimientos legales.
                            La suscripción a boletines de correos electrónicos publicitarios es voluntaria y podría ser seleccionada al momento de crear su cuenta.
                            Oro Verde reserva los derechos de cambiar o de modificar estos términos sin previo aviso.</Text>
                            
                        </ScrollView>
                    <View style={{justifyContent: 'flex-end',alignItems: 'center'}}>
                    <Button onPress={()=> this.openModalPriv(false)}>
                                    <Text style={style.textobtn}>Aceptar</Text>
                                </Button>
                    </View>

                </Dialog>
            ) 

        }
            

              
    }



    render() {
        const { isSwitchOn } = this.state;
        //const datalocal = Database.LocalDB.get(schemaLocal, uuid);
        
        return (
            
            <View style={style.main}>
                {/* /{alert(JSON.stringify(Database.LocalDB.searchAll(schemaLocal)))} */}
                {/* {alert(JSON.stringify(datalocal))} */}

                {/* {
                this.setState({
                    isSwitchOn1: datalocal.connectionwifi
                })
                } */}
                {/* {alert(JSON.stringify(Database.LocalDB.searchAll(schemaLocal)))} */}
                
                {/* {alert(this.state.settings.connectionwifi)} */}
                
                <List.Section>
                <_renderItem title="Solo por Conexión Wi Fi " theme={theme} style={style} rigth={this._renderToggle(this.state.isSwitchOn1,1)}/>
                </List.Section>

                <List.Section>
                    <_renderItem title="Lenguaje" theme={theme} style={style} rigth={this._renderText(this.state.datalocal.languaje)} />
                    <_renderItem title="Unidad de distancia" theme={theme} style={style} rigth={this._renderText(this.state.datalocal.distance)}/>
                </List.Section>
                <List.Section>
                    <_renderItem title="Permitir Alertas de Notificación" theme={theme} style={style} rigth={this._renderToggle(this.state.isSwitchOn2,2)} />
                    <_renderItem title="Mostrar Ofertas Especiales" theme={theme} style={style} rigth={this._renderToggle(this.state.isSwitchOn3,3)}/>
                </List.Section>

                <List.Section>
                    <_renderItem title="Versión" theme={theme} onPress={()=> this.setState({show: true, modal: "Version"})} style={style} rigth={this._renderText(this.state.datalocal.version)} />
                    <_renderItem title="Términos de uso" theme={theme} onPress={()=> this.setState({showterms: true, modal: "Terms"})}  style={style} />
                    <_renderItem title="Política de privacidad" theme={theme} onPress={()=> this.setState({showpriv: true, modal: "Priv"})}  style={style} />
                    <_renderItem title="Última actualización de la App" 
                    theme={theme} 
                    style={style} 
                    description={"Última actualización "+moment(this.state.datalocal.last_update).add(1,'day').format('D MMM YYYY')    }/>
                
                </List.Section>

                <List.Section >
                    {/* <TouchableRipple onPress={()=>{}} rippleColor='#c7b481'> */}
                        <_renderItem title="Cerrar Sesión"  onPress={()=>this.props.navigation.navigate('Login')} theme={theme} style={style} />
                    {/* </TouchableRipple> */}
                    
                </List.Section>
                {this._renderModalVersion()}
                
               
            </View>
        )
    }
}

const _renderItem = props => {
    const {title, theme, style, rigth, description, onPress} = props;
        return(
            <List.Item
                    rippleColor='#dabd6c'
                    onPress={onPress}
                    title={title}
                    titleStyle={{fontWeight: '600'}}
                    theme={theme}
                    description={description}
                    style={style.item}
                    right={()=> rigth}
                    >
                </List.Item>
        )  
}



const theme = {
    colors:{
        text: '#595959'
    }
}
const style = StyleSheet.create({
    main:{
        backgroundColor: '#f2f2f2',
        marginTop: 20
    },
    item:{
        backgroundColor: 'white',
        
    },
    textright:{
        color: '#404040',
        fontSize: 16,
        marginTop: 10   
    },
    textobtn:{
        fontFamily: 'Roboto-Bold',
        //fontStyle: 'Bold',
        color: '#dabd6c',
        textTransform: "uppercase",
        fontSize: 17,
        letterSpacing: 0
        //fontWeight: 'bold'
    },
})

export default Tools
