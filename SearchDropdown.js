/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Button,
} from 'react-native';
import Post from './Post';
import Firebase from 'firebase';
import 'firebase/database';
import {firebaseConfig} from './configFirebase';
import PostDetails from './stack/PostDetails';

export default class SearchDropdown extends Component {

 


  constructor(props) {
    super(props);
    !Firebase.apps.length
      ? Firebase.initializeApp(firebaseConfig.firebase)
      : Firebase.app();
    this.state = {location: '', postList: [], searchedList: []};
  }

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

      
  onPressSearchHandler(location) {
    let searchedListVar = this.state.postList.filter(function(post) {
      return post.location === location});
      console.log(searchedListVar); 
      this.setState({
                    searchedList: searchedListVar,
                    });
   };

  render() {
    let locations = [
      {
        value: 'Harmer',
      },
      {
        value: 'Eric Mensforth',
      },
      {
        value: 'Sheaf',
      },
      {
        value: 'Howard/Surrey',
      },
      {
        value: 'Adsetts',
      },
      {
        value: 'Stoddart',
      },
      {
        value: 'Cantor',
      },
      {
        value: 'Arundel',
      },
      {
        value: 'Oneleven',
      },
      {
        value: 'Charles Street',
      },
      {
        value: 'Sheffield Institute of ARts',
      },
      {
        value: 'Owen',
      },
      {
        value: 'Norfolk',
      },
    ];

    
    


    return (
      <View>
        <Dropdown
          label="Search posts by location"
          data={locations}
          onChangeText={(location) => this.setState({location})}
          value={this.state.location}
        />
        <Button 
        // onPress={console.log(this.state.location)}
        onPress={() => this.onPressSearchHandler(this.state.location)}
        title="Search"
        />
        <FlatList
          keyExtractor={post => post.heading}
          data={this.state.searchedList}
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
