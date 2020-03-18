import React from 'react';
import {StyleSheet, Button, TextInput, View, Text, TouchableOpacity,} from 'react-native';
import {Formik} from 'formik';

export default function EditForm() {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{heading: '', description: '', location: ''}}
        onSubmit={values => {
          console.log(values);
        }}>
        {props => (
          <View>
            <TextInput
              style={styles.txtInput}
              placeholder="Title"
              onChangeText={props.handleChange('heading')}
              value={props.values.heading}
            />
            <TextInput
              style={styles.txtInput}
              placeholder="Describe your leftovers"
              onChangeText={props.handleChange('description')}
              value={props.values.description}
            />
            <TextInput
              style={styles.txtInput}
              placeholder="Location"
              onChangeText={props.handleChange('location')}
              value={props.values.location}
            />
            <TouchableOpacity title="submit" onPress={props.handleSubmit}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#2bb76e',
    flex: 1,
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
});
