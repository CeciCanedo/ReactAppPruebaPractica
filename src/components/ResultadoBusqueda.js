import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

const ResultadoBusqueda = () => {
    const location = useLocation();
    const[pokemon, setPokemon] = useState([]);
    const[search, setSearch] = useState("");
    const [showTable, setShowTable]= useState(false);

    //Creamos una constante para traer los datos de la API    
    const URL='https://pokeapi.co/api/v2/pokemon?limit=150'

    //Con una funcion que se encarge de las peticiones
    const showData= async() => {
            //Creamos una constante que guarde la respuesta del fetc
            const response= await fetch(URL)
            //Creamos una variable que nos traiga los datos 
            const data = await response.json()
            
            //Obtenemos todos los datos del pokemon
            const pokeDetails= await Promise.all(data.results.map(async (pokeData) => {
                const pokeResponse= await fetch(pokeData.url);
                const pokeDetails= await pokeResponse.json();
                return pokeDetails;
            }))
            //Seteamos los datos
            setPokemon(pokeDetails)
        }
    
        //Creamos la funcion de busqueda    
        useEffect(()=>{
            showData()
        }, [])
    
        useEffect(() => {
            const searchParams = new URLSearchParams(location.search);
            const searchTerm = searchParams.get('search');
            setSearch(searchTerm);
        }, [location.search]);

        useEffect(() => {
            const searcher= (e) => {
                setSearch(e.target.value)
            }
            // Se establece el estado de showTable basado en si hay texto en la búsqueda
            setShowTable(searcher !== "");

        }, []); 
    
        //Creamos el metodo para filtrar la tabla
        //Inicializamos un array vacio que contendra el resultado de la busqueda del usuario
        let results = []
    
        //Establecemos una condicion que se muestre toda la tabla si el usuario no elige un criterio
        if(!search){
           results= pokemon
        } else {
            results=pokemon.filter((data) =>
            data.name.toLowerCase().includes(search.toLocaleLowerCase())
            )
        }

    //Renderizamos
    return (
        <div className="container">
        <h4>Resultados de la búsqueda</h4>
        
        {showTable && (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="tituloTabla">ID</th>
                        <th className="tituloTabla">Nombre</th>
                        <th className="tituloTabla">Foto</th>
                    </tr>
                </thead>         
                <tbody>
                   {results && results.map((pokeDetails) => (
                   <tr key={pokeDetails.name}>                     
                    <td className="datosTabla">{pokeDetails.id}</td>
                    <Link to={{pathname: `/Detalles/${pokeDetails.name}`, state: { pokemonDetails: pokeDetails } }} className="datosTabla" id="nombrePokemon">
                        {pokeDetails.name}
                    </Link>
                    <td className="datosTabla"> <img src={pokeDetails.sprites.front_default} alt = {pokeDetails.name} /> </td>
                   </tr>
                   ))}
                </tbody>   
            </table>            
            )} 

            <div className="boton">
                <Link to="/"className="btn btn-primary" role="button">Volver a Inicio</Link>
            </div>
        </div>
    );

};

export default ResultadoBusqueda;