type MovieCast = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
};

type MovieRecommendation = {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  rating: number;
};

type MovieDetails = {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  genre: string[];
  runtime: number;
  summary: string;
  rating: number;
  cast: MovieCast[];
  recommendations: MovieRecommendation[];
  watchedBy: string[];
};

type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  rating: number;
  watchedBy?: string[];
};

type Watchlist = {
  id: ID;
  name: string;
  description: string;
  movies: Movie[];
};
