import React from "react";
import { useLocation } from "react-router-dom";

const Detalles = () => {
  const location = useLocation();
  console.log(location.state);

  const movie = location.state && location.state.movieDetails;

  if (!movie) {
    return <div>No se encontraron detalles de la película.</div>;
  }

  return (
    <div className="container">
      <h4 className="titulo">Detalles de la Película: {movie.title}</h4>
      
      <div className="card">
        
        <div className="card-body cardContent">

          <h5 className="card-title">{movie.title}</h5>
          <img src={movie.poster_url} alt={movie.title} className="card-img-top" />
          <p className="card-text">Resumen: {movie.overview}</p>
          <p className="card-text">Año de lanzamiento: {movie.release_year}</p>
          <p className="card-text">Calificación: {movie.vote_average}</p>
          <p className="card-text">Genero (id): {movie.genre_ids}</p>

        </div>
      </div>
    </div>
  );
};

export default Detalles;
