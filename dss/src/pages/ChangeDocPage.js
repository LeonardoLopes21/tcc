import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from "react-router-dom";

export default function ChangeDocPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    documentName: "",
    documentFormat: "",
    reportId: "",
    documentRegion: "",
    departmentName: "",
    documentType: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setFormData({
      documentName: queryParams.get("documentName") || "",
      documentFormat: queryParams.get("documentFormat") || "",
      reportId: queryParams.get("reportId") || "",
      documentRegion: queryParams.get("documentRegion") || "",
      departmentName: queryParams.get("departmentName") || "",
      documentType: queryParams.get("documentType") || ""
    });
  }, [location.search]);

  const validate = () => {
    const newErrors = {};
    if (!/^[\w\s]+$/.test(formData.documentName)) newErrors.documentName = "Nome inválido (apenas caracteres alfanuméricos e espaços).";
    if (formData.documentFormat.length < 3) newErrors.documentFormat = "Formato muito curto.";
    if (!formData.reportId || isNaN(formData.reportId)) newErrors.reportId = "ID do relatório inválido.";
    if (!formData.departmentName.trim()) newErrors.departmentName = "Nome do departamento obrigatório.";
    if (!formData.documentRegion) newErrors.documentRegion = "Selecione uma região.";
    if (!formData.documentType) newErrors.documentType = "Selecione um tipo.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`http://localhost:5000/docs?reportId=${formData.reportId}`);
      const docs = await response.json();

      if (docs.length === 0) {
        setErrors({ reportId: "Documento não encontrado para o ID fornecido." });
        return;
      }

      const docId = docs[0].id;

      await fetch(`http://localhost:5000/docs/${docId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      navigate("/main");
    } catch (error) {
      console.error("Erro ao atualizar documento:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded bg-light" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4 text-center text-warning fw-bold">Alterar Documento</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome do Documento</label>
          <input type="text" name="documentName" value={formData.documentName} onChange={handleChange} className="form-control" />
          {errors.documentName && <small className="text-danger">{errors.documentName}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Formato</label>
          <input type="text" name="documentFormat" value={formData.documentFormat} onChange={handleChange} className="form-control" />
          {errors.documentFormat && <small className="text-danger">{errors.documentFormat}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">ID do Relatório</label>
          <input type="number" name="reportId" value={formData.reportId} onChange={handleChange} className="form-control" />
          {errors.reportId && <small className="text-danger">{errors.reportId}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Região</label>
          <select name="documentRegion" value={formData.documentRegion} onChange={handleChange} className="form-select">
            <option value="">Selecione...</option>
            {[
              "Alemanha", "Arábia Saudita", "Argentina", "Austrália", "Brasil", "Canadá", "China", "Coreia do Sul", "Estados Unidos", "França", "Índia", "Indonésia", "Itália", "Japão", "México", "Reino Unido", "Rússia", "África do Sul", "Turquia", "União Europeia"
            ].map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {errors.documentRegion && <small className="text-danger">{errors.documentRegion}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Nome do Departamento</label>
          <input type="text" name="departmentName" value={formData.departmentName} onChange={handleChange} className="form-control" />
          {errors.departmentName && <small className="text-danger">{errors.departmentName}</small>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Tipo de Documento</label>
          <select name="documentType" value={formData.documentType} onChange={handleChange} className="form-select">
            <option value="">Selecione...</option>
            {["Application Guideline", "National Bank Affiliation Certificate", "Extrajudicial Contract", "Letter of Unilateral Permission"].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.documentType && <small className="text-danger">{errors.documentType}</small>}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-warning btn-lg">Alterar Documento</button>
        </div>

        <div className="col-12 text-center mt-3">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/main")}>Voltar ao Menu</button>
        </div>
      </form>
    </div>
  );
}