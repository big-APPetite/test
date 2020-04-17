import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackScreen from './components/stack/HomeStack';
import AuthNavigator from './components/stack/authNavigator';


const App: () => React$Node = () => {
  return (
    // <NavigationContainer>
    //   <HomeStackScreen />
    // </NavigationContainer>
    <AuthNavigator />
  );
};

export default App;
