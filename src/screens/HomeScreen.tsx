import { View, Text } from "react-native";
import React from "react";
import { useMovies } from "../hooks/useMovies";
import Slider from "../components/Slider";
import MoviePageButton from "../components/MoviePageButton";

export default function HomeScreen() {
  const { nowPlaying, loading, nextPage } = useMovies();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Slider movies={nowPlaying.movies} height={100} />
      <MoviePageButton onPress={nextPage} title="Siguiente Página" />
    </View>
  );
}
