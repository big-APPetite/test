import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Posts from '../PostList';
import AddForm from '../AddForm';
import PostDetails from './PostDetails';
import {Button} from 'react-native';
import EditForm from '../EditForm';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
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
  </HomeStack.Navigator>
);

export default HomeStackScreen;
