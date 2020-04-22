import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Posts from '../PostList';
import AddForm from '../AddForm';
import {Button} from 'react-native';
import Favourites from './FavouritesScreen';
import {logOut} from '../api/UsersApi';
import AccountScreen from './AccountScreen';
import ChangeUsername from '../ChangeUsername';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator name="Home">
    <HomeStack.Screen
      name="PostList"
      component={Posts}
      options={({route, navigation}) => {
        return {
          headerTitle: 'big APPetite',
          // headerRight: () => (
          //   <Button
          //     title="Add"
          //     onPress={() => {
          //       navigation.navigate('New Post');
          //     }}
          //   />
          // ),
          headerRight: () => (
            <Button
              title="Username"
              onPress={() => {
                navigation.navigate('Change Username');
              }}
            />
          ),
          // headerRight: () => (
          //   <Button
          //     title="Account"
          //     onPress={() => {
          //       navigation.navigate('Account');
          //     }}
          //   />
          // ),
          // headerRight: () => (
          //   <Button
          //     title="Favourites"
          //     onPress={() => {
          //       navigation.navigate('Favourites');
          //     }}
          //   />
          // ),
          headerLeft: () => <Button title="Log Out" onPress={logOut} />,
        };
      }}
    />
    <HomeStack.Screen name="New Post" component={AddForm} />
    <HomeStack.Screen name="Favourites" component={Favourites} />
    <HomeStack.Screen name="Account" component={AccountScreen} />
    <HomeStack.Screen name="Change Username" component={ChangeUsername} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
