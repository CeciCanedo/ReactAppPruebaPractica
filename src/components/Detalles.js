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
      <h4>Detalles de la Película: {movie.title}</h4>
      <div className="card">
        <img src={movie.poster_url} alt={movie.title} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">Resumen: {movie.overview}</p>
          <p className="card-text">Año de lanzamiento: {movie.release_year}</p>
          <p className="card-text">ID: {movie.id}</p>
          <p className="card-text">Votos: {movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
