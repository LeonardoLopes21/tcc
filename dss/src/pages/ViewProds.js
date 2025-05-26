import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function ViewProds() {
  const [prods, setProds] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchProds = async () => {
    try {
      const response = await fetch('http://localhost:5000/prods');
      const data = await response.json();
      setProds(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProds();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/prods/${id}`, {
        method: 'DELETE'
      });
      setConfirmDeleteId(null);
      fetchProds();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleEdit = (prod) => {
    const queryParams = new URLSearchParams({
      productName: prod.productName,
      productId: prod.id,
      price: prod.price,
      region: prod.region,
      department: prod.department,
      productType: prod.productType
    }).toString();
    navigate(`/changeProd?${queryParams}`);
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded bg-light">
      <h2 className="mb-4 text-center text-dark fw-bold">Produtos Cadastrados</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nome do Produto</th>
              <th>ID do Produto</th>
              <th>Preço (R$)</th>
              <th>Região</th>
              <th>Departamento</th>
              <th>Tipo do Produto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {prods.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.productName}</td>
                <td>{prod.id}</td> 
                <td>{prod.price}</td>
                <td>{prod.region}</td>
                <td>{prod.department}</td>
                <td>{prod.productType}</td>
                <td>
                  <div className="d-flex flex-column gap-2">
                    <button 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleEdit(prod)}
                    >
                      Alterar
                    </button>
                    {confirmDeleteId === prod.id ? (
                      <div className="d-flex flex-column gap-2">
                        <span className="text-danger">Confirmar exclusão?</span>
                        <div className="d-flex gap-1">
                          <button id={"confirmdelete" + prod.id} className="btn btn-danger btn-sm" onClick={() => handleDelete(prod.id)}>Sim</button>
                          <button className="btn btn-outline-secondary btn-sm" onClick={() => setConfirmDeleteId(null)}>Não</button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        className="btn btn-outline-danger btn-sm" id={"delete" + prod.id}
                        onClick={() => setConfirmDeleteId(prod.id)}
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
