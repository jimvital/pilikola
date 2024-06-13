import { NextApiRequest, NextApiResponse } from "next";
import fetchTmdb from "@/utils/fetchTmdb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const movieId = req.query.movieId as string;

    const movie = await fetchTmdb(
      `movie/${movieId}`,
      "append_to_response=credits,recommendations"
    );

    const details: MovieDetails = {
      id: `${movie.id}`,
      title: movie.title,
      posterUrl: `${process.env.TMDB_IMG_BASE_URL}/w342${movie.poster_path}`,
      releaseDate: movie.release_date?.split("-")[0],
      genres: movie.genres.map((genre: any) => genre.name),
      runtime: movie.runtime,
      summary: movie.overview,
      rating: ((movie.vote_average || 0) / 10) * 5,
      cast: movie.credits?.cast.slice(0, 8).map((member: any) => ({
        id: `${member.id}`,
        name: member.name,
        role: member.character,
        imageUrl: `${process.env.TMDB_IMG_BASE_URL}/w45${member.profile_path}`,
      })),
      recommendations: movie.recommendations?.results
        .slice(0, 5)
        .map((recommended: any) => ({
          id: `${recommended.id}`,
          title: recommended.title,
          posterUrl: `${process.env.TMDB_IMG_BASE_URL}/w342${recommended.poster_path}`,
          releaseDate: recommended.release_date?.split("-")[0],
          rating: ((recommended.vote_average || 0) / 10) * 5,
        })),
    };

    return res.status(200).json(details);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

export default handler;
