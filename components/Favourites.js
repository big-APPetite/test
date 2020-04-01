import React, {Component} from 'react';
import {FlatList, Stylesheet, Text, View} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import Post from './Post';
import {getFavourites, getUserPosts} from './api/PostsApi';
import {styles} from './PostList';

export default class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: '',
      description: '',
      location: '',
      postList: [],
    };
  }
  componentDidMount(postsRetrieved) {
    getFavourites(this.postsRetrieved);
  }

  renderItem({doc}) {
    return (
      <Post
        key={doc.key}
        heading={doc.data().heading}
        description={doc.data().description}
        location={doc.data().location}
      />
    );
  }
  render() {
    return (
      <View>
        <View>
          <Text>Your Favourite Posts</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            keyExtractor={doc => doc.id}
            data={this.state.postList}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}
