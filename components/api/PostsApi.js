import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import React from 'react';
import post from 're-base/src/lib/post';

//need to add createdBy field to store post creator's id
export function addPost(values, addComplete) {
  Firebase.database()
    .ref('posts')
    .push({
      heading: values.heading,
      description: values.description,
      location: values.location,
      // createdAt: Firebase.database.FieldValue.serverTimestamp(),
    })
    .then(data => addComplete(data))
    .catch(error => console.log(error));
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
export function updatePost(values, updateComplete) {
  //values.updatedAt
  const postKey = Firebase.database()
    .ref()
    .child('posts')
    .push()
    .getKey();

  console.log(postKey);

  const updates = {};
  updates[postKey] = values;

  return Firebase.database()
    .ref('posts')
    .update(updates)
    .then(() => updateComplete(updates))
    .catch(error => console.log(error));
}
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
