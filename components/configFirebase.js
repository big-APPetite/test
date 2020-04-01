import * as firebase from 'firebase';
import 'firebase/firestore';
import Rebase from 're-base';
import React from 'react';

export const firebaseConfig = {
  apiKey: 'AIzaSyBkUl4xLIrmxDgZwN51X0HmAZOOD-cAKkM',
  authDomain: 'big-appetite-96416.firebaseapp.com',
  databaseURL: 'https://big-appetite-96416.firebaseio.com',
  projectId: 'big-appetite-96416',
  storageBucket: 'big-appetite-96416.appspot.com',
  messagingSenderId: '302949475610',
  appId: '1:302949475610:web:ce87017adfc56e137938a3',
  measurementId: 'G-PGWQBWZ4FV',
};

const app = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(app.database());

export {base};
