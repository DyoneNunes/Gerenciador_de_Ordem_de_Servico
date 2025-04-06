import React from 'react';
import { Link } from 'react-router-dom';

const navStyle = {
  backgroundColor: '#0077cc',
  padding: '10px',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-around'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold'
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link to="/cadastro-os" style={linkStyle}>Cadastro OS</Link>
      <Link to="/lista-os" style={linkStyle}>Lista OS</Link>
      <Link to="/clientes" style={linkStyle}>Clientes</Link>
    </nav>
  );
}

export default Navbar;