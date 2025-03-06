import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tarjeta.css';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWM1NzZjNjBmN2I1MjRlYzFmNDY0OTQ5MTVkMzAzNyIsIm5iZiI6MTc0MTI4MjI1NS4yODgsInN1YiI6IjY3YzlkYmNmMDFhMjRiMzhlNTAzNWY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.htRIcCjbSpkk7LeBOtdoTCwIadz9ITnWYiY8p42lGKA';
const BASE_URL = 'https://api.themoviedb.org/3';


const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + API_KEY
  }
};

const tarjeta = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
        const response = await axios.get(`${BASE_URL}/movie/changes?page=1`, options);
        const movieIds = response.data.results.map(movie => movie.id);

        
        const moviesDetails = await Promise.all(
          movieIds.map(async (id) => {
            const movieResponse = await axios.get(`${BASE_URL}/movie/${id}?language=en-US`, options);
            return movieResponse.data;
          })
        );
        console.log(moviesDetails);
        setMovies(moviesDetails);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='container'>
     <div className="category-left">
        <h2 className='letra'> Las Más Vistas</h2>
        <input type="text" placeholder="Buscar..."/>
        <div className="movies-grid">
          {movies.slice(2,4).map((movie) => (
            <div key={movie.id} className="movie-card">
              <img 
                src={movie.original_title ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'} 
                alt={movie.title} 
              />
              <h2>{movie.title}</h2>
              <p>{movie.overview ? movie.overview : 'No hay descripción disponible.'}</p>
            </div>
          ))}
        </div>
      </div>

    
    <div className="movies-container">
      <h1> Películas Recientes</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img 
                src={movie.original_title ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'} 
                alt={movie.title} 
              />
              <h2>{movie.title}</h2>
              <p>{movie.overview ? movie.overview : 'No hay descripción disponible.'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default tarjeta;
