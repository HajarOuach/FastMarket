import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormControl, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    if (onLogout) onLogout();
    setShowMenu(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setShowMenu(false);
  };

  return (
    <header className="py-2 border-bottom bg-white shadow-sm">
      <Container fluid>
        <Row className="align-items-center gx-3">
          <Col xs={6} lg={2} className="d-flex align-items-center">
            <img
              src="images/LogoMarket2 (2).png"
              alt="FastMarket Logo"
              className="img-fluid"
              style={{ maxHeight: 80 }}
            />
          </Col>

          <Col xs={12} lg={5} className="my-2 my-lg-0">
            <div className="position-relative">
              <Form className="d-flex bg-light rounded-pill px-3 py-2 shadow-sm align-items-center">
                <Form.Select className="border-0 bg-transparent text-dark fw-semibold" style={{ maxWidth: 130 }}>
                  <option>Catégories</option>
                  <option>Pains & Desserts</option>
                  <option>Produits laitiers & Œufs</option>
                  <option>Viandes & Volailles</option>
                  <option>Boissons</option>
                  <option>Surgelés</option>
                  <option>Snacks & Chips</option>
                  <option>Céréales & Petits-déjeuners</option>
                  <option>Hygiène & soins personnels</option>
                  <option>Bio & Santé</option>
                  <option>Bébé & Puériculture</option>
                </Form.Select>
                <FormControl
                  type="search"
                  placeholder="Rechercher article"
                  className="ms-2 border-0 bg-transparent"
                />
              </Form>
            </div>
          </Col>

          <Col lg={3} className="d-none d-lg-flex justify-content-center gap-3 fw-semibold text-uppercase small">
            <Link to="/" className="text-dark text-decoration-none">Home</Link>
            <div className="dropdown">
              <a className="text-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" href="#pages">
                Pages
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#about">Promotions</a></li>
                <li><a className="dropdown-item" href="#shop">Shop</a></li>
              </ul>
            </div>
            <Link to="/catalogue" className="text-dark text-decoration-none">Catalogue</Link>
          </Col>

          <Col xs={6} lg={2} className="d-flex justify-content-end gap-3 align-items-center">
            {/* Icône utilisateur avec menu */}
            <Dropdown show={showMenu} onToggle={() => setShowMenu(!showMenu)}>
              <Dropdown.Toggle variant="light" className="border-0 bg-transparent p-0">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 12a5 5 0 1 0 0-10a5 5 0 0 0 0 10Zm0 2c-3.3 0-6 2.7-6 6h2a4 4 0 0 1 8 0h2c0-3.3-2.7-6-6-6Z" />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                {user ? (
                  <>
                    <Dropdown.ItemText>Bonjour, {user.prenom}</Dropdown.ItemText>
                    <Dropdown.Item onClick={handleLogout}>Se déconnecter</Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item onClick={handleLoginClick}>Se connecter</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Icône coeur */}
            <a href="#" className="text-dark text-decoration-none">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.5 2.09C12.09 5.01 13.76 4 15.5 4C18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
              </svg>
            </a>
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
