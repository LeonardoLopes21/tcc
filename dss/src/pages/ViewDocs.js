import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function ViewDocs() {
  const [docs, setDocs] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchDocs = async () => {
    try {
      const response = await fetch('http://localhost:5000/docs');
      const data = await response.json();
      setDocs(data);
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/docs/${id}`, {
        method: 'DELETE'
      });
      setConfirmDeleteId(null);
      fetchDocs();
    } catch (error) {
      console.error("Erro ao deletar documento:", error);
    }
  };

  const handleEdit = (doc) => {
    const queryParams = new URLSearchParams({
      documentName: doc.documentName,
      documentFormat: doc.documentFormat,
      reportId: doc.reportId,
      documentRegion: doc.documentRegion,
      departmentName: doc.departmentName,
      documentType: doc.documentType
    }).toString();
    navigate(`/changedoc?${queryParams}`);
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded bg-light">
      <h2 className="mb-4 text-center text-dark fw-bold">Documentos Armazenados</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nome do Documento</th>
              <th>Formato</th>
              <th>ID do Relatório</th>
              <th>Região</th>
              <th>Nome do Departamento</th>
              <th>Tipo do Documento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.documentName}</td>
                <td>{doc.documentFormat}</td>
                <td>{doc.reportId}</td>
                <td>{doc.documentRegion}</td>
                <td>{doc.departmentName}</td>
                <td>{doc.documentType}</td>
                <td>
                  <div className="d-flex flex-column gap-2">
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleEdit(doc)}
                    >
                      Alterar
                    </button>
                    {confirmDeleteId === doc.id ? (
                      <div className="d-flex flex-column gap-2">
                        <span className="text-danger">Confirmar exclusão?</span>
                        <div className="d-flex gap-1">
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc.id)}>Sim</button>
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => setConfirmDeleteId(null)}>Não</button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => setConfirmDeleteId(doc.id)}
                      >
                        Deletar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-dark" onClick={() => navigate("/main")}>Voltar ao Menu</button>
      </div>
    </div>
  );
}
