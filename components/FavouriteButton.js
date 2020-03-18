import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import favouriteButton from './images/favourite.png';

export default class FavouriteButton extends Component {
  constructor() {
    super();
    this.state = {
      post: '',
    };
    this.submit = this.submit.bind(this);
  }
  submit() {
    this.setState({post: ''});
  }

  render() {
    return (
      <View ref={'favouriteButton'} style={styles.position}>
        {/*<Image*/}
        {/*  source={favouriteButton}*/}
        {/*  style={styles.favouriteButton}*/}
        {/*  onPress={this.submit}*/}
        {/*/>*/}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Favourite</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  position: {
    paddingBottom: 20,
    bottom: 0,
  },
  button: {
    flex: 1,
    width: 150,
    height: 75,
    backgroundColor: '#418ADC',
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
