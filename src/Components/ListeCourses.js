import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Toast,
  ToastContainer,
  Card,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";

export default function ListeCourses() {
  const [listes, setListes] = useState([]);
  const [nouvelleListe, setNouvelleListe] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [listeToDelete, setListeToDelete] = useState(null);

  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (clientId) {
      axios
        .get(`http://localhost:8080/listesCourses/client/${clientId}`)
        .then((res) => setListes(res.data))
        .catch((err) => console.error("Erreur récupération des listes :", err));
    }
  }, [clientId]);

  const creerListe = () => {
    if (!nouvelleListe.trim()) return;

    axios
      .post("http://localhost:8080/listesCourses/creer", {
        clientId,
        nom: nouvelleListe,
      })
      .then((res) => {
        setListes((prev) => [res.data, ...prev]);
        setNouvelleListe("");
        showToast("Liste créée !");
      })
      .catch((err) => console.error("Erreur création liste :", err));
  };

  const demanderSuppression = (listeId) => {
    setListeToDelete(listeId);
    setShowConfirmModal(true);
  };

  const confirmerSuppression = () => {
    if (!listeToDelete) return;
    axios
      .delete(`http://localhost:8080/listesCourses/${listeToDelete}`)
      .then(() => {
        setListes((prev) => prev.filter((l) => l.id !== listeToDelete));
        showToast("Liste supprimée !");
      })
      .catch((err) => console.error("Erreur suppression :", err))
      .finally(() => {
        setShowConfirmModal(false);
        setListeToDelete(null);
      });
  };

  const voirDetail = (id) => navigate(`/liste-courses/${id}/details`);

  const startEditing = (liste) => {
    setEditingId(liste.id);
    setEditedName(liste.nom);
  };

  const saveEditedName = (listeId) => {
    if (!editedName.trim()) return;

    axios
      .put(`http://localhost:8080/listesCourses/${listeId}`, {
        nom: editedName,
      })
      .then((res) => {
        setListes((prev) => prev.map((l) => (l.id === listeId ? res.data : l)));
        setEditingId(null);
        setEditedName("");
        showToast("Nom modifié !");
      })
      .catch((err) => console.error("Erreur modification nom :", err));
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary fw-bold">Mes listes de courses</h2>

      <div className="input-group mb-4 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Nom de la nouvelle liste"
          value={nouvelleListe}
          onChange={(e) => setNouvelleListe(e.target.value)}
        />
        <button className="btn btn-success" onClick={creerListe}>
          Créer
        </button>
      </div>

      {listes.length === 0 ? (
        <p className="text-muted text-center">Aucune liste enregistrée.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {listes.map((liste) => (
            <Col key={liste.id}>
              <Card className="h-100 shadow border-0">
                <Card.Body>
                  {editingId === liste.id ? (
                    <>
                      <input
                        className="form-control mb-2"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                      <div className="d-flex justify-content-between">
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => saveEditedName(liste.id)}
                        >
                          Sauvegarder
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => setEditingId(null)}
                        >
                          Annuler
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Card.Title className="fw-semibold text-dark text-center">
                        {liste.nom}
                      </Card.Title>
                      <hr />
                      <div className="d-flex justify-content-around">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => startEditing(liste)}
                        >
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-dark"
                          onClick={() => voirDetail(liste.id)}
                        >
                          Détails
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => demanderSuppression(liste.id)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Toast */}
      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          bg="success"
          show={toastVisible}
          onClose={() => setToastVisible(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal de confirmation */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment supprimer cette liste de courses ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={confirmerSuppression}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}