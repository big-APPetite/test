import React from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import FavouriteButton from '../buttons/FavouriteButton';

export default ({route}) => {
  const postInfo = route.params;
  const postKey = postInfo.id;
  console.log(postInfo);
  const ref = Firebase.database().ref('posts/' + postKey);

  function deletePost(values) {
    ref.remove().then(snapshot => {
      values.Id = snapshot.Id;
      snapshot.set(values);
    });
  }

  function favourite() {
    const userKey = Firebase.auth().currentUser.uid;
    const favRef = Firebase.database().ref(
      'favourites/' + userKey + '/' + postKey,
    );
    favRef.set({
      id: postKey,
      heading: postInfo.heading,
      description: postInfo.description,
      location: postInfo.location,
      createdAt: postInfo.createdAt,
      createdBy: postInfo.createdBy,
    });
  }

  return (
    <View>
      {/*<Text>{JSON.stringify(postInfo, null, 2)}</Text>*/}
      <Text style={styles.text}>Title: {postInfo.heading}</Text>
      <Text style={styles.text}>Location: {postInfo.location}</Text>
      <Text style={{fontSize: 25, textAlign: 'center'}}>
        {postInfo.description}
      </Text>
      <View style={{flexDirection: 'row-reverse', padding: 10}}>
        <Button title="Favourite" onPress={favourite} />
      </View>
      <Button
        title="Delete"
        onPress={() => {
          Alert.alert(
            'Delete',
            'Are you sure you want to delete this post? This action cannot be undone.',
            [
              {text: 'Yes', onPress: () => deletePost()},
              {
                text: 'Cancel',
                onPress: () => console.log('delete post cancelled'),
              },
            ],
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});
