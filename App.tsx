import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./src/screens/HomeScreen";
import ChangesScreen from "./src/screens/ChangesScreen";
import { ScreenConfigProvider } from "./src/components/ScreenConfigContext"; // Asegúrate de que la ruta sea correcta

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case "Home":
                return (
                  <Ionicons
                    name={focused ? "film" : "film-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "AnotherHome":
                return (
                  <Ionicons
                    name={focused ? "repeat" : "repeat-outline"}
                    size={size}
                    color={color}
                  />
                );
            }
            return <Ionicons name="bulb-outline" size={size} color={color} />;
          },
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#444444",
        })}
      >
        <Tab.Screen name="Home" options={{ title: "Películas" }}>
          {() => (
            <ScreenConfigProvider
              config={{ height: 300, backgroundColor: "#f5f5f5" }}
            >
              <HomeScreen />
            </ScreenConfigProvider>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AnotherHome"
          options={{ title: "Películas Duplicadas" }}
        >
          {() => (
            <ScreenConfigProvider
              config={{ height: 200, backgroundColor: "#CD5C5C" }}
            >
              <ChangesScreen />
            </ScreenConfigProvider>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
