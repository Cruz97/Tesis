import React, { Component } from 'react';
import { Divider, List, Colors, Drawer } from 'react-native-paper';
import { Layout, withStyles } from 'react-native-ui-kitten';
import CustomIcon from '../../components/CustomIcon';
import {StyleSheet, Text, Platform, ScrollView, Image, ImageBackground} from 'react-native';
import {Icon} from 'react-native-elements'
// import Database from '../../database'
import {myTheme} from '../../src/assets/styles/Theme'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'



const Item = ({ label, color, icon, selected, onPress }) => (
  <Drawer.Item
    style={{marginTop: 10}}
    label={label}
    icon = {()=>(
        <CustomIcon name={icon} size={24} color={selected ? myTheme['color-primary-600'] : null}/>
    )}
    
    theme={{colors: {primary: myTheme['color-primary-600'] }}}
    active={selected}
    onPress={onPress}
  />
);

class DrawerCustom extends Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const user = navigation.getParam('user',null);
    

    // alert(data)
    
    this.state = {
      active: 'Home',
      user
    };
    
    
  }

  componentDidMount(){
    // let uid = firebase.auth().currentUser.uid;
    // let refUser = firebase.database().ref('usuarios/'+uid+'/name')
    // alert(refUser)
    //let user
    // let user=''
  
    // refUser.on('value',(snapshot)=>{
    //    this.setState({
    //      active: 'Home',
    //      user: snapshot.val()
    //    })

    //   // alert(JSON.stringify(user,null,4))
       
       
    // })
    

    //alert(this.state.user)
    //alert(JSON.stringify(this.props.navigation,null,4))
  
  }


  

  closeSession = () => {
    Database.LocalDB.deleteAllObjects('User');
    this.props.navigation.navigate('SocioLogin',{intento: 0})

  }

  singOut = () => {
    firebase.auth().signOut().then(()=>this.props.navigation.navigate('Loading'))
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

    const {state} = this.props.navigation;
    const {routes} = state.routes['0'];
    const {routeName} = routes[routes.length-1]

    const user = this.state.user

    // alert('ver: '+JSON.stringify(this.state.user,null,4))
    

    return (
      <ScrollView style={{ flex: 1, }}>
        {/* // <ImageBackground
        //        source={require('../../assets/img/gradient3.jpg')}
        //       style={{width: '100%', height: '100%', flex: 1, backgroundColor: '#b3d9ff', }}
        //     > */}
        <Layout style={{alignItems: 'center'}} >
       <Image
        source={require('../../assets/img/img_menu.jpeg')}
        style={{resizeMode: 'stretch',
        height: 120,
        width: 250,
        marginTop: 40}
      }
       >

       </Image>
       
              
     </Layout>
     <Drawer.Section>
       
       <Text style={style.info}>
          {user.name+' '+user.lastname }
       </Text>
       {/* <Text style={style.info}>
          {user.email}
       </Text> */}
     </Drawer.Section>
     
     <Drawer.Section style={{marginLeft: 10}}>
         {/* <Item label="Inicio" icon="menu1" selected={routeName === 'Membresy'} onPress={() => { this.setState({ active: 'MyMembresy' });  this.props.navigation.navigate('MyMembresy')}}/> */}
         <Item label="Inicio" icon="home" selected={routeName === 'Masc'} onPress={() => { this.setState({ active: 'HomeAdoptante' }); this.props.navigation.navigate('HomeAdoptante') }}/>
         <Item label="Mascotas" icon="mascota" selected={routeName === 'HomeAdoptante'} onPress={() => { this.setState({ active: 'HomeAdoptante' }); this.props.navigation.navigate('HomeAdoptante') }}/>
         <Item label="Fundaciones" icon="fundacion" selected={routeName === 'Fundaciones'} onPress={() => { this.setState({ active: 'Fundaciones' }); this.props.navigation.navigate('Fundaciones')}}/>
         <Item label="Mis Solicitudes" icon="solicitud" selected={routeName === 'Solicitudes'} onPress={() => { this.setState({ active: 'Solicitudes' }); this.props.navigation.navigate('Solicitudes') }}/>
         <Item label="Donaciones" icon="donacion" selected={routeName === 'Donaciones'} onPress={() => { this.setState({ active: 'Donaciones' }); this.props.navigation.navigate('Donaciones') }}/>
         <Item label="Cerrar Sesión" icon="cerrar" selected={routeName === 'Transactions'} onPress={()=>this.singOut()}/>

      
       </Drawer.Section>
       {/* </ImageBackground> */}
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
  info:{
    // marginLeft: 20,
    marginRight: 23,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 5,
  }

  //Platform.
});

export default withStyles(DrawerCustom, theme => ({
  colors: { text: theme['text-basic-color'] }
  
}));
