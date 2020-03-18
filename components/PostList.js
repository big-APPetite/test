import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Post from './Post';
import PostForm from './PostForm';
import firebase, {database} from 'firebase';
import 'firebase/firestore';
import _ from 'lodash';
import {grabPosts} from './api/PostsApi';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayHolder: [],
      heading: '',
      description: '',
      location: '',
    };
    // this.posts = [
    //   {
    //     heading: 'sandwiches',
    //     description:
    //       'Ham, cheese and tuna sandwiches leftover from the careers function.',
    //     location: 'Arundel',
    //   },
    //   {
    //     heading: 'pizza',
    //     description: "Cancer research event didn't eat all their Dominoes",
    //     location: 'Careers Connect',
    //   },
    // ];
  }
  state = {
    loading: false,
    currentPost: null,
    postList: [],
  };

  onPostsReceived = postList => {
    console.log(postList);
    this.setState(prevState => ({
      postList: (prevState.postList = postList),
    }));
  };

  componentWillMount() {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: 'AIzaSyBkUl4xLIrmxDgZwN51X0HmAZOOD-cAKkM',
      authDomain: 'big-appetite-96416.firebaseapp.com',
      databaseURL: 'https://big-appetite-96416.firebaseio.com',
      projectId: 'big-appetite-96416',
      storageBucket: 'big-appetite-96416.appspot.com',
      messagingSenderId: '302949475610',
      appId: '1:302949475610:web:ce87017adfc56e137938a3',
      measurementId: 'G-PGWQBWZ4FV',
    };

    // !firebase.apps.length
    //   ? firebase.initializeApp(firebaseConfig)
    //   : firebase.app();
    //
    // console.log(firebase.name);
    // console.log(firebase.database());
    //
    // try {
    //   firebase.initializeApp({
    //     databaseURL: 'https://big-appetite-96416.firebaseio.com',
    //   });
    // } catch (err) {
    //   if (!/alreadyexists/.test(err.message)) {
    //     console.error('Firebase initialisation error', err.stack);
    //   }
    // }

    firebase
      .database()
      .ref('posts/001')
      .set({
        heading: 'sandwiches',
        description:
          'Ham, cheese and tuna sandwiches leftover from the careers function.',
        location: 'Arundel',
      })
      .then(() => {
        console.log('INSERTED !');
      })
      .catch(error => {
        console.log(error);
      });

    firebase
      .database()
      .ref('posts')
      .on('value', data => {
        console.log(data.toJSON());
      });

    setTimeout(() => {
      firebase
        .database()
        .ref('posts/002')
        .set({
          heading: 'pizza',
          description: "Cancer research event didn't eat all their Dominoes",
          location: 'Careers Connect',
        })
        .then(() => {
          console.log('INSERTED !');
        })
        .catch(error => {
          console.log(error);
        });
    }, 5000);
  }

  componentDidMount() {
    // getPosts(this.onPostsReceived()).then(r => r);
    grabPosts(this.onPostsReceived);
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
    if (this.state.loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color={'dodgerblue'} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={doc => doc.id}
          data={this.state.postList}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
