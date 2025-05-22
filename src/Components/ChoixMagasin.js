// Components/ChoixMagasin.js
import React, { useState, useEffect } from 'react';

const ChoixMagasin = () => {
  const [magasins, setMagasins] = useState([]);
  const [magasinSelectionne, setMagasinSelectionne] = useState(null);

  useEffect(() => {
    // Simulation de récupération des magasins (peut être remplacé par une API)
    const magasinsSimules = [
      { id: 1, nom: 'Magasin Paris - République' },
      { id: 2, nom: 'Magasin Lyon - Part-Dieu' },
      { id: 3, nom: 'Magasin Marseille - Prado' },
    ];
    setMagasins(magasinsSimules);
  }, []);

  const handleChoixMagasin = (magasin) => {
    setMagasinSelectionne(magasin);
    alert(`Magasin sélectionné : ${magasin.nom}`);
    // Tu peux stocker ce choix dans le state global ou localStorage si besoin
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Choisir un magasin de retrait</h1>
      <ul className="list-group">
        {magasins.map((magasin) => (
          <li
            key={magasin.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {magasin.nom}
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleChoixMagasin(magasin)}
            >
              Choisir
            </button>
          </li>
        ))}
      </ul>

      {magasinSelectionne && (
        <div className="alert alert-success mt-4">
          ✅ Vous avez choisi : <strong>{magasinSelectionne.nom}</strong>
        </div>
      )}
    </div>
  );
};

export default ChoixMagasin;
