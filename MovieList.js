//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MovieCard from './MovieCard'
// create a component
class MovieList extends Component {
  render() {
    const screenProps = this.props.screenProps;
    const navigate = this.props.navigation.navigate;
    // const {navigate} = this.props.navigation
    return (
      <View>
        {
          this.props.loading ? <Text>Loading...</Text> : null
        }
        <FlatList
          data={screenProps.movies}
          keyExtractor={(movie)=> movie.id}
          renderItem={(movieItem) => <MovieCard {...movieItem.item} loadProfile={() => navigate('MovieProfile', movieItem.item)} />}
          // onRefresh={this.props.loadMore}
          onEndReached={screenProps.loadMore}
          onEndReachedThreshold={0.1}
          refreshing={screenProps.loading}
          ListFooterComponent={() =>
            <View style={{flex: 1, padding: 10}}>
              <ActivityIndicator size="large" />
            </View>
          }
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
});

//make this component available to the app
export default MovieList;
