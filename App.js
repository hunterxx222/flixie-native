import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './MovieList'
import { StackNavigator } from 'react-navigation'
import MovieProfile from './MovieProfile'
const apiKey = '0c70f97083ae2cfd82206d6ade5cd87e';

const Routes = StackNavigator({
  MovieList: {screen: MovieList},
  MovieProfile: {screen: MovieProfile, navigationOptions: ({navigation}) =>({
    title: `${navigation.state.params.title}`
  })}
})

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWithPage = this.fetchWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      movies: [],
      loading: false,
      page: 1,
      searchText: "",
    }
  }

  fetchWithPage(page) {
    this.setState(
      {
        loading: true
      },
      () => {
        fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`
        )
          .then(data => data.json())
          .then(json => {
            const mSet = new Set([...this.state.movies.map((m) => m.id)]);
            const plusSet = json.results.filter((m) => !mSet.has(m.id));
            const newResults = this.state.movies.concat(plusSet);
            this.setState({
              movies: newResults,
              loading: false,
              filteredMovies: this.state.movies
            });
          })
      }
    );
  }

  loadMore() {
    const newPage = this.state.page + 1;
    this.setState({
      page: newPage
    }, () => this.fetchWithPage(newPage));
  }
  onRefresh() {
    this.setState({
      page: 1
    }, () => this.fetchWithPage(this.state.page))
  }

  handleChange(searchText) {
    this.setState({
      searchText
    });
    var filteredMovies = this.state.movies;
    filteredMovies = filteredMovies.filter(movie => {
      return movie.title.toLowerCase().search(
        searchText.toLowerCase()
      )!== -1
    })
    this.setState({ filteredMovies });
  }

  componentWillMount(props) {
    this.fetchWithPage(1)
  }


  render() {

    return (
        <Routes screenProps={{
          movies: this.state.filteredMovies,
          loadMore: this.loadMore,
          loading: this.state.loading,
          onRefresh: this.onRefresh,
          handleChange: this.handleChange
        }}/>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
