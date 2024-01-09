import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ResultadoBusqueda = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [showMovies, setShowMovie] = useState(false);

  // URL del script PHP
  const URL = 'http://localhost/ApiPeticion.php';

  const fetchData = async (searchTerm) => {
    try {
      const response = await fetch(`${URL}?search=${searchTerm}`);
      const data = await response.json();
      console.log(data);
      setMovies(data); // Actualiza el estado con los datos recibidos del servidor PHP
      setShowMovie(true);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    setSearch(searchTerm);
    if (searchTerm) {
      fetchData(searchTerm);
    }
  }, [location.search]);

  return (
    <div className="container">
      <h4>Resultados de la búsqueda</h4>
      <div className="card-container">
        {showMovies &&
          movies.map((movie, index) => (
            <div className="card" key={index}>
              {/*<img src={movie.poster_url} alt={movie.title} className="card-img-top" />*/}
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">Año de lanzamiento: {movie.release_year}</p>
                <p className="card-text">ID: {movie.id}</p>
                <p className="card-text">Votos: {movie.vote_average}</p>
                {/*<p className="card-text">{movie.overview}</p>*/}
                <Link
  to={`/detalles/${movie.id}`} // Utiliza la ruta correcta para detalles de película
  state={{ movieDetails: movie }}
  className="btn btn-primary"
>
  Ver Detalles
</Link>
              </div>
            </div>
          ))}
      </div>
      <div className="boton">
        <Link to="/" className="btn btn-primary" role="button">
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
};

export default ResultadoBusqueda;
