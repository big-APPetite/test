import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FavouriteButton from '../components/FavouriteButton';
import chickenClub from './images/chickenSandwich.jpg';

const Post = ({heading, description, location, username}) => (
  <View style={postStyle.container}>
    <View style={(postStyle.container, {alignItems: 'flex-start'})}>
      <View style={postStyle.padding}>
        <Image style={postStyle.image} source={chickenClub} />

        <Text>{heading}*heading*</Text>
        <Text>{location}*location*</Text>
        <Text>{username}*username*</Text>
      </View>

      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          backgroundColor: '#2bb76e',
        }}>
        <Text style={postStyle.paragraph}>{description}*description*</Text>
        <FavouriteButton />
      </View>
    </View>
  </View>
);

const postStyle = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#2bb76e',
    flex: 1,
  },
  padding: {
    padding: 10,
  },
  heading: {
    backgroundColor: (255, 250, 250, 50),
    flexDirection: 'column',
  },
  paragraph: {
    alignSelf: 'flex-end',
  },
  username: {},
  image: {
    flexDirection: 'row',
    height: 150,
    width: 150,
  },
});
export default Post;
