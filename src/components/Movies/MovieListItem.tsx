import React, { FC, useContext } from 'react';
import { Card } from 'react-native-elements';
import { ConfigurationContext, configurationContext } from '../../contexts/ConfigurationContext';
import { Movie } from '../../api/Models';
import { TouchableWithoutFeedback } from 'react-native';

type MovieListItemProps = {
  movie: Movie;
  onSelected: (movieId: number) => void;
};
const MovieListItem: FC<MovieListItemProps> = ({ movie, onSelected }) => {
  const { state: { configuration } } = useContext(configurationContext) as ConfigurationContext;

  return configuration ? (
    <TouchableWithoutFeedback onPress={() => {
      onSelected(movie.id);
    }}>
      <Card image={{ uri: `${configuration.images.secure_base_url}${configuration.images.poster_sizes.find(s => s === 'original')}${movie.poster_path}` }}
            imageStyle={{ height: 250, width: 175 }}
            imageProps={{ resizeMode: 'stretch', resizeMethod: 'resize' }}
            containerStyle={{ height: 250, width: 175 }}
            featuredTitle={movie.original_title}
            featuredTitleStyle={{ position: 'absolute', bottom: 15, left: 5, fontSize: 14 }}
            featuredSubtitle={`Rating: ${movie.vote_average}`}
            featuredSubtitleStyle={{ position: 'absolute', bottom: 5, left: 5, fontSize: 10 }}/>
    </TouchableWithoutFeedback>
  ) : null;
};

export default MovieListItem;
