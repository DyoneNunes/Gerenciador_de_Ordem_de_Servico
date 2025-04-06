// src/pages/ListaClientes.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 4;

  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    endereco: '',
    historico: ''
  });

  useEffect(() => {
    const clientesSalvos = JSON.parse(localStorage.getItem('clientes')) || [];
    setClientes(clientesSalvos);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoCliente({ ...novoCliente, [name]: value });
  };

  const salvarCliente = () => {
    const atualizados = [...clientes, novoCliente];
    localStorage.setItem('clientes', JSON.stringify(atualizados));
    setClientes(atualizados);
    setMostrarModal(false);
    setNovoCliente({ nome: '', cpf: '', telefone: '', endereco: '', historico: '' });
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.cpf.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const clientesPaginados = clientesFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Lista de Clientes</h1>

      <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por nome ou CPF"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select>
          <option value="">Todos os tipos</option>
          <option value="Residencial">Residencial</option>
          <option value="Comercial">Comercial</option>
        </select>
        <input type="date" />
        <input type="date" />
        <button onClick={() => setBusca('')}>Limpar Filtros</button>
        <button onClick={() => setMostrarModal(true)}>Novo Cliente</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {clientesPaginados.map((cliente, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>{cliente.nome}</h3>
            <p><strong>CPF:</strong> {cliente.cpf}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>Endereço:</strong> {cliente.endereco}</p>
            <p><strong>Histórico:</strong> {cliente.historico}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1} style={{ marginRight: '10px' }}>Anterior</button>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => setPaginaAtual(num)}
            style={{
              marginRight: '5px',
              fontWeight: paginaAtual === num ? 'bold' : 'normal',
              backgroundColor: paginaAtual === num ? '#007bff' : '#f0f0f0',
              color: paginaAtual === num ? '#fff' : '#000',
              border: '1px solid #ccc',
              padding: '5px 10px'
            }}
          >
            {num}
          </button>
        ))}
        <button onClick={irParaProximaPagina} disabled={paginaAtual === totalPaginas} style={{ marginLeft: '10px' }}>Próxima</button>
      </div>

      {mostrarModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '400px'
            }}
          >
            <h2 style={{ textAlign: 'center' }}>Novo Cliente</h2>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={novoCliente.nome}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={novoCliente.cpf}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
              type="text"
              name="telefone"
              placeholder="Telefone"
              value={novoCliente.telefone}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={novoCliente.endereco}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <textarea
              name="historico"
              placeholder="Histórico de atendimentos"
              value={novoCliente.historico}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '10px' }}
            />

            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setMostrarModal(false)} style={{ marginRight: '10px' }}>
                Cancelar
              </button>
              <button onClick={salvarCliente}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaClientes;
