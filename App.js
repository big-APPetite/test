import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackScreen from './components/stack/HomeStack';
import AuthNavigator from './components/stack/authNavigator';
import RemotePushController from './android/app/src/services/RemotePushController';


const App: () => React$Node = () => {
  return (
    // <NavigationContainer>
    //   <HomeStackScreen />
    // </NavigationContainer>
    
    
        <AuthNavigator >
          
      <RemotePushController />
      </AuthNavigator>
  );
};

export default App;
