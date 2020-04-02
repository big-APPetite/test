import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import {styles} from './PostList';
import {addPost, uploadPost} from './api/PostsApi';
import PostImage from './ImagePicker';

export default function AddForm(props) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          heading: '',
          description: '',
          location: '',
          imageUri: null,
        }}
        onSubmit={values => {
          console.log(values);
          addPost({
            key: Math.random(),
            heading: values.heading,
            description: values.description,
            location: values.location,
          });
          uploadPost({
            imageUri: '',
          });
        }}>
        {props => (
          <ScrollView>
            <PostImage />
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
            <TextInput
              style={formikstyles.txtInput}
              placeholder={'Where can we get our grub?'}
              onChangeText={props.handleChange('location')}
              value={props.values.location}
            />
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
