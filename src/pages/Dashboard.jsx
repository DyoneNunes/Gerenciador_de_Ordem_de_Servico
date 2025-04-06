// src/pages/Dashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';

function Dashboard() {
  const osTotais = JSON.parse(localStorage.getItem('ordensServico')) || [];
  const clientesTotais = JSON.parse(localStorage.getItem('clientes')) || [];

  const totalOS = osTotais.length;
  const totalClientes = clientesTotais.length;
  const osConcluidas = osTotais.filter(os => os.status === 'Concluída').length;
  const osPendentes = totalOS - osConcluidas;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Navbar />
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '20px' }}>
        <div style={boxStyle}>
          <h3>Total de OS</h3>
          <p>{totalOS}</p>
        </div>
        <div style={boxStyle}>
          <h3>OS Concluídas</h3>
          <p>{osConcluidas}</p>
        </div>
        <div style={boxStyle}>
          <h3>OS Pendentes</h3>
          <p>{osPendentes}</p>
        </div>
        <div style={boxStyle}>
          <h3>Total de Clientes</h3>
          <p>{totalClientes}</p>
        </div>
      </div>
    </div>
  );
}

const boxStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '8px',
  margin: '10px',
  width: '200px',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
};

export default Dashboard;