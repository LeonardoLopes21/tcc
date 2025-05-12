import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    sobrenome: '',
    cpf: '',
    nascimento: '',
    endereco: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modoCadastro) {
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('Conta criada com sucesso!');
          setModoCadastro(false);
        } else {
          alert('Erro ao criar conta');
        }
      } catch (error) {
        console.error('Erro ao criar conta:', error);
        alert('Erro ao criar conta');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/users');
        const users = await response.json();

        const user = users.find(
          (user) => user.email === formData.email && user.senha === formData.senha
        );

        if (user) {
          localStorage.setItem('isLogged', 'true');
          alert('Login bem-sucedido!');
          navigate("/"); 
        } else {
          alert('Email ou senha incorretos');
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
        alert('Erro ao verificar login');
      }
    }
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded" style={{ maxWidth: "500px", backgroundColor: "#f8f9fa" }}>
      <h2 className="mb-4 text-center text-primary fw-bold">
        {modoCadastro ? "Criar Conta" : "Login"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="Digite seu email" 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input 
            type="password" 
            className="form-control" 
            id="senha" 
            value={formData.senha} 
            onChange={handleChange} 
            required 
            placeholder="Digite sua senha" 
          />
        </div>

        {modoCadastro && (
          <>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input 
                type="text" 
                className="form-control" 
                id="nome" 
                value={formData.nome} 
                onChange={handleChange} 
                required 
                placeholder="Seu nome" 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
              <input 
                type="text" 
                className="form-control" 
                id="sobrenome" 
                value={formData.sobrenome} 
                onChange={handleChange} 
                required 
                placeholder="Seu sobrenome" 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">CPF</label>
              <input 
                type="text" 
                className="form-control" 
                id="cpf" 
                value={formData.cpf} 
                onChange={handleChange} 
                required 
                placeholder="Seu CPF" 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nascimento" className="form-label">Data de Nascimento</label>
              <input 
                type="date" 
                className="form-control" 
                id="nascimento" 
                value={formData.nascimento} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="endereco" className="form-label">Endereço</label>
              <input 
                type="text" 
                className="form-control" 
                id="endereco" 
                value={formData.endereco} 
                onChange={handleChange} 
                required 
                placeholder="Seu endereço completo" 
              />
            </div>
          </>
        )}

        {!modoCadastro ? (
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        ) : (
          <button type="submit" className="btn btn-success w-100">Criar Conta</button>
        )}
      </form>

      <div className="text-center mt-3">
        <button
          className="btn btn-warning w-100"
          onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>

      <div className="text-center mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setModoCadastro(!modoCadastro)}
        >
          {modoCadastro ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
        </button>
      </div>
    </div>
  );
}
