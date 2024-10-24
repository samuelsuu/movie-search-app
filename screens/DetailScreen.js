import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from '../models/ThemeContext'; // Import ThemeContext

const ProfileScreen = ({ route }) => {
  // Destructure movieDetails from route.params
  const { movieDetails } = route.params || {};
  
  // Access isDarkMode from ThemeContext
  const { isDarkMode } = useContext(ThemeContext);

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No movie details available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#FFF' }]}>
      <Image
        style={styles.poster}
        source={{
          uri: movieDetails.Poster !== "N/A" ? movieDetails.Poster : "https://via.placeholder.com/150",
        }}
      />
      <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>{movieDetails.Title}</Text>
      <Text style={{ color: isDarkMode ? '#FFF' : '#000' }}>Rating: {movieDetails.Rated}</Text>
      <Text style={{ color: isDarkMode ? '#FFF' : '#000' }}>Genre: {movieDetails.Genre}</Text>
      <Text style={{ color: isDarkMode ? '#FFF' : '#000' }}>Actors: {movieDetails.Actors}</Text>
      <Text style={[styles.plot, { color: isDarkMode ? '#FFF' : '#000' }]}>Plot: {movieDetails.Plot}</Text>
      <Text style={{ color: isDarkMode ? '#FFF' : '#000' }}>Year: {movieDetails.Year}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  poster: {
    width: 250,
    height: 350,
    marginBottom: 10,
  },
  plot: {
    lineHeight: 25,
    paddingVertical: 20,
    textAlign: "justify",
    fontSize: 15,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ProfileScreen;
