import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Header, { TopNavLogo } from '../components/Header';


// DRAWER
import Drawer from '../components/Drawer';
import DrawerFundacion from '../components/DrawerFundacion';


import { Icon } from 'react-native-elements';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { withStyles } from 'react-native-ui-kitten';
import AwesomeIcon from '../components/AwesomeIcon';


import Loading from './Loading';

import Login from '../../containers/Login';
import Welcome from '../../containers/Welcome';
import NewAccount from '../../containers/NewAccount';
import LoginAdoptante from '../../containers/LoginAdoptante';
import LoginFundacion from '../../containers/LoginFundacion';
import ForgetPass from '../../containers/ForgetPass';
import ResetSuccessfull from '../../containers/ResetSuccessfull';
import RegisterSuccessfull from '../../containers/RegisterSuccessfull';


import HomeAdoptante from '../../containers/Adoptante/HomeAdoptante';
import Mascotas from '../../containers/Adoptante/Mascotas';
import Fundaciones from '../../containers/Adoptante/Fundaciones';
import Solicitudes from '../../containers/Adoptante/Solicitudes';
import Donaciones from '../../containers/Adoptante/Donaciones';
import PetDetails from '../../containers/Adoptante/PetDetails';
import Form from '../../containers/Adoptante/Form';
import PersonalInformation from '../../containers/Adoptante/PersonalInformation';
import AddressInformation from '../../containers/Adoptante/AddressInformation';



import HomeFundacion from '../../containers/Fundacion/HomeFundacion';
import MascotasF from '../../containers/Fundacion/MascotasF';
import SolicitudesF from '../../containers/Fundacion/SolicitudesF';
import Publication from '../../containers/Fundacion/Publication';
import About from '../../containers/Fundacion/About';
import HeaderFundacion from '../components/HeaderFundacion';




const drawerDefaultNavigationOptions = props => {
  
  return {
    header: <Header {...props} />,
   
    
  };
};

const drawerDefaultNavigationOptionsFundacion = props => {
  
  return {
    header: <HeaderFundacion {...props} />,
   
    
  };
};

const Auth = createStackNavigator({
  Welcome,
  LoginAdoptante,
  LoginFundacion,
  Login,
  NewAccount,
  ForgetPass,
  ResetSuccessfull,
  RegisterSuccessfull
});

const stackAppAdoptante = createStackNavigator(
  {
    HomeAdoptante,
     Mascotas,
     
     Fundaciones,
     Solicitudes,
     Donaciones,
     PetDetails,
     Form,
     PersonalInformation,
     AddressInformation
    },
    
    {
      defaultNavigationOptions: props => drawerDefaultNavigationOptions(props),
      //initialRouteName: 'HomeAdoptante'
    
    },
   
  
)


const stackAppFundacion = createStackNavigator(
  {
      //Login,
    
    MascotasF,
    SolicitudesF,
    HomeFundacion,
    Publication,
    About
      // Hotels2,
      //ConsumptionsCenter,

 
      
      //Home  
    },
    
    {
      defaultNavigationOptions: props => drawerDefaultNavigationOptionsFundacion(props),
    
    },

   
  
)

const AppAdoptante = createDrawerNavigator(
  {
    AppAdoptante: stackAppAdoptante
  },
  {
    contentComponent: Drawer,
    drawerPosition: 'left',
    
  },
);

const AppFundacion = createDrawerNavigator(
  {
    AppFundacion: stackAppFundacion
  },
  {
    contentComponent: DrawerFundacion,
    drawerPosition: 'left',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth,
      Loading,
      AppAdoptante,
      AppFundacion
    },
    {
      initialRouteName: 'Loading'
    },
  )
);

// export default createAppContainer(
//   App
// );
