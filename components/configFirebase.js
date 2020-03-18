import * as firebase from 'firebase';
import 'firebase/firestore';
import Rebase from 're-base';
import React from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyBkUl4xLIrmxDgZwN51X0HmAZOOD-cAKkM',
  authDomain: 'big-appetite-96416.firebaseapp.com',
  databaseURL: 'https://big-appetite-96416.firebaseio.com',
  projectId: 'big-appetite-96416',
  storageBucket: 'big-appetite-96416.appspot.com',
  messagingSenderId: '302949475610',
  appId: '1:302949475610:web:ce87017adfc56e137938a3',
  measurementId: 'G-PGWQBWZ4FV',
};
<>
  <script src="/__/firebase/5.8.4/firebase-app.js" />
  <script src="/__/firebase/5.8.4/firebase-auth.js" />
  <script src="/__/firebase/5.8.4/firebase-database.js" />
  <script src="/__/firebase/5.8.4/firebase-messaging.js" />
  <script src="/__/firebase/5.8.4/firebase-functions.js" />
  <script src="/__/firebase/5.8.4/firebase-storage.js" />
</>;

// export default (!firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app());

const app = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(app.database());
const db = firebase.firestore();

export {base};
