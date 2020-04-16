import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker,
} from 'react-native';
import {Formik} from 'formik';
import {styles} from './PostList';
import PostImage from './ImagePicker';
import Firebase from 'firebase';
import ImageSian from './ImageSian';

export default function AddForm() {
  const [selectedValue, setSelectedValue] = useState('');
  const [Username, setUsername] = useState('');
  const userKey = Firebase.auth().currentUser.uid;
  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      const user = snapshot.val();
      const userName = user.username;
      setUsername(userName);
      console.log(user);
      console.log(userName);
    });
  function addPost(values, addComplete) {
    const key = Firebase.database()
      .ref('posts')
      .push().key;
    return Firebase.database()
      .ref('posts/' + key)
      .set({
        id: key,
        heading: values.heading,
        description: values.description,
        location: values.location,
        createdAt: Date(Date.now()),
        createdBy: Username,
        // imageUri: this.state.fileUri,
      })
      .then(() => {
        Firebase.database()
          .ref('user_posts/' + userKey + '/' + key)
          .set({
            id: key,
            heading: values.heading,
            description: values.description,
            location: values.location,
            createdAt: Date(Date.now()),
            createdBy: Username,
          });
      })
      .then(snapshot => {
        values.Id = snapshot.Id;
        snapshot.set(values);
      })
      .then(() => addComplete(values))
      .catch(error => console.log(error));
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          heading: '',
          description: '',
          location: '',
          image: null,
          imageUri: '',
          createdBy: '',
        }}
        onSubmit={values => {
          console.log(values);
          console.log(Username);
          addPost({
            heading: values.heading,
            description: values.description,
            location: selectedValue,
            createdBy: Username,
          });
          // uploadPhoto({
          //   image: values.image,
          // });
        }}>
        {props => (
          <ScrollView>
            <ImageSian />
            {/* <PostImage /> */}
            <TextInput
              style={formikstyles.txtInput}
              placeholder={'Give your post a title'}
              onChangeText={props.handleChange('heading')}
              value={props.values.heading}
            />
            <TextInput
              style={formikstyles.txtInput}
              placeholder={'Tell us about your leftovers...'}
              onChangeText={props.handleChange('description')}
              value={props.values.description}
            />
            <Text style={{fontSize: 25}}>Select Location:</Text>
            <Picker
              style={{fontSize: 25}}
              mode="dialog"
              prompt="Where can we find your food?"
              selectedValue={selectedValue}
              onValueChange={itemValue => setSelectedValue(itemValue)}>
              <Picker.Item label="Harmer" value="Harmer" />
              <Picker.Item label="Eric Mensforth" value="Eric Mensforth" />
              <Picker.Item label="Sheaf" value="Sheaf" />
              <Picker.Item label="Howard/Surrey" value="Howard/Surrey" />
              <Picker.Item label="Adsetts" value="Adsetts" />
              <Picker.Item label="Stoddart" value="Stoddart" />
              <Picker.Item label="Cantor" value="Cantor" />
              <Picker.Item label="Arundel" value="Arundel" />
              <Picker.Item label="Oneleven" value="Oneleven" />
              <Picker.Item label="Charles Street" value="Charles Street" />
              <Picker.Item
                label="Sheffield Institute of Arts"
                value="Sheffield Institute of Arts"
              />
              <Picker.Item label="Collegiate Hall" value="Collegiate Hall" />
              <Picker.Item
                label="Saunders Building"
                value="Saunders Building"
              />
              <Picker.Item label="Library" value="Library" />
              <Picker.Item label="Main Building" value="Main Building" />
              <Picker.Item
                label="Robert Winston Building"
                value="Robert Winston Building"
              />
              <Picker.Item label="Woodville" value="Woodville" />
              <Picker.Item label="Heart of Campus" value="Heart of Campus" />
              <Picker.Item label="The Mews" value="The Mews" />
              <Picker.Item label="Willow Court" value="Willow Court" />
              <Picker.Item label="Chestnut Court" value="Chestnut Court" />
            </Picker>
            <TouchableOpacity
              style={formikstyles.button}
              title={'submit'}
              onPress={props.handleSubmit}>
              <Text style={formikstyles.btnText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}
const formikstyles = StyleSheet.create({
  txtInput: {
    margin: 5,
    padding: 30,
    fontSize: 25,
    borderWidth: 2,
    color: 'red',
    borderRadius: 5,
    backgroundColor: (255, 250, 250, 50),
  },
  button: {
    flex: 1,
    width: 150,
    height: 75,
    backgroundColor: '#418ADC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
    padding: 20,
    alignSelf: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: '#565656',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 80,
    height: 150,
  },
  imageButton: {
    margin: 8,
  },
});
