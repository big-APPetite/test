import React, {useState, useEffect, createContext} from 'react';
import Firebase from 'firebase';
import LogInStack from './logInStack';
import LogOutStack from './logOutStack';

export const AuthContext = createContext(null);

export default function AuthNavigator() {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  // function onAuthStateChanged(result) {
  //   setUser(result);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // }

  useEffect(() => {
    const authSubscriber = Firebase.auth().onAuthStateChanged(result => {
      setUser(result);
      if (initializing) {
        setInitializing(false);
      }
    });

    // unsubscribe on unmount
    return authSubscriber;
  }, [initializing]);

  if (initializing) {
    return null;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <LogInStack />
    </AuthContext.Provider>
  ) : (
    <LogOutStack />
  );
}
