const fetchTmdb = (url: string, query?: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_AUTH_KEY}`,
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/${url}?${
      query ? `${query}&` : ""
    }language=en-US`,
    options
  )
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
};

export default fetchTmdb;
