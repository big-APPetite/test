import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Posts from './components/PostList';
import PostForm from './components/PostForm';
import Post from './components/Post';
import EditForm from './components/EditForm';

const App: () => React$Node = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Modal visible={addModalOpen}>
          <View>
            <PostForm />
          </View>
          <Text onPress={() => setAddModalOpen(false)}>Close</Text>
        </Modal>
        <Modal visible={editModalOpen}>
          <View>
            <EditForm />
          </View>
          <Text onPress={() => setAddModalOpen(false)}>Close</Text>
        </Modal>

        <TouchableOpacity onPress={() => setAddModalOpen(true)}>
          <Text style={styles.sectionDescription}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEditModalOpen(true)}>
          <Text style={styles.sectionDescription}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Post />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    padding: 5,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
