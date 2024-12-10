import React from "react";
import { View, Text } from "react-native";
import { useScreenConfig } from "../components/ScreenConfigContext";
import Slider from "../components/Slider";
import MoviePageButton from "../components/MoviePageButton";
import { useMovies } from "../hooks/useMovies";

export default function ChangesScreen() {
  const { nowPlaying, loading, nextPage } = useMovies();
  const { height, backgroundColor } = useScreenConfig(); // Utilizamos la clase ScreenConfigContext para obtener la altura y el backgroundcolor
  //En el caso de que las películas no estén cargadas, sale un mensaje de "Cargando películas"
  if (loading) {
    return (
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "#FFFFFF",
            margin: 10,
          }}
        >
          Cargando películas
        </Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          color: "#FFFFFF",
          margin: 10,
        }}
      >
        Películas (Página {nowPlaying.page})
      </Text>
      <Slider
        movies={nowPlaying.movies}
        height={height}
        onEndReached={nextPage}
      />
      <MoviePageButton onPress={nextPage} title="Siguiente Página" />
    </View>
  );
}
