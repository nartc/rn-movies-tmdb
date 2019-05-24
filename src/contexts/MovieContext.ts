import { Movie, MovieDetail } from '../api/Models';
import { createContext, Dispatch, Reducer, ReducerAction } from 'react';

export type MovieContextState = {
  selected?: MovieDetail;
  upcoming: Movie[];
  topRated: Movie[];
  nowPlaying: Movie[];
  popular: Movie[];
  isLoading: boolean;
};

export type MovieContextActionTypes =
  'SET_SELECTED'
  | 'SET_UPCOMING'
  | 'SET_TOP_RATED'
  | 'SET_NOW_PLAYING'
  | 'SET_POPULAR'
  | 'SET_IS_LOADING';

export type MovieContextActions = { type: MovieContextActionTypes } & Partial<MovieContextState>;

export const movieContextReducer: Reducer<MovieContextState, MovieContextActions> = (prevState, action) => {
  switch (action.type) {
    case 'SET_SELECTED': {
      return { ...prevState, selected: action.selected as MovieDetail };
    }
    case 'SET_UPCOMING': {
      return { ...prevState, upcoming: action.upcoming as Movie[] };
    }
    case 'SET_TOP_RATED': {
      return { ...prevState, topRated: action.topRated as Movie[] };
    }
    case 'SET_NOW_PLAYING': {
      return { ...prevState, nowPlaying: action.nowPlaying as Movie[] };
    }
    case 'SET_POPULAR': {
      return { ...prevState, popular: action.popular as Movie[] };
    }
    case 'SET_IS_LOADING': {
      return { ...prevState, isLoading: action.isLoading as boolean };
    }
    default:
      return prevState;
  }
};

export type MovieContext = {
  state: MovieContextState;
  dispatcher: Dispatch<ReducerAction<Reducer<MovieContextState, MovieContextActions>>>;
}

export const movieContext = createContext<MovieContext | null>(null);
