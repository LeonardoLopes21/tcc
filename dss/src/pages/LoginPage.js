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
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const formatCpf = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    let formatted = '';
    for (let i = 0; i < digits.length; i++) {
      if (i === 3 || i === 6) formatted += '.';
      if (i === 9) formatted += '-';
      formatted += digits[i];
    }
    return formatted;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    if (id === 'cpf') {
      newValue = formatCpf(value);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: newValue
    }));
  };

  const validateForm = async () => {
    const errors = [];

    const response = await fetch('http://localhost:5000/users');
    if (!response.ok) {
      errors.push("Erro ao verificar dados no servidor.");
      return errors;
    }

    const users = await response.json();

    const emailExists = users.some(u => u.email === formData.email);
    const cpfExists = users.some(u => u.cpf === formData.cpf);
    const nomeCurto = formData.nome.trim().length < 4;
    const sobrenomeCurto = formData.sobrenome.trim().length < 4;
    const nascimentoValido = new Date(formData.nascimento) >= new Date("1940-01-01");

    if (emailExists) errors.push("Este email já está cadastrado.");
    if (cpfExists) errors.push("Este CPF já está cadastrado.");
    if (nomeCurto && sobrenomeCurto) errors.push("Nome e sobrenome devem ter pelo menos 4 caracteres.");
    if (!nascimentoValido) errors.push("Por favor insira uma data de nascimento válida.");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);

    if (modoCadastro) {
      const validationErrors = await validateForm();

      if (validationErrors.length > 0) {
        setErrorMessages(validationErrors);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setModoCadastro(false);
          setFormData({
            email: '',
            senha: '',
            nome: '',
            sobrenome: '',
            cpf: '',
            nascimento: '',
            endereco: ''
          });
        } else {
          setErrorMessages(["Erro ao criar conta."]);
        }
      } catch (error) {
        console.error('Erro ao criar conta:', error);
        setErrorMessages(["Erro ao criar conta."]);
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/users');

        if (!response.ok) {
          setErrorMessages(["Erro ao buscar usuários. Tente novamente mais tarde."]);
          return;
        }

        const users = await response.json();

        const user = users.find(
          (user) => user.email === formData.email && user.senha === formData.senha
        );

        if (user) {
          localStorage.setItem('isLogged', 'true');
          navigate("/");
        } else {
          setErrorMessages(["Email ou senha incorretos."]);
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
        setErrorMessages(["Erro inesperado. Tente novamente mais tarde."]);
      }
    }
  };

  return (
    <div className="container mt-5 p-4 shadow-lg rounded" style={{ maxWidth: "500px", backgroundColor: "#f8f9fa" }}>
      <h2 className="mb-4 text-center text-primary fw-bold">
        {modoCadastro ? "Criar Conta" : "Login"}
      </h2>

      {errorMessages.length > 0 && (
        <div id="warningMessage" className="alert alert-danger">
          <ul className="mb-0">
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

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

        <button type="submit" id="finalizeButton" className={`btn w-100 ${modoCadastro ? 'btn-success' : 'btn-primary'}`}>
          {modoCadastro ? "Criar Conta" : "Entrar"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button
          className="btn btn-warning w-100"
          id="backButton"
          onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>

      <div className="text-center mt-3">
        <button
          className="btn btn-outline-secondary"
          id="switchPerspective"
          onClick={() => {
            setModoCadastro(!modoCadastro);
            setErrorMessages([]);
          }}>
          {modoCadastro ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
        </button>
      </div>
    </div>
  );
}
