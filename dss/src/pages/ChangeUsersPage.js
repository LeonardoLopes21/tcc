import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from "react-router-dom";

export default function ChangeUsersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    senha: "",
    nome: "",
    sobrenome: "",
    cpf: "",
    nascimento: "",
    endereco: ""
  });

  useEffect(() => {
    const initialData = {};
    for (let key of queryParams.keys()) {
      initialData[key] = queryParams.get(key);
    }
    setFormData((prev) => ({ ...prev, ...initialData }));
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/users/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => navigate("/viewusers"))
      .catch((error) => console.error("Erro ao atualizar usuário:", error));
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded" style={{ maxWidth: "700px", backgroundColor: "#f8f9fa" }}>
      <h2 className="mb-4 text-center text-warning fw-bold">Alterar Usuário</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Senha</label>
          <input type="text" className="form-control" name="senha" value={formData.senha} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input type="text" className="form-control" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Sobrenome</label>
          <input type="text" className="form-control" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">CPF</label>
          <input type="text" className="form-control" name="cpf" value={formData.cpf} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Data de Nascimento</label>
          <input type="date" className="form-control" name="nascimento" value={formData.nascimento} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="form-label">Endereço</label>
          <input type="text" className="form-control" name="endereco" value={formData.endereco} onChange={handleChange} required />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-warning btn-lg px-5">Alterar Usuário</button>
        </div>
      </form>
    </div>
  );
}
