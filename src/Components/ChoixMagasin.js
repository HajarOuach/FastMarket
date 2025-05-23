import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const magasins = [
  { id: 1, nom: 'Magasin Paris', adresse: '123 Rue de Paris' },
  { id: 2, nom: 'Magasin Lyon', adresse: '456 Avenue de Lyon' },
  { id: 3, nom: 'Magasin Marseille', adresse: '789 Boulevard de Marseille' },
];

const creneauxHoraires = [
  "06:00 - 06:30", "06:30 - 07:00", "07:00 - 07:30", "07:30 - 08:00",
  "08:00 - 08:30", "08:30 - 09:00", "09:00 - 09:30", "09:30 - 10:00",
  "10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00",
  "12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30", "13:30 - 14:00",
  "14:00 - 14:30", "14:30 - 15:00", "15:00 - 15:30", "15:30 - 16:00",
  "16:00 - 16:30", "16:30 - 17:00", "17:00 - 17:30", "17:30 - 18:00",
  "18:00 - 18:30", "18:30 - 19:00", "19:00 - 19:30", "19:30 - 20:00",
  "20:00 - 20:30", "20:30 - 21:00"
];

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

  const handleConfirmation = () => {
    setConfirmation(true);
  };

  const handleCommander = () => {
    navigate('/catalogue');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mt-5">
      <h2>Choisissez un magasin de retrait</h2>
      <div className="row">
        {magasins.map((magasin) => (
          <div key={magasin.id} className="col-md-4">
            <div
              className={`card mb-3 ${selectedMagasin?.id === magasin.id ? 'border-success' : ''}`}
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

      {selectedMagasin && (
        <>
          <div className="mt-4">
            <h4>Choisir une date :</h4>
            <input
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
            <div className="mt-4">
              <h4>Choisir un créneau horaire :</h4>
              <select
                className="form-select"
                value={selectedCreneau}
                onChange={(e) => setSelectedCreneau(e.target.value)}
              >
                <option value="">-- Sélectionner un créneau --</option>
                {creneauxHoraires.map((c, index) => (
                  <option key={index} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      {selectedMagasin && selectedDate && selectedCreneau && !confirmation && (
        <div className="mt-4">
          <button className="btn btn-success" onClick={handleConfirmation}>
            Confirmer
          </button>
        </div>
      )}

      {confirmation && (
        <div className="mt-4 alert alert-success">
          <p>✅ Vous avez choisi : <strong>{selectedMagasin.nom}</strong></p>
          <p>📅 Date : <strong>{selectedDate}</strong></p>
          <p>⏰ Créneau : <strong>{selectedCreneau}</strong></p>
          <button className="btn btn-primary mt-3" onClick={handleCommander}>
            Commander
          </button>
        </div>
      )}
    </div>
  );
};

export default ChoixMagasin;
