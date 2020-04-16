import React from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import UserPosts from '../UserPostList';
import PostDetails from './PostDetails';
import EditForm from '../EditForm';

const AccountStack = createStackNavigator();

const AccountScreen = () => (
  <AccountStack.Navigator>
    <AccountStack.Screen name="User Posts" component={UserPosts} />
    <AccountStack.Screen
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
    <AccountStack.Screen name="Update Post" component={EditForm} />
  </AccountStack.Navigator>
);

export default AccountScreen;
