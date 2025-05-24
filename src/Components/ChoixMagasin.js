import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Alert } from 'react-bootstrap';

const magasins = [
  { id: 1, nom: 'Magasin Paris', adresse: '123 Rue de Paris' },
  { id: 2, nom: 'Magasin Lyon', adresse: '456 Avenue de Lyon' },
  { id: 3, nom: 'Magasin Marseille', adresse: '789 Boulevard de Marseille' },
];

const creneaux = ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];

const ChoixMagasin = () => {
  const [selectedMagasin, setSelectedMagasin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [creneauSelectionne, setCreneauSelectionne] = useState('');
  const navigate = useNavigate();

  const handleChoixMagasin = (magasin) => {
    setSelectedMagasin(magasin);
    setShowModal(true);
    setConfirmationVisible(false);
    setCreneauSelectionne('');
  };

  const handleConfirmMagasin = () => {
    localStorage.setItem("magasin", selectedMagasin.nom);
    setShowModal(false);
  };

  const handleCommander = () => {
    navigate('/catalogue');
  };

  return (
    <div className="container text-center mt-5">
      <img src="/images/LogoMarket2 (2).png" alt="FastMarket Logo" className="mb-4" style={{ maxHeight: 100 }} />
      <h2 className="mb-4">Choisissez votre magasin de retrait</h2>

      <div className="row justify-content-center">
        {magasins.map((magasin) => (
          <div key={magasin.id} className="col-12 col-md-4 mb-3">
            <div className="card shadow-sm h-100" style={{ cursor: 'pointer' }}>
              <div className="card-body">
                <h5 className="card-title">{magasin.nom}</h5>
                <p className="card-text">{magasin.adresse}</p>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoixMagasin(magasin);
                  }}
                >
                  Choisir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMagasin && (
        <>
          <h4 className="mt-5">Créneaux disponibles pour <strong>{selectedMagasin.nom}</strong></h4>
          <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
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

      {confirmationVisible && selectedMagasin && (
        <>
          <Alert variant="success" className="mt-4">
            Vous avez choisi <strong>{selectedMagasin.nom}</strong> – créneau : <strong>{creneauSelectionne}</strong>
          </Alert>
          <div className="mt-3">
            <Button variant="primary" onClick={handleCommander}>
              Commander
            </Button>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous choisir <strong>{selectedMagasin?.nom}</strong> comme point de retrait ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleConfirmMagasin}>Confirmer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChoixMagasin;
