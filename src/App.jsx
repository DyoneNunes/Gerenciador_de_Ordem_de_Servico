import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import CadastroOS from './pages/CadastroOS';
import ListaOS from './pages/ListaOS';
import ListaClientes from './pages/ListaClientes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro-os" element={<CadastroOS />} />
        <Route path="/lista-os" element={<ListaOS />} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/navbar" element={<Navbar />} />


      </Routes>
    </Router>
  );
}

export default App;
