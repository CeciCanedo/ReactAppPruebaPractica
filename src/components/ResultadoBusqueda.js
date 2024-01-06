import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

const ResultadoBusqueda = () => {
    const location = useLocation();
    const[movie, setMovie] = useState([]);
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
            const detalles= await Promise.all(data.results.map(async (data) => {
                const response= await fetch(data.url);
                const detalles= await response.json();
                return detalles;
            }))
            //Seteamos los datos
            setMovie(detalles)
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
           results= movie
        } else {
            results=movie.filter((data) =>
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
                   {results && results.map((detalles) => (
                   <tr key={detalles.name}>                     
                    <td className="datosTabla">{detalles.id}</td>
                    <Link to={{pathname: `/Detalles/${detalles.name}`, state: { pokemonDetails: detalles } }} className="datosTabla" id="nombrePokemon">
                        {detalles.name}
                    </Link>
                    <td className="datosTabla"> <img src={detalles.sprites.front_default} alt = {detalles.name} /> </td>
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