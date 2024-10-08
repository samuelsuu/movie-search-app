import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import SplashScreen from './SplashScreen';

// Your OMDb API key
const apiKey = 'c929301e';

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [showSplash, setShowSplash] = useState(true); // Splash initially visible

  // Hide the splash screen after a delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Change the duration if needed

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  // Fetch default movies when component loads
  useEffect(() => {
    if (!showSplash) {
      fetchDefaultMovies();
    }
  }, [showSplash]);

  const fetchDefaultMovies = () => {
    setError(null);

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=Avengers`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setError(data.Error);
        }
      })
      .catch(() => {
        setError('An error occurred. Please try again.');
      });
  };

  const searchMovies = () => {
    setError(null);

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setError(data.Error);
        }
      })
      .catch(() => {
        setError('An error occurred. Please try again.');
      });
  };

  const getMovieDetails = (imdbID) => {
    setError(null);

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then(response => response.json())
      .then(data => {
        navigation.navigate('Detail', { movieDetails: data });
      })
      .catch(() => {
        setError('An error occurred. Please try again.');
      });
  };

  // If the splash screen is visible, return it
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    
    <ScrollView style={styles.container}>
      <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Search for movies"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <Button title="Search Movies" onPress={searchMovies} />
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.resultsContainer}>
        {movies.map(movie => (
          <View key={movie.imdbID} style={styles.movieCard}>
            <Image
              style={styles.poster}
              source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150' }}
            />
            <Text style={styles.title}>{movie.Title}</Text>
            <Text style={styles.year}>{movie.Year}</Text>
            <Button title="View Details" onPress={() => getMovieDetails(movie.imdbID)} />
          </View>
        ))}
      </View>
      </SafeAreaView>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  resultsContainer: {
    marginTop: 20,
    marginBottom: 70,
  },
  movieCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  year: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default HomeScreen;
