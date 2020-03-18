import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Button,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  default as Alert,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-picker';
import {base} from './configFirebase';
import firebase from 'firebase';
import {addPost} from './api/PostsApi';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      heading: '',
      description: '',
      location: '',
      arrayHolder: [],
      textInputHolder: '',
      posts: {},
    };
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  onPostAdded = post => {
    console.log('Post created');
    console.log(post);
  };

  // addPost(postId, heading, description, location, imageUrl) {
  //   const posts = {...this.state.posts};
  //   postId = posts.indexOf(heading);
  //   firebase
  //     .database()
  //     .ref('posts/ + postId')
  //     .set({
  //       heading: heading,
  //       description: description,
  //       location: location,
  //       post_photo: imageUrl,
  //     })
  //     .then(() => {
  //       console.log('ADDED !');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   this.setState({posts});
  // }

  componentWillMount() {
    this.postsRef = base.syncState('posts', {
      context: this,
      state: 'posts',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.postsRef);
  }

  handleChangeText(newText) {
    this.setState({
      heading: newText,
    });
  }

  joinData = () => {
    this.posts.push({heading: this.state.textInputHolder});
    this.setState({arrayHolder: [...this.array]});
  };
  GetItem(item) {
    Alert.alert(item);
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
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
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };
  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image source={require('./images/dummy.jpeg')} style={styles.images} />
      );
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <Image source={require('./images/gallery.png')} style={styles.images} />
      );
    }
  }
  render() {
    return (
      <View style={styles.background}>
        <TextInput
          style={styles.txtInput}
          ref={'heading'}
          placeholder="Enter heading here"
          onChangeText={text =>
            this.setState(prevState => ({
              currentHeading: (prevState.currentHeading = text),
            }))
          }
          value={this.state.currentHeading}
        />
        <TextInput
          style={styles.txtInput}
          ref={'description'}
          onChangeText={text =>
            this.setState(prevState => ({
              currentDescription: (prevState.currentDescription = text),
            }))
          }
          value={this.state.currentDescription}
        />
        <TextInput
          style={styles.txtInput}
          ref={'location'}
          onChangeText={text =>
            this.setState(prevState => ({
              currentLocation: (prevState.currentLocation = text),
            }))
          }
          value={this.state.currentLocation}
        />
        <View style={styles.btnParentSection}>
          <TouchableOpacity
            onPress={() =>
              addPost(
                {
                  heading: this.state.currentHeading,
                  description: this.state.currentDescription,
                  location: this.state.currentLocation,
                },
                this.onPostAdded,
              )
            }
            activeOpacity={0.7}
            style={styles.btnSection}>
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.body}>
              <Text
                style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
                Upload a Photo of your Offerings
              </Text>
              <View style={styles.ImageSections}>
                <View>{this.renderFileData()}</View>
                {/*<View>*/}
                {/*  {this.renderFileUri()}*/}
                {/*  <Text style={{textAlign: 'center'}}>File Uri</Text>*/}
                {/*</View>*/}
              </View>

              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.chooseImage}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Choose Photo</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity*/}
                {/*  onPress={this.launchCamera}*/}
                {/*  style={styles.btnSection}>*/}
                {/*  <Text style={styles.btnText}>Directly Launch Camera</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity*/}
                {/*  onPress={this.launchImageLibrary}*/}
                {/*  style={styles.btnSection}>*/}
                {/*  <Text style={styles.btnText}>*/}
                {/*    Directly Launch Image Library*/}
                {/*  </Text>*/}
                {/*</TouchableOpacity>*/}
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#2bb76e',
  },
  txtInput: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: (255, 250, 250, 50),
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 400,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#418ADC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: '#565656',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    paddingTop: 5,
  },
  button: {
    backgroundColor: 'darkblue',
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
  },
});
