import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const magasins = [
  { id: 1, nom: 'Magasin Paris', adresse: '123 Rue de Paris' },
  { id: 2, nom: 'Magasin Lyon', adresse: '456 Avenue de Lyon' },
  { id: 3, nom: 'Magasin Marseille', adresse: '789 Boulevard de Marseille' },
];

const creneaux = ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];

const ChoixMagasin = () => {
  const [selectedMagasin, setSelectedMagasin] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCreneau, setSelectedCreneau] = useState('');
  const navigate = useNavigate();

  const handleChoixMagasin = (magasin) => {
    setSelectedMagasin(magasin);
    setConfirmation(false);
    setSelectedDate('');
    setSelectedCreneau('');
  };

  const handleConfirmMagasin = () => {
    localStorage.setItem("magasin", magasinSelectionne.nom); // Stocker le magasin choisi
    setShowModal(false);
    setConfirmationVisible(false);
    setCreneauSelectionne('');
  };

  const handleCommander = () => {
    navigate('/catalogue');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container text-center mt-5">
      <img src="/images/LogoMarket2 (2).png" alt="FastMarket Logo" className="mb-4" style={{ maxHeight: 100 }} />
      <h2 className="mb-4">Choisissez votre magasin de retrait</h2>

      <div className="row justify-content-center">
        {magasins.map((magasin) => (
          <div key={magasin.id} className="col-12 col-md-4 mb-3">
            <div
              className="card shadow-sm h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => handleMagasinClick(magasin)}
            >
              <div className="card-body">
                <h5 className="card-title">{magasin.nom}</h5>
                <p className="card-text">{magasin.adresse}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleChoixMagasin(magasin)}
                >
                  Choisir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {magasinSelectionne && (
        <>
          <h4 className="mt-5">Créneaux disponibles pour <strong>{magasinSelectionne.nom}</strong></h4>
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

      {confirmationVisible && (
        <Alert variant="success" className="mt-4">
          Vous avez choisi <strong>{magasinSelectionne.nom}</strong> – créneau : <strong>{creneauSelectionne}</strong>
        </Alert>
      )}

      {confirmationVisible && (
        <div className="mt-3">
          <Button variant="primary" onClick={handleCommander}>
            Commander
          </button>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous choisir <strong>{magasinSelectionne?.nom}</strong> comme point de retrait ?
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
