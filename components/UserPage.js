import React, {Component, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Post from './Post';
import {styles} from './PostList';
import EditForm from './EditForm';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: '',
      description: '',
      location: '',
      postList: [],
    };
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
    const [userModalOpen, setUserModalOpen] = useState(false);
    return (
      <View>
        <View>
          <Text>Your Posts</Text>
        </View>
        <Modal visible={editModalOpen}>
          <View>
            <EditForm />
          </View>
          <Text onPress={() => setEditModalOpen(false)}>Close</Text>
        </Modal>
        <View style={styles.container}>
          <FlatList
            keyExtractor={doc => doc.id}
            data={this.state.postList}
            renderItem={this.renderItem}
          />
          <TouchableOpacity
            style={style.button}
            onPress={() => setEditModalOpen(true)}>
            <Text style={style.btnText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  button: {
    flex: 1,
    width: 150,
    height: 75,
    backgroundColor: '#b181dc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: '#565656',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
