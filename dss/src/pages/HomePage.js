import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Carrousel from "../components/Carrousel";

export default function HomePage() {
  const navigate = useNavigate();

  const handleComecarAgoraClick = () => {
    let isLogged = localStorage.getItem('isLogged');

    if (isLogged === 'true') {
      navigate('/main');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <div className="container py-5">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold">Sistema de Armazenamento de Dados (DSS)</h1>
          <p className="lead">
            Armazenamento em nuvem seguro, confiável e escalável para empresas e indivíduos.
          </p>
        </header>

        <main className="row text-center g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <i className="bi bi-cloud h1 text-primary"></i>
                <h5 className="card-title mt-3">Acesso à Nuvem</h5>
                <p className="card-text">
                  Acesse seus dados de qualquer lugar do mundo com nossa infraestrutura robusta de nuvem.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <i className="bi bi-hdd-stack h1 text-success"></i>
                <h5 className="card-title mt-3">Armazenamento Escalável</h5>
                <p className="card-text">
                  Escalone dinamicamente suas necessidades de armazenamento conforme seus dados crescem sem interrupções.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <i className="bi bi-shield-check h1 text-warning"></i>
                <h5 className="card-title mt-3">Segurança de Alto Nível</h5>
                <p className="card-text">
                  Seus dados estão protegidos com criptografia de ponta e padrões de conformidade líderes de mercado.
                </p>
              </div>
            </div>
          </div>
        </main>

        <div className="text-center mt-5">
          <button 
            className="btn btn-primary btn-lg" 
            onClick={handleComecarAgoraClick}>
            Crie seu primeiro documento!
          </button>
        </div>
      </div>
    </>
  );
}
