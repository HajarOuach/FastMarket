import React from 'react';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
  return (
    <header className="py-3 border-bottom bg-white">
      <Container fluid>
        <Row className="align-items-center">
          {/* LOGO + TOGGLER */}
          <Col xs={4} lg={2} className="d-flex align-items-center gap-3 justify-content-start">
            <img src="images/logo.svg" alt="Organic Logo" style={{ height: 32 }} />
            <button className="btn p-0 border-0" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <use xlinkHref="#menu" />
              </svg>
            </button>
          </Col>

          {/* SEARCH BAR */}
          <Col xs={12} md={6} lg={5}>
            <Form className="d-flex bg-light rounded-4 p-2">
              <Form.Select className="border-0 bg-transparent" style={{ maxWidth: 150 }}>
                <option>All Categories</option>
                <option>Groceries</option>
                <option>Drinks</option>
              </Form.Select>
              <FormControl
                type="search"
                placeholder="Search for more than 20,000 products"
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
          <Col md={4} lg={3} className="d-none d-lg-flex justify-content-center gap-4 fw-bold text-uppercase">
            <a href="#home" className="text-dark text-decoration-none">Home</a>
            <div className="dropdown">
              <a className="text-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" href="#pages">
                Pages
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#about">About</a></li>
                <li><a className="dropdown-item" href="#shop">Shop</a></li>
              </ul>
            </div>
          </Col>

          {/* ICONS */}
          <Col xs={4} lg={2} className="d-flex justify-content-end gap-3">
            <a href="#" className="text-dark">
              <svg width="24" height="24"><use xlinkHref="#user" /></svg>
            </a>
            <a href="#" className="text-dark">
              <svg width="24" height="24"><use xlinkHref="#wishlist" /></svg>
            </a>
            <a href="#" className="text-dark">
              <svg width="24" height="24"><use xlinkHref="#shopping-bag" /></svg>
            </a>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
