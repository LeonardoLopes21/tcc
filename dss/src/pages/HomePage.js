import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleComecarAgoraClick = () => {
    const isLogged = localStorage.getItem('isLogged');
    navigate(isLogged === 'true' ? '/main' : '/login');
  };

  return (
    <>
      <div className="container py-5">
        <header className="text-center mb-4">
          <h1 className="display-4 fw-bold text-dark">DSS - Digital Sale's Systems</h1>
          <h5 className="text-muted">Sistemas Digitais de Vendas</h5>
          <p className="lead text-secondary mt-3">
            Plataforma de gestão de produtos tecnológicos para empresas modernas. Escalável, eficiente e segura.
          </p>
        </header>

        <main className="row text-center g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-cart-check h1 text-primary"></i>
                <h5 className="card-title mt-3">Gestão de Produtos</h5>
                <p className="card-text">
                  Organize e catalogue produtos tecnológicos com total controle e visibilidade para seus parceiros B2B.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-server h1 text-success"></i>
                <h5 className="card-title mt-3">Infraestrutura Robusta</h5>
                <p className="card-text">
                  Base sólida para gerenciamento de dados e integração com sistemas ERP e CRMs do mercado.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <i className="bi bi-lock h1 text-warning"></i>
                <h5 className="card-title mt-3">Segurança Corporativa</h5>
                <p className="card-text">
                  Seus dados e transações estão protegidos por protocolos de segurança de nível empresarial.
                </p>
              </div>
            </div>
          </div>
        </main>

        <div className="text-center mt-5">
          <button 
            id="enterButton"
            className="btn btn-primary btn-lg px-4" 
            onClick={handleComecarAgoraClick}
          >
            Acesse sua plataforma de vendas
          </button>
        </div>
      </div>
    </>
  );
}
