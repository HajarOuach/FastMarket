import React from 'react';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
  return (
    <header className="py-3 border-bottom bg-white">
      <Container fluid>
        <Row className="align-items-center g-0">
          {/* LOGO + TOGGLER */}
          <Col xs={6} lg={2} className="d-flex align-items-center gap-3">
            <img
              src="images/LogoMarket2 (2).png"
              alt="FastMarket Logo"
              style={{ maxHeight: 120 }}
              className="img-fluid"
            />
            <button className="btn p-0 border-0 d-lg-none" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <use xlinkHref="#menu" />
              </svg>
            </button>
          </Col>

          {/* SEARCH BAR */}
          <Col xs={12} md={6} lg={5} className="my-2 my-lg-0">
            <Form className="d-flex bg-light rounded-4 p-2">
              <Form.Select className="border-0 bg-transparent" style={{ maxWidth: 150 }}>
                <option>Categories</option>
                <option>Groceries</option>
                <option>Drinks</option>
              </Form.Select>
              <FormControl
                type="search"
                placeholder="Rechercher article"
                className="me-2 border-0 bg-transparent"
              />
              <Button variant="link" className="p-0">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
                  />
                </svg>
              </Button>
            </Form>
          </Col>

          {/* NAV LINKS */}
          <Col lg={3} className="d-none d-lg-flex justify-content-center gap-4 fw-bold text-uppercase">
            <a href="#" className="text-dark text-decoration-none">Home</a>
            <div className="dropdown">
              <a
                className="text-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#pages"
              >
                Pages
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#about">About</a></li>
                <li><a className="dropdown-item" href="#shop">Shop</a></li>
              </ul>
            </div>
          </Col>

          {/* ICONS */}
          <Col xs={6} lg={2} className="d-flex justify-content-end gap-3 align-items-center">
            <a href="#" className="text-dark text-decoration-none">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 12a5 5 0 1 0 0-10a5 5 0 0 0 0 10Zm0 2c-3.3 0-6 2.7-6 6h2a4 4 0 0 1 8 0h2c0-3.3-2.7-6-6-6Z"
                />
              </svg>
            </a>
            <a href="#" className="text-dark text-decoration-none">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.5 2.09C12.09 5.01 13.76 4 15.5 4C18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
                />
              </svg>
            </a>
            <a href="#" className="text-dark text-decoration-none">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6 2h12a1 1 0 0 1 1 1v3H5V3a1 1 0 0 1 1-1Zm0 6h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8Zm3 2v2h2v-2H9Zm4 0v2h2v-2h-2Z"
                />
              </svg>
            </a>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
