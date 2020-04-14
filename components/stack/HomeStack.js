import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Posts from '../PostList';
import AddForm from '../AddForm';
import PostDetails from './PostDetails';
import {Button} from 'react-native';
import EditForm from '../EditForm';
import Favourites from './FavouritesScreen';
import {logOut} from '../api/UsersApi';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator name="Home">
    <HomeStack.Screen
      name="PostList"
      component={Posts}
      options={({route, navigation}) => {
        return {
          headerTitle: 'big APPetite',
          headerRight: () => (
            <Button
              title="Add"
              onPress={() => {
                navigation.navigate('New Post');
              }}
            />
          ),
          headerLeft: () => (
            <Button
              // title="Favourites"
              // onPress={() => {
              //   navigation.navigate('Favourites');
              // }}
              title="Log Out"
              onPress={logOut}
            />
          ),
        };
      }}
    />
    <HomeStack.Screen
      name="PostDetails"
      component={PostDetails}
      options={({route, navigation}) => {
        return {
          headerTitle: route.params.heading,
          headerRight: () => (
            <Button
              title="Edit"
              onPress={() => {
                navigation.navigate('Update Post', {
                  post: route.params,
                });
              }}
            />
          ),
        };
      }}
    />
    <HomeStack.Screen name="New Post" component={AddForm} />
    <HomeStack.Screen name="Update Post" component={EditForm} />
    <HomeStack.Screen name="Favourites" component={Favourites} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
