import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {styles} from './PostList';
import Post from './Post';

export default class UserPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPostList: [],
    };
  }

  getUserPosts = () => {
    const userKey = Firebase.auth().currentUser.uid;
    const ref = Firebase.database().ref('user_posts/' + userKey);
    ref.on('value', snapshot => {
      console.log('User posts retrieved!');
      const postObject = snapshot.val();
      if (!postObject) {
        return console.warn('No data from firebase');
      }
      const postsArray = Object.values(postObject);
      this.setState({userPostList: postsArray});
    });
  };

  componentDidMount() {
    this.getUserPosts();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={post => post.heading}
          data={this.state.userPostList}
          renderItem={({item: post}) => (
            <Post
              key={post.id}
              heading={post.heading}
              description={post.description}
              location={post.location}
              createdBy={' '}
              image={post.image && {uri: post.image}}
              onPress={() =>
                this.props.navigation.navigate('PostDetails', post)
              }
            />
          )}
        />
      </View>
    );
  }
}
