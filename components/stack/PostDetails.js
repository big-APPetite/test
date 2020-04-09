import React from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import Firebase from 'firebase';
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
    //edit uuid
    const uuid = Firebase.auth().currentUser.providerData;

    const favRef = Firebase.database().ref(
      '/favourites/' + uuid + '/' + postKey,
    );
    return favRef.set({
      id: postKey,
      heading: postInfo.heading,
      description: postInfo.description,
      location: postInfo.location,
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
      <View style={{flexDirection: 'row-reverse'}}>
        <FavouriteButton onPress={favourite} />
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
