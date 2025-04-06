// src/pages/ListaOS.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../index.css';

function ListaOS() {
  const [ordens, setOrdens] = useState([]);
  const [busca, setBusca] = useState('');
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  useEffect(() => {
    const osSalvas = JSON.parse(localStorage.getItem('ordensServico')) || [];
    setOrdens(osSalvas);
  }, []);

  const removerOS = (numeroChamado) => {
    const atualizadas = ordens.filter(os => os.numeroChamado !== numeroChamado);
    localStorage.setItem('ordensServico', JSON.stringify(atualizadas));
    setOrdens(atualizadas);
  };

  const editarOS = (numeroChamado) => {
    const novaDescricao = prompt('Digite a nova descrição da OS:');
    if (novaDescricao) {
      const atualizadas = ordens.map(os =>
        os.numeroChamado === numeroChamado ? { ...os, descricao: novaDescricao } : os
      );
      localStorage.setItem('ordensServico', JSON.stringify(atualizadas));
      setOrdens(atualizadas);
    }
  };

  const exportarExcel = () => {
    const planilha = XLSX.utils.json_to_sheet(ordensFiltradas.map(({ fotos, ...rest }) => rest));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, planilha, 'OS');
    XLSX.writeFile(wb, 'ordens_filtradas.xlsx');
  };

  const exportarPDF = async () => {
    const doc = new jsPDF();
    doc.text('Ordens de Serviço', 14, 10);

    const margemTopo = 20;
    let y = margemTopo;

    for (const os of ordensFiltradas) {
      doc.setFontSize(10);
      doc.text(`Chamado: ${os.numeroChamado}`, 14, y);
      doc.text(`Cliente: ${os.cliente}`, 14, y + 5);
      doc.text(`Máquina: ${os.tipoMaquina}`, 14, y + 10);
      doc.text(`Série: ${os.numeroSerie}`, 14, y + 15);
      doc.text(`Descrição: ${os.descricao}`, 14, y + 20);

      y += 30;

      if (os.fotos && os.fotos.length > 0) {
        const img = new Image();
        img.src = os.fotos[0];
        await new Promise((resolve) => {
          img.onload = () => {
            doc.addImage(img, 'JPEG', 14, y, 40, 40);
            resolve();
          };
        });
        y += 50;
      }

      if (y > 260) {
        doc.addPage();
        y = margemTopo;
      }
    }

    doc.save('ordens_filtradas.pdf');
  };

  const toggleOrdenacao = () => {
    setOrdemAscendente(!ordemAscendente);
    const ordenadas = [...ordens].sort((a, b) => {
      const nomeA = a.cliente.toLowerCase();
      const nomeB = b.cliente.toLowerCase();
      return ordemAscendente ? nomeA.localeCompare(nomeB) : nomeB.localeCompare(nomeA);
    });
    setOrdens(ordenadas);
  };

  const aplicarFiltros = (os) => {
    const matchBusca = os.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      os.numeroChamado.toLowerCase().includes(busca.toLowerCase());

    const matchTipo = filtroTipo === '' || os.tipoMaquina === filtroTipo;

    const dataOS = new Date(os.data || new Date());
    const matchData = (!dataInicio || new Date(dataInicio) <= dataOS) &&
                      (!dataFim || dataOS <= new Date(dataFim));

    return matchBusca && matchTipo && matchData;
  };

  const limparFiltros = () => {
    setBusca('');
    setFiltroTipo('');
    setDataInicio('');
    setDataFim('');
  };

  const ordensFiltradas = ordens.filter(aplicarFiltros);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const ordensPaginadas = ordensFiltradas.slice(indiceInicial, indiceInicial + itensPorPagina);
  const totalPaginas = Math.ceil(ordensFiltradas.length / itensPorPagina);

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Navbar />
      <h1>Lista de Ordens de Serviço</h1>

      <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por cliente ou número de chamado"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Todos os tipos</option>
          <option value="Celular">Celular</option>
          <option value="Desktop">Desktop</option>
          <option value="Notebook">Notebook</option>
          <option value="Tablet">Tablet</option>
        </select>

        <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        <button onClick={limparFiltros}>Limpar Filtros</button>
      </div>

      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <button onClick={exportarExcel}>Exportar Excel</button>
        <button onClick={exportarPDF} style={{ marginLeft: '10px' }}>Exportar PDF</button>
        <button onClick={toggleOrdenacao} style={{ marginLeft: '10px' }}>
          Ordenar por Cliente ({ordemAscendente ? 'A-Z' : 'Z-A'})
        </button>
      </div>

      <ul>
        {ordensPaginadas.map((os, idx) => (
          <li key={idx}>
            <strong>{os.numeroChamado}</strong> - {os.cliente} ({os.tipoMaquina})
            <p>Série: {os.numeroSerie}</p>
            <p>{os.descricao}</p>
            {os.fotos && os.fotos.map((url, i) => (
              <img key={i} src={url} alt="foto" style={{ width: '100px', marginRight: '5px' }} />
            ))}
            <br />
            <button onClick={() => editarOS(os.numeroChamado)}>Editar</button>
            <button onClick={() => removerOS(os.numeroChamado)} style={{ marginLeft: '10px' }}>Remover</button>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1} style={{ marginRight: '10px' }}>
          Anterior
        </button>

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

        <button onClick={irParaProximaPagina} disabled={paginaAtual === totalPaginas} style={{ marginLeft: '10px' }}>
          Próxima
        </button>
      </div>
    </div>
  );
}

export default ListaOS;