import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const REGIONS = [
  "Argentina", "Austrália", "Brasil", "Canadá", "China", "França", "Alemanha", "Índia",
  "Indonésia", "Itália", "Japão", "México", "Rússia", "Arábia Saudita", "África do Sul",
  "Coreia do Sul", "Turquia", "Reino Unido", "Estados Unidos", "União Europeia"
];

const PRODUCT_TYPES = [
  "Servidor Rackmount",
  "Servidor Blade",
  "Storage Corporativo",
  "Switch Gerenciado",
  "Firewall de Próxima Geração",
  "Infraestrutura Hiperconvergente"
];

export default function ChangeProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    region: "",
    department: "",
    productType: ""
  });

  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // On mount, read url params and fill formData
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    setFormData({
      productName: queryParams.get("productName") || "",
      price: queryParams.get("price") || "",
      region: queryParams.get("region") || "",
      department: queryParams.get("department") || "",
      productType: queryParams.get("productType") || ""
    });
  }, [location.search]);

  const validate = () => {
    const newErrors = {};

    if (!formData.productName) {
      newErrors.productName = "Nome do produto é obrigatório.";
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.productName)) {
      newErrors.productName = "O nome deve conter apenas letras, números e espaços.";
    }

    if (!formData.price) {
      newErrors.price = "Preço é obrigatório.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.price)) {
      newErrors.price = "Digite um valor decimal válido.";
    }

    if (!formData.region) {
      newErrors.region = "Região é obrigatória.";
    }

    if (!formData.department) {
      newErrors.department = "Nome do departamento é obrigatório.";
    } else if (formData.department.length < 3) {
      newErrors.department = "O nome do departamento deve ter ao menos 3 caracteres.";
    }

    if (!formData.productType) {
      newErrors.productType = "Tipo de produto é obrigatório.";
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
      // Search product by productName
      const response = await fetch(`http://localhost:5000/prods?productName=${encodeURIComponent(formData.productName)}`);
      const data = await response.json();

      if (!data.length) {
        alert("Produto não encontrado para alteração.");
        return;
      }

      const productId = data[0].id;

      const updateResponse = await fetch(`http://localhost:5000/prods/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });

      if (updateResponse.ok) {
        setSubmitSuccess(true);
        setErrors({});
      } else {
        setSubmitSuccess(false);
        alert("Erro ao alterar o produto.");
      }
    } catch (error) {
      setSubmitSuccess(false);
      alert("Erro ao alterar o produto.");
    }
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded bg-light" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center text-warning fw-bold">Alterar Produto</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="productName" className="form-label">Nome do Produto</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Digite o nome do produto"
            />
            {errors.productName && <div className="text-danger mt-1">{errors.productName}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="price" className="form-label">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Digite o preço"
            />
            {errors.price && <div className="text-danger mt-1">{errors.price}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="region" className="form-label">Região</label>
            <select
              className="form-select"
              id="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">Selecione a região</option>
              {REGIONS.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            {errors.region && <div className="text-danger mt-1">{errors.region}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="department" className="form-label">Departamento</label>
            <input
              type="text"
              className="form-control"
              id="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Digite o departamento"
            />
            {errors.department && <div className="text-danger mt-1">{errors.department}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="productType" className="form-label">Tipo de Produto</label>
            <select
              className="form-select"
              id="productType"
              value={formData.productType}
              onChange={handleChange}
            >
              <option value="">Selecione o tipo</option>
              {PRODUCT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.productType && <div className="text-danger mt-1">{errors.productType}</div>}
          </div>
        </div>

        <button type="submit" className="btn btn-warning w-100 mt-4">Salvar Alterações</button>

        {submitSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Produto alterado com sucesso!
          </div>
        )}
      </form>

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/main")}>Voltar ao Menu</button>
      </div>
    </div>
  );
}
