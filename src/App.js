import './App.css';
import PrincipalPage from './components/PrincipalPage';
import ResultadoBusqueda from './components/ResultadoBusqueda';
import Detalles from "./components/Detalles";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    
    <Router>
      <div className="pagina container-fluid" style={{ backgroundColor: '#0F1022' }}>
     
        <h1 className='titulo text-center large'>Movie Search</h1>
        <Routes>
          <Route path="/" element={<PrincipalPage />} />
          <Route path="/resultadoBusqueda" element={<ResultadoBusqueda />} />
          <Route path="/detalles/:id" element={<Detalles />}/>
          
        </Routes>

      </div>
    </Router>
    
  );
}

export default App;
