import { celebData } from "../data/celebData";
// const genres = {
//   12: 'Adventure',
//   14: 'Fantasy',
//   16: 'Animation',
//   18: 'Drama',
//   27: 'Horror',
//   28: 'Action',
//   35: 'Comedy',
//   36: 'History',
//   37: 'Western',
//   53: 'Thriller',
//   80: 'Crime',
//   99: 'Documentary',
//   878: 'Science Fiction',
//   9648: 'Mystery',
//   10402: 'Music',
//   10749: 'Romance',
//   10751: 'Family',
//   10752: 'War',
//   10770: 'TV Movie',
// };

// const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=401d99613457b207ed11170ac072437a&sort_by=popularity.desc`;
// const getImagePath = (path) => `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
// const getBackdropPath = (path) => `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getMovies = async () => {

  const movies = celebData.map(
    ({
      id,
      name,
      profile,
      overview,
    }) => ({
      key: id,
      poster:profile,
      title: name,
      description: overview,
    })
  );

  return movies}