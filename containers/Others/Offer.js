import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Card} from 'react-native-paper';
import Database from '../database';
import {Image} from 'react-native-elements';

const schemaName = 'Offers';

export class Offer extends Component {
  static navigationOptions = {
    title: 'Ofertas',
    hideRightComponent: 'hide',
  };

  constructor(props) {
    super(props);
    this.state = {
      offers: Array.from(Database.CloudDB.searchAll(schemaName)),
    };
  }

  render() {
    return (
      <View style={style.main}>
        {/* <Text style={[style.title,style.colortxt]}> No hay Ofertas </Text>
                <Text style={[style.subtitle,style.colortxt]}> No se encontraron oferas especiales para su membresia</Text> */}
        {/* {this._renderOffer()} */}
        {/* {this._renderOffer()} */}
        <FlatList
          data={this.state.offers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <View>{this._renderItem(item)}</View>}
        />
        {/* {
                    this.state.offers.map((item,index)=>{
                        return(
                            <View  key={index}>{this._renderItem(item)}</View>
                        )})
               } */}
      </View>
    );
  }

  _renderOffer = () => {
    return (
      <TouchableOpacity style={style.boxoffer}>
        <View style={style.boxpicture}>
          {/* <View > */}
          <Image
            style={style.picture}
            source={require('../assets/img/buffet.jpg')}
          />
          {/* </View> */}
        </View>
        <View style={style.details}>
          <Text style={style.title}>Paquete Romántico</Text>
          {/* <Image source={require('../assets/img/boda.jpg')} resizeMode='cover'  /> */}
        </View>
      </TouchableOpacity>
    );
  };

  _renderItem = item => {
    return (
      <Card style={style.card}>
        <View style={style.containerimg}>
          <Image
            source={{uri: item.image}}
            style={{width: '100%', height: 220, borderRadius: 20}}
            placeholderStyle={{
              backgroundColor: 'white',
            }}
            PlaceholderContent={
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Image
                  style={{width: 150, height: 100}}
                  resizeMode="contain"
                  source={require('../assets/img/logo-ov.png')}
                />
                <ActivityIndicator
                  size="large"
                  color={'#A88C3D'}
                  style={{marginLeft: 20}}
                />
              </View>
            }
          />

          <View style={style.boxstatus}>
            <Text style={style.textstatus}>{item.name}</Text>
          </View>

          <View style={style.boxprecio}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push('OfferDetails', {
                  id: item.uuid,
                  title: item.name,
                })
              }>
              <Text style={style.textshow}>Ver detalles</Text>
            </TouchableOpacity>
          </View>

          <View style={style.boxshow}>
            <Text style={style.textprecio}>Desde: ${parseFloat(item.price_ini).toFixed(0)}</Text>
          </View>

          <View style={style.boxinfo}>
            <Text style={style.textinfo}>{item.description}</Text>
          </View>
        </View>
      </Card>
    );
  };
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    //height: 500
    //flexDirection: "column",
    //justifyContent: "center",
    //alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
    marginTop: 15,
  },
  colortxt: {
    color: '#8c8c8c',
  },
  boxoffer: {
    flex: 1,
    flexDirection: 'row',
    //width: '100%',
    height: 250,
    margin: 5,
    marginTop: 15,
    borderRadius: 15,

    //backgroundColor: 'red',
    borderColor: '#8c8c8c',
    //borderWidth: 1,
    //borderBottomWidth: 1,
    borderWidth: 1,
  },

  boxpicture: {
    //flex:2,
    width: '40%',
    borderRightWidth: 1,
    //height: 300,
    //backgroundColor: 'blue'
  },
  picture: {
    //flex:2,
    //  marginLeft: 10,
    //  marginRight: 10,
    //  marginTop: 20,
    //  marginBottom: 20,
    // width: '100%',
    // height: 250
    flex: 1,
    width: undefined,
    height: 300,
    //borderRadius: 15
    // transform: [{ scale: 0.70 }]
  },
  details: {
    flex: 1,
    //backgroundColor: 'red'
  },
  // title:{
  //     fontSize: 17,
  //     fontFamily: 'Roboto-Regular',
  //     fontWeight: 'bold',
  //     //textTransform: 'uppercase',
  //     textAlign: 'left',
  //     marginTop: 10,
  //     marginLeft: 5

  // },
  card: {
    //height: 220,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    marginBottom: 10,

    borderRadius: 15,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#fff',
    borderTopStartRadius: 20,

        shadowColor: "#8c8c8c",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        height: 1,
        width: 1,
    }
  },
  containerimg: {
    //flex: 1,
    //borderRadius: 15

    borderRadius: 15,
    overflow: 'hidden',
    //backgroundColor: 'green'
    // borderBottomLeftRadius: 10
    //height: "50%",
  },
  img: {
    flex: 1,
    // overflow: 'hidden',
    //width: 100,height: '100%', borderRadius: 15
    // marginTop: 10,
    //borderRadius: 15
  },
  boxstatus: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },

  boxprecio: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    //backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    //padding: 10,
    justifyContent: 'flex-end',
  },
  boxshow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
    //top: 50,
    //right: 10,
    //backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    //padding: 10,
    justifyContent: 'flex-end',
  },
  textprecio: {
    color: '#FFF',
    width: 100,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 10,
    backgroundColor: '#235963',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    ///borderRadius: 4,
    borderColor: '#FFF',
    borderWidth: 1,
  },
  textshow: {
    color: '#FFF',
    width: 100,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 10,
    backgroundColor: '#A88C3D',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    borderColor: '#FFF',
    borderWidth: 1,
    //borderRadius: 20,
  },
  textstatus: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 10,
    borderRadius: 20,
    //textTransform: 'uppercase'
  },
  textinfo: {
    //color: '#FFF',
    color: '#000',
    //width: 100,

    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 10,
    //backgroundColor: '#235963',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 4,
  },
  boxinfo: {
    flexDirection: 'row',

    position: 'absolute',
    top: 150,
    // bottom: 40,
    left: 10,
    //paddingBottom: 50,
    //right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    //backgroundColor: 'white',
    width: '60%',
    //height: 100,
    //padding: 10,
    justifyContent: 'flex-start',
  },

  boxbuttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  buttons: {
    color: '#A88C3D',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 5,
    letterSpacing: 0,
  },
});

export default Offer;
