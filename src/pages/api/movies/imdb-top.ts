import { NextApiRequest, NextApiResponse } from "next";
import fetchTmdb from "@/utils/fetchTmdb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { results } = await fetchTmdb("movie/top_rated");

    const imdbTopMovies: Movie[] = results.map((movie: any) => ({
      id: `${movie.id}`,
      title: movie.title,
      posterUrl: `${process.env.TMDB_IMG_BASE_URL}/w342${movie.poster_path}`,
      releaseDate: movie.release_date?.split("-")[0],
      rating: ((movie.vote_average || 0) / 10) * 5,
    }));

    const totalRating = imdbTopMovies.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );

    const watchlist: Watchlist = {
      id: "imdb-top",
      name: "IMDB Top",
      description: "As rated by regular IMDb voters.",
      averageRating: totalRating / imdbTopMovies.length,
      movies: imdbTopMovies,
    };

    return res.status(200).json(watchlist);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

export default handler;
