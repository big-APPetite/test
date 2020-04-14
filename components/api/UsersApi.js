import React from 'react';
import Firebase from 'firebase';
import 'firebase/auth';

export async function logOut() {
  try {
    await Firebase.auth().signOut();
  } catch (e) {
    console.error(e);
  }
  console.log('User successfully logged out.');
}
