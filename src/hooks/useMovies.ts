import { useEffect, useState } from "react";
import { Movie } from "../config/entities/Movie";
import { FilmAdapter } from "../adapter/FilmAdapter";
import ResultMovie from "../config/entities/ResultMovie";

export const useMovies = () => {
  const [nowPlaying, setNowPlaying] = useState<ResultMovie>({
    total: 0,
    page: 0,
    movies: <Movie[]>[],
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMovies = async (page: number) => {
    const movies = await FilmAdapter.getMovies(FilmAdapter.ROUTES.nowPlaying, {
      ...nowPlaying,
      page,
    });
    if (movies != null) {
      console.log(movies);
      setNowPlaying(movies);
      setLoading(true);
    }
  };

  useEffect(() => {
    loadMovies(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage >= nowPlaying.total) {
      setCurrentPage(1);
    } else {
      setCurrentPage((page) => page + 1);
    }
  };

  return {
    nowPlaying,
    loading,
    nextPage,
  };
};
