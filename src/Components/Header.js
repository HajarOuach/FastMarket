import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Form, FormControl } from 'react-bootstrap';
import SearchBar from './SearchBar'; // ← Import du nouveau composant

function Header({ onLogout }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("client"));
  const isVisiteur = user?.nom === "Visiteur";
  const role = user?.role;
  const magasinId = localStorage.getItem("magasinId") || '';

  const handleLogout = () => {
    if (onLogout) onLogout();
    setShowMenu(false);
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/');
    setShowMenu(false);
  };

  return (
    <header className="py-2 border-bottom bg-white shadow-sm">
      <Container fluid>
        <Row className="align-items-center gx-3">
          {/* ✅ Logo visible pour tout le monde */}
          <Col xs={6} lg={2}>
            <Link to={`/accueil-magasin/${magasinId}`} className="text-decoration-none">
              <img
                src="/images/LogoMarket2 (2).png"
                alt="FastMarket Logo"
                className="img-fluid"
                style={{ maxHeight: 80 }}
              />
            </Link>
          </Col>

          {/* ✅ Barre de recherche pour client et visiteur et gérant */}
          {(role === "client" || role === "gerant" || isVisiteur) && (
            <Col xs={12} lg={4}>
              <Form className="d-flex bg-light rounded-pill px-3 py-2 shadow-sm align-items-center">
                <FormControl
                  type="search"
                  placeholder="Rechercher un article"
                  className="border-0 bg-transparent w-100"
                />
              </Form>
            </Col>
          )}

          {/* ✅ Liens de navigation */}
          {(role === "client" || role === "gerant" || isVisiteur) && (
            <Col lg={4} className="d-none d-lg-flex justify-content-center gap-3 fw-semibold text-uppercase small">
              {/* Client + Visiteur */}
              {(role === "client" || isVisiteur) && (
                <>
                  <Link to={`/accueil-magasin/${magasinId}`} className="text-decoration-none text-dark">
                    Home
                  </Link>
                  <Link to="/catalogue" className="text-dark text-decoration-none">Catégories</Link>
                  <Link to="/liste-courses" className="text-dark text-decoration-none text-nowrap">Liste de courses</Link>
                </>
              )}

              {/* Gérant seulement */}
              {role === "gerant" && (
                <>
                  <Link to="/catalogue" className="text-dark text-decoration-none">Catégories</Link>
                  <Link to="/produits" className="text-dark text-decoration-none text-nowrap">Importer Produits</Link>
                </>
              )}
            </Col>
          )}

          {/* ✅ Profil + Panier */}
          <Col xs={6} lg={10} className="d-flex justify-content-end gap-3 align-items-center">
            <Dropdown show={showMenu} onToggle={() => setShowMenu(!showMenu)} >
              <Dropdown.Toggle
  className="border-0 bg-transparent text-dark p-0 d-flex align-items-center gap-2"
>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 12a5 5 0 1 0 0-10a5 5 0 0 0 0 10Zm0 2c-3.3 0-6 2.7-6 6h2a4 4 0 0 1 8 0h2c0-3.3-2.7-6-6-6Z" />
                </svg>
                {user?.prenom && <span className="fw-semibold text-dark">{user.prenom}</span>}
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                {!user || isVisiteur ? (
                  <Dropdown.Item onClick={handleLoginClick}>Se connecter</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={handleLogout}>Se déconnecter</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* ✅ Panier pour client et visiteur */}
            {(role === "client" || isVisiteur) && (
              <Link to="/panier" className="text-dark text-decoration-none">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M6 2h12a1 1 0 0 1 1 1v3H5V3a1 1 0 0 1 1-1Zm0 6h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8Zm3 2v2h2v-2H9Zm4 0v2h2v-2h-2Z"
                  />
                </svg>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
