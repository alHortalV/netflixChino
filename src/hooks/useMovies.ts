import { useEffect, useState } from "react";
import { FilmAdapter } from "../adapter/FilmAdapter";
import ResultMovie from "../config/entities/ResultMovie";
import { Movie } from "../config/entities/Movie";

export const useMovies = () => {
  // Estado para almacenar las películas que se están reproduciendo actualmente
  const [nowPlaying, setNowPlaying] = useState<ResultMovie>({
    total: 0,
    page: 0,
    movies: <Movie[]>[],
  });

  // Estado para manejar si han cargado las películas
  const [loading, setLoading] = useState(false);
  // Estado para ver la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Función asíncrona para cargar películas
  const loadMovies = async (page: number) => {
    if (loading) return; // Evita cargar si ya se está cargando
    setLoading(true);

    // Obtenemos el total de las páginas y la página del FilmAdapter
    const movies = await FilmAdapter.getMovies(FilmAdapter.ROUTES.nowPlaying, {
      total: nowPlaying.total,
      page,
    });

    // Si se obtienen películas, actualiza el estado
    if (movies) {
      setNowPlaying((prev) => ({
        ...movies,
        movies: [...prev.movies, ...movies.movies], // Agrega las nuevas películas a las ya existentes
      }));
    } else {
      console.log("Error al cargar las películas");
    }
    setLoading(false); 
  };

  // useEffect para cargar películas cuando cambia la página actual
  useEffect(() => {
    loadMovies(currentPage); // Llama a la función para cargar películas
  }, [currentPage]); // Cuando la página cambia, se vuelve a ejecutar cargando las películas de la página actual

  // Función para cargar la siguiente página de películas
  const nextPage = () => {
    // Verifica que no esté cargando y que haya más páginas para cargar
    if (!loading && currentPage < nowPlaying.total) {
      setCurrentPage((prevPage) => prevPage + 1); //Si hay más páginas, incrementa una
    }
  };

  return {
    nowPlaying,
    loading,
    nextPage,
  };
};