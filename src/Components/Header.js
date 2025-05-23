import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormControl, Dropdown } from 'react-bootstrap';

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const isVisiteur = user?.nom === "Visiteur"; // ✅ détection visiteur
  const hasMagasin = user?.magasin || localStorage.getItem("magasin");
  const canAccessHome = !isVisiteur && !!hasMagasin;

  const handleLogout = () => {
    if (onLogout) onLogout();
    setShowMenu(false);
  };

  const handleLoginClick = () => {
    navigate('/');
    setShowMenu(false);
  };

  return (
    <header className="py-2 border-bottom bg-white shadow-sm">
      <Container fluid>
        <Row className="align-items-center gx-3">
          <Col xs={6} lg={2}>
            <img
              src="/images/LogoMarket2 (2).png"
              alt="FastMarket Logo"
              className="img-fluid"
              style={{ maxHeight: 80 }}
            />
          </Col>

          <Col xs={12} lg={5}>
            <Form className="d-flex bg-light rounded-pill px-3 py-2 shadow-sm align-items-center">
              <Form.Select className="border-0 bg-transparent fw-semibold" style={{ maxWidth: 130 }}>
                <option>Catégories</option>
                <option>Fruits & Légumes</option>
                <option>Produits laitiers</option>
                <option>Boissons</option>
              </Form.Select>
              <FormControl
                type="search"
                placeholder="Rechercher article"
                className="ms-2 border-0 bg-transparent"
              />
            </Form>
          </Col>

          <Col lg={3} className="d-none d-lg-flex justify-content-center gap-3 fw-semibold text-uppercase small">
            <Link
              to={canAccessHome ? "/accueil" : "#"}
              className={`text-decoration-none ${canAccessHome ? "text-dark" : "text-secondary disabled"}`}
            >
              Home
            </Link>

            <Link to="/" className="text-dark text-decoration-none">Produits</Link>

            <Link to="/catalogue" className="text-dark text-decoration-none">Catégories</Link>
          </Col>

          <Col xs={6} lg={2} className="d-flex justify-content-end gap-3 align-items-center">
            <Dropdown show={showMenu} onToggle={() => setShowMenu(!showMenu)}>
              <Dropdown.Toggle variant="light" className="border-0 bg-transparent p-0 d-flex align-items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 12a5 5 0 1 0 0-10a5 5 0 0 0 0 10Zm0 2c-3.3 0-6 2.7-6 6h2a4 4 0 0 1 8 0h2c0-3.3-2.7-6-6-6Z" />
                </svg>
                {user?.prenom && (
                  <span className="fw-semibold text-dark">{user.prenom}</span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                {!user || isVisiteur ? (
                  <Dropdown.Item onClick={handleLoginClick}>Se connecter</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={handleLogout}>Se déconnecter</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Link to="/panier" className="text-dark text-decoration-none">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                d="M6 2h12a1 1 0 0 1 1 1v3H5V3a1 1 0 0 1 1-1Zm0 6h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8Zm3 2v2h2v-2H9Zm4 0v2h2v-2h-2Z"
                />
              </svg>
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
