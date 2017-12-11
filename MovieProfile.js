//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// create a component
class MovieProfile extends Component {
  render() {
    const props = this.props.navigation.state.params;
    const img = { uri: `https://image.tmdb.org/t/p/w1000_and_h563_bestv2${props.poster_path}` };
    return <View>
        <Image style={styles.image} source={img} />
        <View style={styles.textContainer}>
          <Text>{props.title}</Text>
          <Text>{props.overview}</Text>
          <Text>{props.vote_average}</Text>
        </View>
      </View>;
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  image: {
    width: 300,
    height: 150
  }
});

//make this component available to the app
export default MovieProfile;
