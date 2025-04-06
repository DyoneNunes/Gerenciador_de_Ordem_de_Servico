// src/pages/EditOrder.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function EditOrder() {
  const { numeroChamado } = useParams();
  const navigate = useNavigate();
  const [ordem, setOrdem] = useState(null);

  useEffect(() => {
    const ordens = JSON.parse(localStorage.getItem('ordensServico')) || [];
    const encontrada = ordens.find(os => os.numeroChamado === numeroChamado);
    setOrdem(encontrada);
  }, [numeroChamado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrdem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ordens = JSON.parse(localStorage.getItem('ordensServico')) || [];
    const atualizadas = ordens.map(os => os.numeroChamado === numeroChamado ? ordem : os);
    localStorage.setItem('ordensServico', JSON.stringify(atualizadas));
    alert('Ordem de serviço atualizada com sucesso!');
    navigate('/lista-os');
  };

  if (!ordem) return <div>Carregando...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Navbar />
      <h1>Editar Ordem de Serviço</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          name="cliente"
          placeholder="Nome do Cliente"
          value={ordem.cliente}
          onChange={handleChange}
          required
        />
        <select
          name="tipoMaquina"
          value={ordem.tipoMaquina}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o Tipo de Máquina</option>
          <option value="Celular">Celular</option>
          <option value="Desktop">Desktop</option>
          <option value="Notebook">Notebook</option>
          <option value="Tablet">Tablet</option>
        </select>
        <input
          name="numeroSerie"
          placeholder="Número de Série"
          value={ordem.numeroSerie}
          onChange={handleChange}
        />
        <textarea
          name="descricao"
          placeholder="Descrição do Problema"
          value={ordem.descricao}
          onChange={handleChange}
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditOrder;

