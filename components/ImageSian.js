import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {globalStyles} from './styles/global';


export default class ImageSian extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  render() {
    return (
        <View style={globalStyles.container}>
            <Button onPress={this.chooseFile.bind(this)} title="Add Picture"/>
                <Image
                    source={{ uri: this.state.filePath.uri }}
                    style={styles.image}
                />
                <Text style={{ alignItems: 'center' }}>
                    {this.state.filePath.uri}
                </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        margin: 10
    }
})