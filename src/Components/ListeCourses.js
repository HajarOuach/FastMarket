import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';

export default function ListeCourses() {
  const [listes, setListes] = useState([]);
  const [nouvelleListeNom, setNouvelleListeNom] = useState('');
  const [editListeId, setEditListeId] = useState(null);
  const [editListeNom, setEditListeNom] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client?.id;

  const fetchListes = async () => {
    try {
      const res = await fetch(`http://localhost:8080/listesCourses/client/${clientId}`);
      const data = await res.json();
      setListes(data);
    } catch (error) {
      console.error("Erreur chargement listes :", error);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchListes();
    }
  }, [clientId]);

  const handleAjouterListe = async () => {
    if (!nouvelleListeNom.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/listesCourses/creer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nouvelleListeNom, clientId }),
      });

      if (res.ok) {
        setNouvelleListeNom('');
        fetchListes();
      }
    } catch (err) {
      console.error("Erreur création liste :", err);
    }
  };

  const handleSupprimerListe = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/listesCourses/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setListes(prev => prev.filter(l => l.id !== id));
      }
    } catch (err) {
      console.error("Erreur suppression liste :", err);
    }
  };

  const handleModifierNom = (id, nom) => {
    setEditListeId(id);
    setEditListeNom(nom);
    setShowModal(true);
  };

  const handleConfirmerModification = async () => {
    try {
      const res = await fetch(`http://localhost:8080/listesCourses/${editListeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: editListeNom }),
      });

      if (res.ok) {
        fetchListes();
        setShowModal(false);
        setEditListeId(null);
        setEditListeNom('');
      }
    } catch (err) {
      console.error("Erreur modification nom :", err);
    }
  };

  const handleVoirDetails = (id) => {
    navigate(`/liste-courses/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mes listes de courses</h2>

      <div className="mb-3 d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="Nom de la nouvelle liste"
          value={nouvelleListeNom}
          onChange={(e) => setNouvelleListeNom(e.target.value)}
        />
        <Button variant="primary" onClick={handleAjouterListe}>
          Ajouter
        </Button>
      </div>

      {listes.length === 0 ? (
        <p className="text-muted">Aucune liste trouvée.</p>
      ) : (
        <ul className="list-group">
          {listes.map((liste) => (
            <li key={liste.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{liste.nom}</span>
              <div className="d-flex gap-2">
                <Button variant="info" size="sm" onClick={() => handleVoirDetails(liste.id)}>
                  Voir détails
                </Button>
                <Button variant="warning" size="sm" onClick={() => handleModifierNom(liste.id, liste.nom)}>
                  Modifier
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleSupprimerListe(liste.id)}>
                  Supprimer
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le nom de la liste</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editListeNom}
            onChange={(e) => setEditListeNom(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleConfirmerModification}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}