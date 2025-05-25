import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ChoixMagasin = () => {
  const [magasins, setMagasins] = useState([]);
  const [selectedMagasin, setSelectedMagasin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCreneau, setSelectedCreneau] = useState('');
  const navigate = useNavigate();
  const dateCreneauRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8080/magasins/top5")
      .then(response => setMagasins(response.data))
      .catch(error => console.error("Erreur lors du chargement des magasins :", error));
  }, []);

  const handleChoixMagasin = (magasin) => {
    if (!magasin) return;
    console.log("Magasin sélectionné :", magasin);
    setSelectedMagasin(magasin);
    setConfirmation(false);
    setSelectedDate('');
    setSelectedCreneau('');
    setTimeout(() => {
      if (dateCreneauRef.current) {
        dateCreneauRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleConfirmation = () => setConfirmation(true);

  const handleCommander = async () => {
  if (!selectedMagasin) {
    console.error("Aucun magasin sélectionné !");
    return;
  }

  const client = JSON.parse(localStorage.getItem("client"));
  if (!client || !client.id) {
    console.error("Client non connecté ou ID manquant !");
    return;
  }

  try {
    // Appel API pour enregistrer le magasin pour ce client
    const response = await axios.put("http://localhost:8080/clients/modifierMagasin", {
      clientId: client.id,
      magasinId: selectedMagasin.id
    });

    console.log("✅ Magasin mis à jour avec succès :", response.data);

    // Affichage du client + magasin en console
    console.log("Client avec magasin choisi :", {
      ...client,
      magasin: selectedMagasin
    });

    // Enregistrer le magasin dans le localStorage
    localStorage.setItem("magasin", JSON.stringify(selectedMagasin));

    // Redirection vers accueil du magasin
    navigate(`/accueil-magasin/${selectedMagasin.id}`);

  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du magasin :", error);
  }
};


  const handleChangerMagasin = () => {
    setSelectedMagasin(null);
    setSelectedDate('');
    setSelectedCreneau('');
    setConfirmation(false);
  };

  const handleConfirmMagasin = () => setShowModal(false);

  const today = new Date().toISOString().split('T')[0];

  const magasinsToShow = Array.isArray(magasins)
    ? (selectedMagasin ? [selectedMagasin] : magasins)
    : [];

  const creneauxDisponibles = selectedMagasin?.creneaux?.length
    ? selectedMagasin.creneaux.sort((a, b) => a.heureDebut.localeCompare(b.heureDebut)).map(c => {
        const debut = c.heureDebut.substring(0, 5);
        const fin = c.heureFin.substring(0, 5);
        return `${debut} - ${fin}`;
      })
    : [];

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <img src="/images/LogoMarket2 (2).png" alt="FastMarket Logo" style={{ maxHeight: 120 }} className="mb-3" />
        <h1 className="fw-bold mb-3">Choisissez un magasin de retrait</h1>
        <p className="text-muted fs-5">Sélectionnez votre magasin, la date et le créneau pour votre retrait</p>
      </div>

      <div className="row justify-content-center mb-4">
        {magasinsToShow.map((magasin) => {
          const isSelected = selectedMagasin?.id === magasin.id;
          return (
            <div key={magasin.id} className="col-md-4 mb-4 position-relative">
              <div className={`card shadow-sm h-100 ${isSelected ? 'border border-3 border-success' : ''}`}>
                <div className="position-absolute top-0 end-0 m-2">
                  <div
                    onClick={() => handleChoixMagasin(magasin)}
                    role="button"
                    aria-label={isSelected ? 'Sélectionné' : 'Choisir'}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? '#198754' : '#0d6efd'}`,
                      backgroundColor: isSelected ? '#198754' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                      }} />
                    )}
                  </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{magasin.nom}</h5>
                    <p className="card-text text-secondary">{magasin.adresse}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedMagasin && (
        <div className="card shadow p-4 mb-5" ref={dateCreneauRef}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Réservation pour <strong>{selectedMagasin.nom}</strong></h4>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleChangerMagasin}>
              ← Changer de magasin
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="form-label fw-semibold">Choisir une date</label>
            <input
              id="date"
              type="date"
              className="form-control"
              value={selectedDate}
              min={today}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedCreneau('');
              }}
            />
          </div>

          {selectedDate && (
            <>
              <label htmlFor="creneau" className="form-label fw-semibold">Choisir un créneau horaire</label>
              {creneauxDisponibles.length > 0 ? (
                <select
                  id="creneau"
                  className="form-select"
                  value={selectedCreneau}
                  onChange={(e) => setSelectedCreneau(e.target.value)}
                >
                  <option value="">-- Sélectionner un créneau --</option>
                  {creneauxDisponibles.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              ) : (
                <p className="text-danger fst-italic">Aucun créneau disponible pour ce magasin.</p>
              )}
            </>
          )}

          {selectedDate && selectedCreneau && !confirmation && (
            <div className="mt-4 text-end">
              <button className="btn btn-success px-4" onClick={handleConfirmation}>
                Confirmer
              </button>
            </div>
          )}

          {confirmation && (
            <div className="alert alert-success mt-4 text-center">
              <p className="mb-1">✅ Vous avez choisi : <strong>{selectedMagasin.nom}</strong></p>
              <p className="mb-1">📅 Date : <strong>{selectedDate}</strong></p>
              <p>⏰ Créneau : <strong>{selectedCreneau}</strong></p>
              <button className="btn btn-primary mt-3" onClick={handleCommander}>
                Commander
              </button>
            </div>
          )}
        </div>
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