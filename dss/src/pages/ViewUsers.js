import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  const handleDelete = (id) => {
    setUsers((prev) => prev.map((user) =>
      user.id === id ? { ...user, confirmingDelete: true } : user
    ));
  };

  const confirmDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Erro ao deletar:", error));
  };

  const cancelDelete = (id) => {
    setUsers((prev) => prev.map((user) =>
      user.id === id ? { ...user, confirmingDelete: false } : user
    ));
  };

  const handleChangeUser = (user) => {
    const queryParams = new URLSearchParams(user).toString();
    navigate(`/changeusers?${queryParams}`);
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded" style={{ backgroundColor: "#f8f9fa" }}>
      <h2 className="mb-4 text-center text-primary fw-bold">Lista de Usuários</h2>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>CPF</th>
              <th>Nascimento</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.senha}</td>
                <td>{user.nome}</td>
                <td>{user.sobrenome}</td>
                <td>{user.cpf}</td>
                <td>{user.nascimento}</td>
                <td>{user.endereco}</td>
                <td>
                  {user.confirmingDelete ? (
                    <>
                      <button id={"confirmdelete" + user.id} className="btn btn-sm btn-danger me-2" onClick={() => confirmDelete(user.id)}>Confirmar</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => cancelDelete(user.id)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleChangeUser(user)}>Alterar</button>
                      <button id={"delete" + user.id} className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Deletar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/main")}>Voltar para o Menu</button>
      </div>
    </div>
  );
}
