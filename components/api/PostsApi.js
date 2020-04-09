import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import React from 'react';

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

// export function uploadPost(post, onPostUploaded, {updating}) {
//   if (post.imageUri) {
//     const fileExtension = post.imageUri.split('.').pop();
//     console.log('EXT:' + fileExtension);
//
//     const uuid = uuid4();
//     const fileName = uuid + '.' + fileExtension;
//     console.log(fileName);
//
//     const storageRef = Firebase.storage().ref('posts/images/' + fileName);
//     storageRef.put(post.imageUri).on(
//       Firebase.storage.TaskEvent.STATE_CHANGED,
//       snapshot => {
//         console.log('snapshot: ' + snapshot.state);
//         console.log(
//           'progress: ' +
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
//         );
//         if (snapshot.state === Firebase.storage.TaskState.SUCCESS) {
//           console.log('Success');
//         }
//       },
//       error => {
//         // unsubscribe();
//         console.log('image upload error: ' + error.toString());
//       },
//       () => {
//         storageRef.getDownloadURL().then(downloadUrl => {
//           console.log('File available at: ' + downloadUrl);
//           delete post.imageUri;
//           post.image = downloadUrl;
//
//           if (updating) {
//             console.log('Updating...');
//           } else {
//             console.log('Adding...');
//             addPost(post, onPostUploaded);
//           }
//         });
//       },
//     );
//   } else {
//     console.log('Skipping image upload');
//     delete post.imageUri;
//
//     if (updating) {
//       console.log('Updating....');
//     } else {
//       console.log('adding...');
//       addPost(post, onPostUploaded);
//     }
//   }
// }

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
