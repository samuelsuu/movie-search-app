import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = ({ route }) => {
  // Destructure movieDetails from route.params, but check if route.params is defined
  const { movieDetails } = route.params || {};  // Add a fallback in case route.params is undefined

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No movie details available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{movieDetails.Title}</Text>
      {/* Display movie rating */}
      <Text>Rating: {movieDetails.Rated}</Text>
      <Text>Genre: {movieDetails.Genre}</Text>
      <Text>Actors: {movieDetails.Actors}</Text>
      <Text style={styles.plot}>Plot: {movieDetails.Plot}</Text>
      <Text>Year: {movieDetails.Year}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  plot: {
    lineHeight: 25,
    paddingVertical: 20,
    textAlign: 'justify',
    fontSize: 15,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ProfileScreen;
