import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default ({route}) => {
  const postInfo = route.params;
  const postsArray = Object.values(postInfo);
  console.log(postInfo);

  return (
    <View>
      {/*<Text>{JSON.stringify(postInfo, null, 2)}</Text>*/}
      <Text style={styles.text}>Title: {postInfo.heading}</Text>
      <Text style={styles.text}>Location: {postInfo.location}</Text>
      <Text style={{fontSize: 25, textAlign: 'center'}}>
        {postInfo.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});
