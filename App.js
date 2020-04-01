import 'react-native-gesture-handler';
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
  TextInput,
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
import Favourites from './components/Favourites';
import UserPage from './components/UserPage';
import Map from './components/Maps';
import AddForm from './components/AddForm';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackScreen from './components/stack/HomeStack';

const App: () => React$Node = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [favModalOpen, setFavModalOpen] = useState(false);
  return (
    <NavigationContainer>
      <View style={{flexDirection: 'row', backgroundColor: '#2bb76e'}}>
        <Modal visible={addModalOpen}>
          <View>
            <AddForm />
          </View>
          <Text onPress={() => setAddModalOpen(false)}>Close</Text>
        </Modal>
        <Modal visible={favModalOpen}>
          <View>
            <Favourites />
          </View>
          <Text onPress={() => setFavModalOpen(false)}>Close</Text>
        </Modal>
        <Modal visible={userModalOpen}>
          <View>
            <UserPage />
          </View>
          <Text onPress={() => setUserModalOpen(false)}>Close</Text>
        </Modal>

        <TouchableOpacity onPress={() => setAddModalOpen(true)}>
          <Text style={styles.sectionDescription}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFavModalOpen(true)}>
          <Text style={styles.sectionDescription}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserModalOpen(true)}>
          <Text style={styles.sectionDescription}>My Page</Text>
        </TouchableOpacity>
      </View>
      <HomeStackScreen />
    </NavigationContainer>
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
