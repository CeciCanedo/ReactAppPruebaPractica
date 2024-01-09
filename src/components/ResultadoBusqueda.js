import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ResultadoBusqueda = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [showMovies, setShowMovie] = useState(false);

  // URL del script PHP
  const URL = 'http://localhost/ApiPeticion.php';

  //hacemos el fetch pasando como parametro el searchTerm que el usuario escribio en la barra de busqueda
  const fetchData = async (searchTerm) => {
    try {
      const response = await fetch(`${URL}?search=${searchTerm}`);
      const data = await response.json();
      //confirmamos que los datos se estan recibiendo correctamente
      console.log(data);
      // Actualiza el estado con los datos recibidos del servidor PHP
      setMovies(data); 
      setShowMovie(true);
      //Manejamos los errores si llegan a existir
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  
  useEffect(() => {
    //Hacemos la consulta con el search del usuario
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    setSearch(searchTerm);
    //confirmamos que exista un valor en searchTerm
    if (searchTerm) {
      //Hacemos la solicitud 
      fetchData(searchTerm);
    }
  }, [location.search]);


  //Renderizamos la pagina
  return (
    <div className="container">
      <h4 className="titulo">Resultados de la búsqueda</h4>
      
      <div className="row">
        {showMovies && movies.map((movie, index) => (

            <div className="col-md-4 mb-4" key={index}>

              <div className="card">

                <div className="card-body cardContent">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">Año de lanzamiento: {movie.release_year}</p>
                  <p className="card-text">Votos: {movie.vote_average}</p>

                  <Link to={`/detalles/${movie.id}`} state={{ movieDetails: movie }} className="btn btn-primary">
                    Ver Detalles
                  </Link>

                </div>
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
