import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export default function ListeCourses() {
  const [nomNouvelleListe, setNomNouvelleListe] = useState("");
  const [listes, setListes] = useState([]);
  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client?.id;

  // Charger les listes existantes du client
  useEffect(() => {
    if (!clientId) return;
    fetch(`http://localhost:8080/listesCourses/client/${clientId}`)
      .then((res) => res.json())
      .then((data) => setListes(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des listes :", err)
      );
  }, [clientId]);

  const handleCreerListe = (e) => {
    e.preventDefault();

    if (!nomNouvelleListe.trim()) {
      alert("Veuillez entrer un nom pour la liste.");
      return;
    }

    fetch("http://localhost:8080/listesCourses/creer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientId, nom: nomNouvelleListe }),
    })
      .then((res) => res.json())
      .then((nouvelleListe) => {
        setListes((prev) => [...prev, nouvelleListe]);
        setNomNouvelleListe("");
      })
      .catch((err) =>
        console.error("Erreur lors de la création de la liste :", err)
      );
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Mes Listes de Courses</h2>

      <Form onSubmit={handleCreerListe} className="mb-4">
        <Row className="align-items-center">
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Nom de la nouvelle liste"
              value={nomNouvelleListe}
              onChange={(e) => setNomNouvelleListe(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Button type="submit" className="w-100">
              Créer une liste
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {listes.map((liste) => (
          <Col key={liste.id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{liste.nom}</Card.Title>
                <Button variant="outline-primary" className="mt-2 w-100">
                  Voir les produits
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}