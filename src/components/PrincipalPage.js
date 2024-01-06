import React, {useState} from "react";
import { Link } from "react-router-dom";

const PrincipalPage= () => {

    //Seteamos el hook useState para la busqueda
    //El valor que el usuario escriba se guardara en la variable search
    const[search, setSearch] = useState("");
        //Creamos una funcion que identifique los cambios de search
        const searcher= (e) => {
        setSearch(e.target.value)
    }

    
    //Renderizamos la pagina
    return (
        <div className="container">
            
            <input value={search} onChange={searcher} type="text" placeholder="Buscar Pelicula" className="barra form-control"/>

            <div className="boton">
            <Link to={`/resultadoBusqueda?search=${search}`} className="btn btn-primary" role="button">Buscar</Link>
            </div>

        </div>
    )
}

export default PrincipalPage