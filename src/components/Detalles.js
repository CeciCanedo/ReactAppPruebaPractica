import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detalles = () => {
  const { pokemonName } = useParams();
  const [detalles, setDetalles] = useState(null);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setDetalles(data);
      } catch (error) {
        // Manejo de errores
        console.error("Error fetching details: ", error);
      }
    };

    fetchDetalles();
  }, [pokemonName]);

  return (
    <div className="pokemon-details">
      <h2>{pokemonName}</h2>
      {detalles ? (
        <div>
            <img src={detalles.sprites.front_default} alt = {detalles.name} />
            <p>ID: {detalles.id}</p>
            <p>Altura: {detalles.height}</p>
        </div>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </div>
    
  );
};

export default Detalles;