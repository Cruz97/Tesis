import React, { Component } from 'react';
import { Divider, List, Colors, Drawer } from 'react-native-paper';
import { Layout, withStyles } from 'react-native-ui-kitten';
import CustomIcon from '../../components/CustomIcon';
import {StyleSheet, Text, Platform, ScrollView, Image} from 'react-native';
import {Icon} from 'react-native-elements'
import Database from '../../database'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'





const Item = ({ label, color, icon, selected, onPress }) => (
  <Drawer.Item
    label={label}
    icon = {()=>(
        <CustomIcon name={icon} size={24} color={selected ? '#A88C3D': null}/>
    )}
    theme={{colors: {primary: '#A88C3D'}}}
    active={selected}
    onPress={onPress}
  />
);

// const ItemClose = ({ label, color, icon, selected, onPress }) => (
//   <Drawer.Item
//     label={label}
//     // icon = {()=>(
//     //   <Icon
//     //   name='exit-to-app'
//     //   type='material'
//     //   size={30}
//     //   iconStyle={
//     //     {
//     //       //width:2,
//     //       color: '#4c4c4c',
//     //       fontSize: 27
          
//     //     }
//     //   }
//     //   color={selected ? '#A88C3D': null}
//     //   />

//     // )}
//     theme={{colors: {primary: '#A88C3D'}}}
//     active={selected}
//     onPress={onPress}
//   />
// );



class DraweFundacion extends Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const foundation = navigation.getParam('foundation',null);
    this.state = {
      active: 'Home',
      foundation
    };
    
  }

  componentDidMount(){
  
  }

  signOut = () => {
    firebase.auth().signOut().then(()=>this.props.navigation.navigate('Loading'))
  }

 

  closeSession = () => {
    Database.LocalDB.deleteAllObjects('User');
    this.props.navigation.navigate('SocioLogin',{intento: 0})

  }

  goToPage(routeName) {
    this.props.navigation.navigate({ routeName });
    this.props.navigation.closeDrawer();
  }

  render() {
    const {active} = this.state;
    //alert(active)
    //const name = this.props.navigation.state.params;
    const { colors } = this.props.themedStyle;
    const {navigation} = this.props;
    //const uuid = navigation.getParam('uuid','drawer');
    //const uuid = "ec366d60-0a9b-11ea-82b1-e37e650f4e3b";
    //alert(JSON.stringify(navigation.state.params))

    //alert(JSON.stringify(navigation.state,null,2))
    //alert(navigation.state.params.userid)
    //const uuid = navigation.state.params.userid;

    const {state} = this.props.navigation;
    const {routes} = state.routes['0'];
    const {routeName} = routes[routes.length-1]

    
    //const foundation = 

    return (
      <ScrollView style={{ flex: 1 }}>
         <Layout style={{alignItems: 'center'}} >
       <Image
        source={{uri: this.state.foundation.img}}
        style={{
          resizeMode: 'stretch',
          height: 180,
          width: 200,
          marginTop: 40
      }
      }
       >

       </Image>

     </Layout>

     <Drawer.Section>
     <Text style={style.name}>
          Fundación: {this.state.foundation.name}
        </Text>
     </Drawer.Section>
       
       <Drawer.Section title="Menu">
         {/* <Item label="Inicio" icon="menu1" selected={routeName === 'Membresy'} onPress={() => { this.setState({ active: 'MyMembresy' });  this.props.navigation.navigate('MyMembresy')}}/> */}
         <Item label="Inicio" icon="home" selected={routeName === 'MascotasF2'} onPress={() => { this.setState({ active: 'MascotasF' }); this.props.navigation.navigate('MascotasF') }}/>
         <Item label="Publicaciones" icon="mascota" selected={routeName === 'MascotasF'} onPress={() => { this.setState({ active: 'MascotasF' }); this.props.navigation.navigate('MascotasF') }}/>
         <Item label="Solicitudes" icon="mascota" selected={routeName === 'SolicitudesF'} onPress={() => { this.setState({ active: 'SolicitudesF' }); this.props.navigation.navigate('SolicitudesF') }}/>
         <Item label="Nosotros" icon="fundacion" selected={routeName === 'Transactions'} onPress={() => { this.setState({ active: 'Transactions' }); this.props.navigation.navigate('Transactions')}}/>
         <Item label="Reportes" icon="solicitud" selected={routeName === 'Transactions'} onPress={() => { this.setState({ active: 'Transactions' }); this.props.navigation.navigate('Transactions')}}/>
         <Item label="Acerca de" icon="mascota" selected={routeName === 'About'} onPress={() => { this.setState({ active: 'About' }); this.props.navigation.navigate('About')}}/>
         <Item label="Cerrar Sesión"  icon = "cerrar"  onPress={() => { this.setState({ active: 'Tools' }); this.signOut()}}/>
    </Drawer.Section>

     
      
    
      </ScrollView>
    );
  }
}



const style = StyleSheet.create({
  icon: {
    marginTop: Platform.OS === 'ios' ? 0 : 5,
  },
  texto:{
    paddingLeft: 5
  },
  name:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginTop: 20
  }

  //Platform.
});

export default withStyles(DraweFundacion, theme => ({
  colors: { text: theme['text-basic-color'] }
  
}));
