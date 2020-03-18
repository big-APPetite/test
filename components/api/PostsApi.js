import firebase from 'firebase';
import 'firebase/firestore';
import React from 'react';
import _ from 'lodash';
import Post from '../Post';

const db = firebase.firestore();

export function addPost(post, addComplete) {
  firebase
    .database()
    .ref('posts')
    .push({
      heading: post.heading,
      description: post.description,
      createdAt: firebase.database.FieldValue.serverTimestamp(),
    })
    .then(data => addComplete(data))
    .catch(error => console.log(error));
}

export async function getPosts(postsRetrieved) {
  const postList = [];
  let snapshot = await firebase
    .database()
    .ref('posts')
    .orderBy('createdAt')
    .get();

  snapshot.forEach(doc => {
    postList.push(doc.data());
  });

  console.log(postList);

  postsRetrieved(postList);
}

export async function displayPosts(postsRetrieved) {
  let postList = [];
  const snapshot = await firebase
    .firestore()
    .collection('posts')
    .orderBy('createdAt')
    .get();

  snapshot.forEach(doc => {
    postList.push(doc.data());
  });

  postsRetrieved(postList);
}

export function grabPosts(postsRetrieved) {
  const postList = [];
  db.collection('posts')
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
        postList.push(doc.data());
      });
    });
  postsRetrieved(postList);
}
