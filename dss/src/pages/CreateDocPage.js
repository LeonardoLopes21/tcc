import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const G20_RUSSIA = [
  "Argentina", "Austrália", "Brasil", "Canadá", "China", "França", "Alemanha", "Índia","Indonésia", "Itália", "Japão", "México", "Rússia", "Arábia Saudita", "África do Sul",
"Coreia do Sul", "Turquia", "Reino Unido", "Estados Unidos", "União Europeia"

];

const DOC_TYPES = [
  "Application Guideline",
  "National Bank Affiliation Certificate",
  "Extrajudicial Contract",
  "Letter of Unilateral Permission"
];

export default function CreateDocPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documentName: "",
    documentFormat: "",
    reportId: "",
    documentRegion: "",
    departmentName: "",
    documentType: ""
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.documentName) {
      newErrors.documentName = "Nome do documento é obrigatório.";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.documentName)) {
      newErrors.documentName = "Nome do documento deve conter apenas letras, números e espaços.";
    }

    if (!formData.documentFormat) {
      newErrors.documentFormat = "Formato do documento é obrigatório.";
    } else if (formData.documentFormat.length < 3) {
      newErrors.documentFormat = "Formato do documento deve ter pelo menos 3 caracteres.";
    }

    if (!formData.reportId) {
      newErrors.reportId = "ID do relatório é obrigatório.";
    } else if (!/^\d+$/.test(formData.reportId)) {
      newErrors.reportId = "ID do relatório deve conter apenas números.";
    }

    if (!formData.documentRegion) {
      newErrors.documentRegion = "Região do documento é obrigatória.";
    }

    if (!formData.departmentName) {
      newErrors.departmentName = "Nome do departamento é obrigatório.";
    } else if (formData.departmentName.length < 3) {
      newErrors.departmentName = "Nome do departamento deve ter pelo menos 3 caracteres.";
    }

    if (!formData.documentType) {
      newErrors.documentType = "Tipo de documento é obrigatório.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setSubmitSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          reportId: Number(formData.reportId)
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          documentName: "",
          documentFormat: "",
          reportId: "",
          documentRegion: "",
          departmentName: "",
          documentType: ""
        });
        setErrors({});
      } else {
        setSubmitSuccess(false);
        alert("Erro ao salvar o documento.");
      }
    } catch (error) {
      setSubmitSuccess(false);
      alert("Erro ao salvar o documento.");
    }
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded" style={{ maxWidth: "700px", backgroundColor: "#f8f9fa" }}>
      <h2 className="mb-4 text-center text-primary fw-bold">Criar Documento</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="documentName" className="form-label">Nome do Documento</label>
            <input
              type="text"
              className="form-control"
              id="documentName"
              value={formData.documentName}
              onChange={handleChange}
              placeholder="Digite o nome do documento"
            />
            {errors.documentName && (
              <div style={{ color: "red", marginTop: "5px" }}>{errors.documentName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="documentFormat" className="form-label">Formato do Documento</label>
            <input
              type="text"
              className="form-control"
              id="documentFormat"
              value={formData.documentFormat}
              onChange={handleChange}
              placeholder="Ex: PDF, DOCX, TXT"
            />
            {errors.documentFormat && (
              <div style={{ color: "red", marginTop: "5px" }}>{errors.documentFormat}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="reportId" className="form-label">ID do Relatório</label>
            <input
              type="number"
              className="form-control"
              id="reportId"
              value={formData.reportId}
              onChange={handleChange}
              placeholder="Digite o ID do relatório"
            />
            {errors.reportId && (
              <div style={{ color: "red", marginTop: "5px" }}>{errors.reportId}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="documentRegion" className="form-label">Região do Documento</label>
            <select
              className="form-select"
              id="documentRegion"
              value={formData.documentRegion}
              onChange={handleChange}
            >
              <option value="">Selecione a região</option>
              {G20_RUSSIA.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            {errors.documentRegion && (
              <div style={{ color: "red", marginTop: "5px" }}>{errors.documentRegion}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="departmentName" className="form-label">Nome do Departamento</label>
            <input
              type="text"
              className="form-control"
              id="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              placeholder="Digite o nome do departamento"
            />
            {errors.departmentName && (
              <div style={{ color: "red", marginTop: "5px" }}>{errors.departmentName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="documentType" className="form-label">Tipo de Documento</label>
            <select
              className="form-select"
              id="documentType"
              value={formData.documentType}
              onChange={handleChange}
            >
              <option value="">Selecione o tipo</option>
              {DOC_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.documentType && (
              <div style={{ color: "red", marginTop: "5px" }}>{errors.documentType}</div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100 mt-4">Salvar Documento</button>

        {submitSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Documento salvo com sucesso!
          </div>
        )}
      </form>

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/main")}>
          Voltar ao Menu
        </button>
      </div>
    </div>
  );
}
