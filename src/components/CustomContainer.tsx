import React from "react";
import { View, StyleSheet } from "react-native";
import { useScreenConfig } from "../components/ScreenConfigContext";

interface CustomContainerProps {
  children: React.ReactNode;
}

export default function CustomContainer({ children }: CustomContainerProps) {
  const { height, backgroundColor } = useScreenConfig(); // Obtiene configuración del contexto

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
  },
});
