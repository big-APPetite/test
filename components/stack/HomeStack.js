import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Posts from '../PostList';
import AddForm from '../AddForm';
import PostDetails from './PostDetails';
import {Button} from 'react-native';
import EditForm from '../EditForm';
import PostForm from '../PostForm';

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
          headerLeft: () => (
            <Button
              title="Post"
              onPress={() => {
                navigation.navigate('Post Form', {
                  post: route.params,
                });
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
    <HomeStack.Screen name="Post Form" component={PostForm} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
