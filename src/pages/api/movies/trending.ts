import fetchTmdb from "@/utils/fetchTmdb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { results } = await fetchTmdb("trending/movie/week");

    const top10: Movie[] = results.slice(0, 10).map((movie: any) => ({
      id: `${movie.id}`,
      title: movie.title,
      posterUrl: `${process.env.TMDB_IMG_BASE_URL}/w342${movie.poster_path}`,
      releaseDate: movie.release_date?.split("-")[0],
      rating: ((movie.vote_average || 0) / 10) * 5,
    }));

    return res.status(200).json(top10);
  } catch (error) {
    return res.status(500).send({});
  }
};

export default handler;
