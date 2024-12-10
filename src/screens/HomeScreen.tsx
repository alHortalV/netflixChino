import { View, Text } from "react-native";
import React from "react";
import { useMovies } from "../hooks/useMovies";
import Slider from "../components/Slider";
import MoviePageButton from "../components/MoviePageButton";

export default function HomeScreen() {
  const { nowPlaying, loading, nextPage } = useMovies();
  //En el caso de que las películas no estén cargadas, sale un mensaje de "Cargando películas"
  if (loading)
    return (
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Cargando películas
        </Text>
      </View>
    );
    //He dejado el botón de siguiente página para que haya dos maneras de pasar de página
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Películas (Página {nowPlaying.page})
      </Text>
      <Slider movies={nowPlaying.movies} height={100} onEndReached={nextPage} />
      <MoviePageButton onPress={nextPage} title="Siguiente Página" />
    </View>
  );
}
