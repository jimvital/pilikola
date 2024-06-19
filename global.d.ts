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
  genres: string[];
  runtime: number;
  summary: string;
  rating: number;
  cast: MovieCast[];
  recommendations: MovieRecommendation[];
  listedInCount?: number;
};

type Movie = {
  id: string;
  dbId?: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  rating: number;
};

type Watchlist = {
  id: string;
  name: string;
  description: string;
  averageRating: number;
  movies: Movie[];
};

type UserWatchlist = {
  id: string;
  name: string;
};

type User = {
  id: string;
  cognitoId: string;
  name: string;
  watchlists: UserWatchlist[];
  globalWatched: string[];
};
