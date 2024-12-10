import ResultMovie from "../config/entities/ResultMovie";
import { resultMovieMapper } from "../config/mapper/resultMovieMapper";
import { HttpError } from "./http/HttpError";
import { HttpFactory2 } from "./http/HttpFactory2";


interface DataMovieRequest {
  total: number;
  page: number;
}

export class FilmAdapter {
  static ROUTES = {
    nowPlaying: "/now_playing",
  };

  static async getMovies(
    route: string,
    { total, page }: DataMovieRequest
  ): Promise<ResultMovie | null> {
    const http = HttpFactory2.build();
    if (!Reflect.has(FilmAdapter.ROUTES, route))
      route = FilmAdapter.ROUTES.nowPlaying;
    const movies = await http.getFilms(route, page);
    if (movies instanceof HttpError) return null;
    const dataMovies = resultMovieMapper(movies);
    return dataMovies;
  }
}
