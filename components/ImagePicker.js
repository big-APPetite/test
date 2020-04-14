import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Firebase from 'firebase';
import 'firebase/storage';
import {addPost} from './api/PostsApi';

const PostImage = ({image, onImagePicked}) => {
  const [fileData, setFileData] = useState(' ');
  const [fileUri, setFileUri] = useState(' ');
  const [fileName, setFileName] = useState(' ');

  function chooseImage() {
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

        console.log('response', JSON.stringify(response));
        setFileData(response.data);
        setFileUri(response.uri);
        setFileName(response.fileName);
      }
    });
  }

  function launchCamera() {
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
        setFileData(response.data);
        setFileUri(response.uri);
        setFileName(response.fileName);
      }
    });
  }

  function launchImageLibrary() {
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
        setFileData(response.data);
        setFileUri(response.uri);
        setFileName(response.fileName);
      }
    });
  }
  function renderFileData() {
    if ({fileData}) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image source={require('./images/dummy.jpeg')} style={styles.images} />
      );
    }
  }

  function renderFileUri() {
    if ({fileUri}) {
      return <Image source={{uri: fileUri}} style={styles.images} />;
    } else {
      return (
        <Image source={require('./images/gallery.png')} style={styles.images} />
      );
    }
  }

  function uploadPhoto(values, onPostUploaded) {
    if ({fileUri}) {
      console.log(fileUri);
      const storageRef = Firebase.storage().ref('posts/images/' + {fileName});
      console.log(fileName);
      storageRef.put({fileUri}).on(
        Firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log('snapshot: ' + snapshot.state);
          console.log(
            'progress: ' +
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          if (snapshot.state === Firebase.storage.TaskState.SUCCESS) {
            console.log('Success');
          }
        },
        error => {
          console.log('image upload error: ' + error.toString());
        },
        () => {
          storageRef.getDownloadURL().then(downloadUrl => {
            console.log('File available at: ' + downloadUrl);
            // delete post.imageUri;
            // values.image = downloadUrl;
            // addPost(values, onPostUploaded);
          });
        },
      );
    } else {
      console.log('Skipping image upload');
      // delete values.imageUri;
      // addPost(values, onPostUploaded);
    }
  }

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
            Pick Images from Camera & Gallery
          </Text>
          <View style={styles.ImageSections}>
            <View>
              {renderFileData()}
              <Text style={{textAlign: 'center'}}>Base 64 String</Text>
            </View>
            <View>
              {renderFileUri()}
              <Text style={{textAlign: 'center'}}>File Uri</Text>
            </View>
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={launchCamera} style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={uploadPhoto} style={styles.btnSection}>
              <Text style={styles.btnText}>Confirm Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PostImage;

const styles = StyleSheet.create({
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
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
