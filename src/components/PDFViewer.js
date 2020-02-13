import React, { Component } from 'react';
import { View } from 'react-native';
import PDFView from 'react-native-view-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import AwesomeIcon from './AwesomeIcon';
import { NavigationAction } from './Header';

export const shareFileByURL = (url, type) => {
  RNFetchBlob.fetch('GET', url, {})
    .then(async res => {
      let status = res.info().status;
      if (status === 200) {
        const base64 = res.base64();
        const base64Data = `data:${type};base64,` + base64;
        const options = {
          type,
          failOnCancel: false,
          url: base64Data,
          title: 'Compartir'
        };
        Share.open(options)
          .then()
          .catch(() => {});
      } else {
        alert(`Status: ${status}`);
      }
    })
    .catch((errorMessage, statusCode) => {
      //alert(errorMessage);
    });
};

export default class PDFViewer extends Component {
  static navigationOptions = ({ navigation }) => ({
    hideRightComponent: 'show',
    renderRightComponent: () => (
      <NavigationAction
        icon={'share'}
        onPress={() =>
          shareFileByURL(
            'https://s3.amazonaws.com/conauto-odoo-ec-uyc8x/2b6dfd881c6307278143847d7f4d0e15f329f969',
            'application/pdf'
          )
        }
      />
    )
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={this.props.navigation.getParam('url')}
          resourceType={'url'}
          onLoad={() => {}}
          onError={() => {}}
        />
      </View>
    );
  }
}
