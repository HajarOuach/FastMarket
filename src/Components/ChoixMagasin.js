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
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const navigate = useNavigate();
  const dateCreneauRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8080/magasins/top5")
      .then(res => setMagasins(res.data))
      .catch(err => console.error("Erreur chargement magasins :", err));
  }, []);

  const handleChoixMagasin = (magasin) => {
    setSelectedMagasin(magasin);
    setConfirmation(false);
    setSelectedDate('');
    setSelectedCreneau(null);
    setTimeout(() => dateCreneauRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleConfirmation = () => setConfirmation(true);

  const handleCommander = async () => {
    const client = JSON.parse(localStorage.getItem("client"));
    if (!client || !client.id || !selectedMagasin || !selectedCreneau) {
      alert("Veuillez sélectionner un magasin et un créneau.");
      return;
    }

    try {
      // 1. Met à jour le magasin du client
      await axios.put("http://localhost:8080/clients/modifierMagasin", {
        clientId: client.id,
        magasinId: selectedMagasin.id
      });

      // 2. Recharge les données du client pour récupérer le magasin mis à jour
      const updatedClient = await axios.get(`http://localhost:8080/clients/${client.id}`);
      localStorage.setItem("client", JSON.stringify(updatedClient.data));

      // 3. Stocke les infos utiles
      localStorage.setItem("magasinId", selectedMagasin.id.toString());
      localStorage.setItem("magasin", JSON.stringify(selectedMagasin));
      localStorage.setItem("creneauId", selectedCreneau.id.toString());
      localStorage.setItem("dateRetrait", selectedDate);

      console.log("Magasin mis à jour avec succès :", selectedMagasin);
      navigate(`/accueil-magasin/${selectedMagasin.id}`);
    } catch (err) {
      console.error("Erreur lors de la mise à jour du magasin :", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleChangerMagasin = () => {
    setSelectedMagasin(null);
    setSelectedDate('');
    setSelectedCreneau(null);
    setConfirmation(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const creneauxDisponibles = selectedMagasin?.creneaux || [];

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <img src="/images/LogoMarket2 (2).png" alt="FastMarket Logo" style={{ maxHeight: 120 }} className="mb-3" />
        <h1 className="fw-bold mb-3">Choisissez un magasin de retrait</h1>
        <p className="text-muted fs-5">Sélectionnez votre magasin, la date et le créneau pour votre retrait</p>
      </div>

      <div className="row justify-content-center mb-4">
        {(selectedMagasin ? [selectedMagasin] : magasins).map((magasin) => {
          const isSelected = selectedMagasin?.id === magasin.id;
          return (
            <div key={magasin.id} className="col-md-4 mb-4 position-relative">
              <div className={`card shadow-sm h-100 ${isSelected ? 'border border-3 border-success' : ''}`}>
                <div className="position-absolute top-0 end-0 m-2">
                  <div
                    onClick={() => handleChoixMagasin(magasin)}
                    role="button"
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
                <div className="card-body">
                  <h5 className="card-title">{magasin.nom}</h5>
                  <p className="card-text text-secondary">{magasin.adresse}</p>
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
                setSelectedCreneau(null);
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
                  value={selectedCreneau?.id || ''}
                  onChange={(e) => {
                    const creneau = creneauxDisponibles.find(c => c.id.toString() === e.target.value);
                    setSelectedCreneau(creneau || null);
                  }}
                >
                  <option value="">-- Sélectionner un créneau --</option>
                  {creneauxDisponibles.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.heureDebut.substring(0, 5)} - {c.heureFin.substring(0, 5)}
                    </option>
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
              <p className="mb-1">✅ Magasin : <strong>{selectedMagasin.nom}</strong></p>
              <p className="mb-1">📅 Date : <strong>{selectedDate}</strong></p>
              <p>⏰ Créneau : <strong>{selectedCreneau.heureDebut.substring(0, 5)} - {selectedCreneau.heureFin.substring(0, 5)}</strong></p>
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
          <Button variant="primary" onClick={handleCommander}>Confirmer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChoixMagasin;
