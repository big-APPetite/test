import React, {useState} from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

let currentUsername = '';

export default function ChangeUsername() {
  const userKey = Firebase.auth().currentUser.uid;
  const userRef = Firebase.database().ref('users/' + userKey);

  userRef.once('value').then(snapshot => {
    const user = snapshot.val();
    currentUsername = user.username;
  });

  function changeUsername(value) {
    userRef.update({
      username: value.username,
    });
  }

  const [Username, setUsername] = useState(currentUsername);
  console.log(Username);
  return (
    <View>
      <Formik
        // initialValues={{
        //   username: currentUsername,
        // }}
        // mapPropsToValue={() => ({
        //   username: Username,
        // })}
        enableReinitialize={true}
        onSubmit={value => {
          changeUsername({
            username: Username,
          });
        }}>
        {props => (
          <View>
            <TextInput
              style={style.txtInput}
              value={Username}
              onChangeText={text => setUsername(text)}
            />
            <Button title="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const style = StyleSheet.create({
  txtInput: {
    margin: 5,
    padding: 30,
    fontSize: 15,
    borderWidth: 2,
    color: 'red',
    borderRadius: 5,
    backgroundColor: (255, 250, 250, 50),
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
});
