import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetallesPokemon = () => {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        // Manejo de errores
        console.error("Error fetching Pokemon details: ", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  return (
    <div className="pokemon-details">
      <h2>{pokemonName}</h2>
      {pokemonDetails ? (
        <div>
            <img src={pokemonDetails.sprites.front_default} alt = {pokemonDetails.name} />
            <p>ID: {pokemonDetails.id}</p>
            <p>Altura: {pokemonDetails.height}</p>
        </div>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </div>
  );
};

export default DetallesPokemon;