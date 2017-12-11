//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements'
import MovieCard from './MovieCard'
// create a component
class MovieList extends Component {
  render() {
    const screenProps = this.props.screenProps;
    const navigate = this.props.navigation.navigate;
    // const {navigate} = this.props.navigation
    return <View>
        {this.props.loading ? <Text>Loading...</Text> : null}
        <SearchBar onChangeText={e => screenProps.handleChange(e)} placeholder="Type Here..." />
        <FlatList 
          data={screenProps.filteredMovies} 
          keyExtractor={movie => movie.id} 
          renderItem={movieItem => 
            <MovieCard {...movieItem.item} 
              loadProfile={() => navigate("MovieProfile", movieItem.item)} />}
              onRefresh={screenProps.onRefresh} 
              onEndReached={screenProps.loadMore} 
              onEndReachedThreshold={0.00} 
              refreshing={screenProps.loading} 
              ListFooterComponent={() => <View style={{ flex: 1, padding: 10 }}>
            </View>
              } />
            </View>
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
