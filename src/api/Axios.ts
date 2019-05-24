import axios, { AxiosInstance } from 'axios';
import { Configuration, Movie, MovieDetail, MovieEndpointsPath } from './Models';

const endpointPlaceholder = '{endpoint}';
const getEndpoint = `{endpoint}?api_key=26766539c19cd8519cf023f43ff7064d&language=en-US`;

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 1000,
});

export const getMovies = async (path: MovieEndpointsPath) => {
  const endpoint = getEndpoint.replace(endpointPlaceholder, path).concat('&page=1');
  const response = await instance.get<{ results: Movie[] }>('movie/' + endpoint);
  return response.data.results;
};

export const getMovieById = async (movieId: string) => {
  const endpoint = getEndpoint.replace(endpointPlaceholder, movieId)
    .concat('&append_to_response=videos,images,credits,recommendations&include_image_language=en,null');
  const result = await instance.get<MovieDetail>('movie/' + endpoint);
  return result.data;
};

export const getConfiguration = async () => {
  const result = await instance.get<Configuration>('configuration?api_key=26766539c19cd8519cf023f43ff7064d');
  return result.data;
};
