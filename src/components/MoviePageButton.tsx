import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface MoviePageButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

const MoviePageButton: React.FC<MoviePageButtonProps> = ({
  onPress,
  title = "Siguiente Página",
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MoviePageButton;
