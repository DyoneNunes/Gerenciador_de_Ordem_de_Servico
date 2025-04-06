// src/pages/CadastroOS.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function CadastroOS() {
  const [form, setForm] = useState({
    cliente: '',
    tipoMaquina: '',
    numeroSerie: '',
    descricao: '',
    fotos: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fotos') {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setForm(prev => ({ ...prev, fotos: urls }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numeroChamado = 'OS' + Date.now();
    const novaOS = { ...form, numeroChamado, data: new Date().toISOString() };
    const ordensSalvas = JSON.parse(localStorage.getItem('ordensServico')) || [];
    ordensSalvas.push(novaOS);
    localStorage.setItem('ordensServico', JSON.stringify(ordensSalvas));
    alert('Ordem de Serviço cadastrada com sucesso!');
    setForm({ cliente: '', tipoMaquina: '', numeroSerie: '', descricao: '', fotos: [] });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Navbar />
      <h1>Cadastro de OS</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="cliente" value={form.cliente} onChange={handleChange} placeholder="Nome do Cliente" required />

        <select name="tipoMaquina" value={form.tipoMaquina} onChange={handleChange} required>
          <option value="">Selecione o tipo de máquina</option>
          <option value="Celular">Celular</option>
          <option value="Desktop">Desktop</option>
          <option value="Notebook">Notebook</option>
          <option value="Tablet">Tablet</option>
        </select>

        <input type="text" name="numeroSerie" value={form.numeroSerie} onChange={handleChange} placeholder="Número de Série" required />

        <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição do Problema" required></textarea>

        <input type="file" name="fotos" multiple accept="image/*" onChange={handleChange} />

        <button type="submit">Cadastrar OS</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {form.fotos.map((src, index) => (
          <img key={index} src={src} alt="Pré-visualização" style={{ width: '100px', marginRight: '10px' }} />
        ))}
      </div>
    </div>
  );
}

export default CadastroOS;
