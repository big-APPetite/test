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
import FavouriteButton from './buttons/FavouriteButton';
import chickenClub from './images/chickenSandwich.jpg';

const Post = ({heading, description, location, username, onPress}) => (
  <TouchableOpacity style={postStyle.container} onPress={onPress}>
    <View style={(postStyle.container, {alignItems: 'flex-start'})}>
      <View style={postStyle.padding}>
        <Image style={postStyle.image} source={chickenClub} />
        <View style={{backgroundColor: (255, 255, 255, 45), borderRadius: 6}}>
          <Text style={postStyle.text}>{heading}</Text>
          <Text style={postStyle.text}>{location}</Text>
          <Text style={postStyle.text}>{username}*username*</Text>
        </View>
      </View>

      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'column',
          backgroundColor: '#2bb76e',
        }}>
        <Text style={postStyle.paragraph}>{description}</Text>
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-end'}}>
          <FavouriteButton />
        </View>
      </View>
    </View>
  </TouchableOpacity>
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
    fontSize: 20,
  },
  username: {},
  image: {
    flexDirection: 'row',
    height: 150,
    width: 150,
  },
  text: {
    fontSize: 25,
    padding: 5,
  },
});
export default Post;
