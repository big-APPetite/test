import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Post from './Post';
import Firebase from 'firebase';
import 'firebase/database';
import {firebaseConfig} from './configFirebase';
import PostDetails from './stack/PostDetails';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    !Firebase.apps.length
      ? Firebase.initializeApp(firebaseConfig.firebase)
      : Firebase.app();

    this.state = {
      postList: [],
    };
  }
  state = {
    loading: false,
    currentPost: null,
  };

  componentDidMount() {
    this.getPostData();
  }

  getPostData = () => {
    const ref = Firebase.database().ref('/posts');
    ref.on('value', snapshot => {
      console.log('DATA RETRIEVED');
      const postsObject = snapshot.val();
      if (!postsObject) {
        return console.warn('No data from firebase');
      }
      const postsArray = Object.values(postsObject);
      this.setState({postList: postsArray});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={post => post.heading}
          data={this.state.postList}
          renderItem={({item: post}) => (
            <Post
              key={post.heading}
              heading={post.heading}
              description={post.description}
              location={post.location}
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

// export default ({navigation}) => (
//   <FlatList
//   data={this.state.postList}
//   keyExtractor={post => post.heading}
//   renderItem={({item: post}) => (
//       <Post
//           key={post.heading}
//           heading={post.heading}
//           description={post.description}
//           location={post.location}
//           onPress={() => navigation.push('PostDetails', {post})}
//       />
//   )} />
// )

export const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#2bb76e',
    flex: 1,
  },
  txtInput: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: 'snow',
  },
});
