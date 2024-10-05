import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

// Your OMDb API key
const apiKey = 'c929301e';

const HomeScreen = () => {
  // State to store the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  // State to store the list of movies returned by the API
  const [movies, setMovies] = useState([]);
  // State to store the details of a selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);
  // State to store error messages (if any)
  const [error, setError] = useState(null);

  // useEffect hook to fetch a default set of movies when the app 
  //loads for the first time
  useEffect(() => {
    fetchDefaultMovies(); // Fetches default movies
  }, []);

  // Function to fetch a default list of movies (like popular or trending ones)
  const fetchDefaultMovies = () => {
    setError(null); // Clear any previous errors

    // API call to fetch movies, using "Batman" as the default search term
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=Ironman`)
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        if (data.Response === 'True') {
          // If the API response is successful, store the list of movies in the 
          //state
          setMovies(data.Search);
        } else {
          // If the API returns an error (like "Movie not found"), 
          // store the error message in the state
          setError(data.Error);
        }
      })
      .catch(() => {
        // If there is a network error or other issue, 
        // set a generic error message
        setError('An error occurred. Please try again.');
      });
  };

  // Function to search for movies based on the search term entered by the user
  const searchMovies = () => {
    setError(null); // Clear any previous errors
    setSelectedMovie(null); // Clear any previously selected movie details

    // API call to search movies based on the user's input (searchTerm)
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
      .then(response => response.json()) // Parse JSON response
      .then(data => {
        if (data.Response === 'True') {
          // If search is successful, update the movies state with the search results
          setMovies(data.Search);
        } else {
          // If search fails (movie not found, etc.), store the error message
          setError(data.Error);
        }
      })
      .catch(() => {
        // If there's a network issue or other errors, show a generic error message
        setError('An error occurred. Please try again.');
      });
  };

  // Function to fetch detailed information about a specific movie based on its IMDb ID
  const getMovieDetails = (imdbID) => {
    setError(null); // Clear previous errors
    setSelectedMovie(null); // Clear previously selected movie

    // API call to fetch movie details using IMDb ID
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then(response => response.json()) // Parse JSON response
     
      .catch(() => {
        // Show a generic error message if something goes wrong
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Input field for entering the movie name to search */}
      <TextInput
        style={styles.input}
        placeholder="Search for movies" // Placeholder text for input field
        value={searchTerm} // Value of the input field bound to searchTerm state
        onChangeText={text => setSearchTerm(text)} // Update searchTerm state when input changes
      />

      {/* Button to trigger the movie search */}
      <Button title="Search Movies" onPress={searchMovies} />

      {/*  .then(data => {
        // Set the selected movie's details if the call is successful
        setSelectedMovie(data);
      })Display an error message if any */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Display the list of movies returned by the API */}
      <View style={styles.resultsContainer}>
        {movies.map(movie => (
          <View key={movie.imdbID} style={styles.movieCard}>
            {/* Display movie poster, or a placeholder image if not available */}
            <Image
              style={styles.poster}
              source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150' }}
            />
            {/* Display the movie title */}
            <Text style={styles.title}>{movie.Title}</Text>
            {/* Display the year the movie was released */}
            <Text style={styles.year}>{movie.Year}</Text>
            {/* Button to view more details about the selected movie */}
            <Button title="View Details" onPress={() => getMovieDetails(movie.imdbID)} />
          </View>
        ))}
      </View>

      {/* Display detailed information about a selected movie */}
      {selectedMovie && (
        <View style={styles.detailsContainer}>
          {/* Movie title */}
          <Text style={styles.detailsTitle}>{selectedMovie.Title}</Text>
          {/* Display genre, cast, and plot of the movie */}
          <Text>Genre: {selectedMovie.Genre}</Text>
          <Text>Cast: {selectedMovie.Actors}</Text>
          <Text>Plot: {selectedMovie.Plot}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  detailsContainer: {
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default HomeScreen;
