import './App.css';
import PrincipalPage from './components/PrincipalPage';
import ResultadoBusqueda from './components/ResultadoBusqueda';
import Detalles from "./components/Detalles";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    
    <Router>
      <div className="pagina container-fluid">
        <div className='centrar'>
        <h1 className='titulo text-center large'>Peliculas</h1>
        <Routes>
          <Route path="/" element={<PrincipalPage />} />
          <Route path="/resultadoBusqueda" element={<ResultadoBusqueda />} />
          <Route path="/Detalles/:pokemonName" element={<Detalles />}/>
          
        </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
