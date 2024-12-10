import { ScrollView, StyleSheet, View, Image } from 'react-native';
import React, { useRef, useCallback } from 'react';
import { Movie } from '../config/entities/Movie';

// Definimos la interfaz para las props que recibirá el componente Slider
interface Movies {
  movies: Movie[];
  height: number; 
  onEndReached: () => void; // Función que se llamará cuando se alcance el final del scroll
}

// Componente funcional Slider
export default function Slider({ movies, height, onEndReached }: Movies) {
  // Crea una referencia para el ScrollView
  const scrollViewRef = useRef<ScrollView>(null);
  // Crea una referencia para controlar si se está cargando más contenido
  const isLoadingRef = useRef(false);

  // Función que maneja el evento de scroll
  const handleScroll = useCallback((event: any) => {
    // Extraemos información del evento de scroll
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    // Verificamos si se ha alcanzado el final del ScrollView
    const isEndReached = contentOffset.x + layoutMeasurement.width >= contentSize.width - 20; // Ajustamos el valor para anticipar el final

    // Si se ha alcanzado el final y no se está cargando más contenido
    if (isEndReached && !isLoadingRef.current) {
      isLoadingRef.current = true; // Decimos que se está cargando 
      onEndReached(); // Llamamos a la función para cargar más películas
    }
  }, [onEndReached]); // Se volverá a llamar cuando se llegue al final del ScrollView

  return (
    <View>
      <ScrollView
        ref={scrollViewRef} // Asignamos la referencia al ScrollView
        style={styles.contenedor}
        horizontal={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={() => { isLoadingRef.current = false; }} // Reseteamos la carga al dejar de hacer scroll y cuando se llega al final
      >
        {movies.map((item) => (
          <Image
            style={styles.imagen}
            key={item.id} // Usamos el id de la película como clave
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster}`, // URL de la imagen de la película
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    height: 300,
  },
  imagen: {
    width: 200,
    margin: 1,
  },
});