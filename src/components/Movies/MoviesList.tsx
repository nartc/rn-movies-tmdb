import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import MovieListItem from './MovieListItem';
import { Movie } from '../../api/Models';

type MoviesListProps = {
  movies: Movie[],
  title: string;
  onMovieSelected: (movieId: number) => void;
};
const MoviesList: FC<MoviesListProps> = ({ movies, title, onMovieSelected }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <View style={{ marginLeft: 15, marginTop: 15 }}>
        <Text h4 h4Style={{ fontSize: 18, color: 'white' }}>{title}</Text>
      </View>
      <View style={{ marginTop: 5, paddingHorizontal: 15 }}>
        <Divider/>
      </View>
      <ScrollView horizontal>
        {movies.map(movie => (
          <MovieListItem movie={movie} key={movie.id} onSelected={onMovieSelected}/>
        ))}
      </ScrollView>
    </View>
  );
};

export default MoviesList;
