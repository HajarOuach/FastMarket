import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';

const ChoixMagasin = () => {
  const navigate = useNavigate();
  const [magasins] = useState([
    { id: 1, nom: 'Magasin Paris 1' },
    { id: 2, nom: 'Magasin Lyon 2' },
    { id: 3, nom: 'Magasin Marseille 3' },
  ]);

  const [magasinSelectionne, setMagasinSelectionne] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleSelection = (magasin) => {
    setMagasinSelectionne(magasin);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setConfirmationVisible(true);
  };

  const handleCommander = () => {
    navigate('/catalogue');
  };

  return (
    <div className="container mt-5">
      <h2>Choisissez votre magasin de retrait</h2>
      <ul className="list-group my-4">
        {magasins.map((magasin) => (
          <li
            key={magasin.id}
            className="list-group-item list-group-item-action"
            style={{ cursor: 'pointer' }}
            onClick={() => handleSelection(magasin)}
          >
            {magasin.nom}
          </li>
        ))}
      </ul>

      {/* ✅ Pop-up de confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous sélectionner <strong>{magasinSelectionne?.nom}</strong> comme magasin de retrait ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleConfirm}>Confirmer</Button>
        </Modal.Footer>
      </Modal>

      {/* ✅ Message de confirmation */}
      {confirmationVisible && (
        <>
          <Alert variant="success">
            ✅ Vous avez sélectionné <strong>{magasinSelectionne.nom}</strong> comme magasin de retrait.
          </Alert>
          <Button className="btn btn-success mt-3" onClick={handleCommander}>
            Commander
          </Button>
        </>
      )}
    </div>
  );
};

export default ChoixMagasin;
