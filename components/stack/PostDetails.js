import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import EditForm from '../EditForm';

export default ({route}) => {
  const postInfo = route.params;
  const postsArray = Object.values(postInfo);
  console.log(postInfo);

  return (
    <View>
      {/*<Text>{JSON.stringify(postInfo, null, 2)}</Text>*/}
      <Text style={styles.text}>{postInfo.heading}</Text>
      <Text style={styles.text}>{postInfo.location}</Text>
      <Text style={styles.text}>{postInfo.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});
// export default ({navigation}) => {
//   navigation = this.props;
//   return (
//     <View>
//       <Text>{navigation.getParam('heading')}</Text>
//     </View>
//   );
// };
