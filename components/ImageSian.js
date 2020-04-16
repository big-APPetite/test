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
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.container}>
                <Image
                    source={{ uri: this.state.filePath.uri }}
                    style={styles.image}
                />
             <TouchableOpacity style={globalStyles.buttonAddPicture} onPress={this.chooseFile.bind(this)}>
                <Text style={globalStyles.buttonText}>Add Picture</Text>
            </TouchableOpacity>
        </View>
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