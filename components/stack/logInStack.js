import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStackScreen from './HomeStack';

const Stack = createStackNavigator();

export default function LogInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
