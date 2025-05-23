import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';

const magasins = [
  { id: 1, nom: 'Magasin A', adresse: '123 Rue de Paris' },
  { id: 2, nom: 'Magasin B', adresse: '456 Avenue Lyon' },
  { id: 3, nom: 'Magasin C', adresse: '789 Boulevard Marseille' },
];

const creneaux = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
];

const ChoixMagasin = () => {
  const [magasinSelectionne, setMagasinSelectionne] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [creneauSelectionne, setCreneauSelectionne] = useState('');
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const navigate = useNavigate();

  const handleMagasinClick = (magasin) => {
    setMagasinSelectionne(magasin);
    setShowModal(true);
  };

  const handleConfirmMagasin = () => {
    setShowModal(false);
    setConfirmationVisible(false);
    setCreneauSelectionne('');
  };

  const handleCommander = () => {
    navigate('/catalogue');
  };

  return (
    <div className="container mt-5">
      <h2>Choisissez votre magasin de retrait</h2>
      <div className="row">
        {magasins.map((magasin) => (
          <div key={magasin.id} className="col-md-4 mb-3">
            <div
              className="card h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => handleMagasinClick(magasin)}
            >
              <div className="card-body">
                <h5 className="card-title">{magasin.nom}</h5>
                <p className="card-text">{magasin.adresse}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Choix du créneau */}
      {magasinSelectionne && (
        <>
          <h4 className="mt-4">Créneaux disponibles pour {magasinSelectionne.nom}</h4>
          <div className="d-flex flex-wrap gap-3 mt-3">
            {creneaux.map((creneau) => (
              <Button
                key={creneau}
                variant={creneau === creneauSelectionne ? 'success' : 'outline-success'}
                onClick={() => {
                  setCreneauSelectionne(creneau);
                  setConfirmationVisible(true);
                }}
              >
                {creneau}
              </Button>
            ))}
          </div>
        </>
      )}

      {/* Confirmation message */}
      {confirmationVisible && magasinSelectionne && creneauSelectionne && (
        <Alert variant="success" className="mt-4">
          Vous avez choisi le <strong>{magasinSelectionne.nom}</strong>, créneau : <strong>{creneauSelectionne}</strong>
        </Alert>
      )}

      {/* Bouton Commander */}
      {confirmationVisible && magasinSelectionne && creneauSelectionne && (
        <div className="mt-3">
          <Button variant="primary" onClick={handleCommander}>
            Commander
          </Button>
        </div>
      )}

      {/* Modal confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous choisir <strong>{magasinSelectionne?.nom}</strong> comme point de retrait ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleConfirmMagasin}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChoixMagasin;
