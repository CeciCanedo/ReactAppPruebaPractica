import React, {useState} from "react";
import { Link } from "react-router-dom";

const PrincipalPage= () => {

    //Seteamos el hook useState para la busqueda
    const[search, setSearch] = useState("");
        const searcher= (e) => {
        setSearch(e.target.value)
    }

    
    //Renderizamos la pagina
    return (
        <div className="container">

            <input value={search} onChange={searcher} type="text" placeholder="Buscar Pokemon" className="barra form-control"/>

            <div className="boton">
            <Link to={`/resultadoBusqueda?search=${search}`} className="btn btn-primary" role="button">Buscar</Link>
            </div>

        </div>
    )
}

export default PrincipalPage