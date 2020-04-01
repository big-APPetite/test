import React, {Component} from 'react';
import {TouchableOpacity, Text, Alert} from 'react-native';
import {formikstyles} from '../AddForm';
import {removePostData} from '../api/PostsApi';

export default class DeleteButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={formikstyles.button}
        onPress={() =>
          Alert.alert(
            'Delete?',
            'Cannot be undone',
            [
              {text: 'Cancel'},
              {
                text: 'OK',
                onPress: () => {
                  removePostData(post);
                },
              },
            ],
            {cancelable: false},
          )
        }>
        <Text style={formikstyles.btnText}>Delete</Text>
      </TouchableOpacity>
    );
  }
}
