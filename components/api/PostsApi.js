import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import React from 'react';
import uuid4 from 'uuid/v4';

//need to add createdBy field to store post creator's id
export function addPost(values, addComplete) {
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
      // imageUri: this.state.fileUri,
      // createdAt: Firebase.database.FieldValue.serverTimestamp(),
    })
    .then(snapshot => {
      values.Id = snapshot.Id;
      snapshot.set(values);
    })
    .then(() => addComplete(values))
    .catch(error => console.log(error));
}

export function uploadPost(post, onPostUploaded, {updating}) {
  if (post.imageUri) {
    const fileExtension = post.imageUri.split('.').pop();
    console.log(fileExtension);

    const uuid = uuid4();
    const fileName = '${uuid}.${fileExtension}';
    console.log(fileName);

    const storageRef = Firebase.storage().ref('posts.images/${fileName}');
    storageRef
      .putFile(post.imageUri)
      .on(Firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        console.log('snapshot: ' + snapshot.state);
        console.log(
          'progress: ' +
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
      });
  }
}

export function getPostData() {
  const ref = Firebase.database().ref('/posts');
  ref.on('value', snapshot => {
    console.log('DATA RETRIEVED');
    const postsObject = snapshot.val();
    if (!postsObject) {
      return console.warn('No data from firebase');
    }
    const postsArray = Object.values(postsObject);
    this.setState({postList: postsArray});
  });
}
// export function updatePost(values, updateComplete) {
//   //values.updatedAt
//   const ref = Firebase.database().ref('/posts');
//   ref.on('value', snapshot => {
//     console.log('DATA RETRIEVED');
//     const postsObject = snapshot.val();
//     const postsArray = Object.values(postsObject);
//     const postIndex = postsArray.indexOf(values);
//     postsArray[postIndex] = values;
//   });
// }
// export function updatePost(id, heading, description, location) {
//   const values = {
//     id: id,
//     heading: heading,
//     description: description,
//     location: location,
//   };
//
//   const newPostKey = Firebase.database()
//     .ref()
//     .child('posts')
//     .push().key;
//
//   const updates = {};
//   updates['/posts/' + newPostKey] = values;
//   //updates['/user-posts/' + uid + '/' + newPostKey] = values;
//
//   return Firebase.database()
//     .ref()
//     .update(updates);
// }

export function deletePost(id, heading, description, location) {
  const postData = {
    id: id,
    heading: heading,
    description: description,
    location: location,
  };

  const postKey = Firebase.database()
    .ref()
    .child('posts')
    .push().key;

  const postToDelete = {};
  postToDelete['/posts/' + postKey] = postData;
  console.log(postData);

  return Firebase.database()
    .ref()
    .remove(postToDelete);
}

export function favourite() {
  Firebase.database()
    .ref('/posts')
    .on('value', snapshot => {
      const postsObject = snapshot.val();
      Object.keys(postsObject).map((key, index) => {
        const favouritePost = postsObject[key];
      });
    });
}
//create new path (document) called favourites for each user to save their posts to
export function getFavourites(postsRetrieved) {
  db.collection('favourites')
    .addFilter('user id')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
        //postList.push(doc.data());
      });
    });
}

export function getUserPosts(postsRetrieved) {
  db.collection('posts')
    .addFilter('user id')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      });
    });
}
