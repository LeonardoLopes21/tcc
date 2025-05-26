import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 p-4 shadow-lg rounded" style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}>
      <h2 className="mb-4 text-center text-primary fw-bold">Menu</h2>

      <div className="d-grid gap-3">
        <button className="btn btn-success btn-lg" id="createProd" onClick={() => navigate("/createProd")}>Criar Produto</button>

        <button className="btn btn-primary btn-lg" id="viewProds" onClick={() => navigate("/viewProds")}>Visualizar Produtos</button>

        <button className="btn btn-info btn-lg" id="viewUsersPage" onClick={() => navigate("/viewusers")}>Visualizar Usuários</button>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>Voltar para Início</button>
      </div>
    </div>
  );
}
