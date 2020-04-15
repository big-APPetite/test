import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import Firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import {styles} from '../PostList';
import Post from '../Post';

export default class Favourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favList: [],
    };
  }

  getFavourites = () => {
    const userKey = Firebase.auth().currentUser.uid;
    const ref = Firebase.database().ref('favourites/' + userKey);
    ref.on('value', snapshot => {
      console.log('Favourites retrieved!');
      const favObject = snapshot.val();
      if (!favObject) {
        return console.warn('No data from firebase');
      }
      const favArray = Object.values(favObject);
      this.setState({favList: favArray});
    });
  };

  componentDidMount() {
    this.getFavourites();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={post => post.heading}
          data={this.state.favList}
          renderItem={({item: post}) => (
            <Post
              key={post.heading}
              heading={post.heading}
              description={post.description}
              location={post.location}
              createdBy={post.createdBy}
              image={post.image && {uri: post.image}}
            />
          )}
        />
      </View>
    );
  }
}
