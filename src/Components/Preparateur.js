import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GestionCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [commandeActive, setCommandeActive] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/commandes/preparateur/32/commandes/commandees")
      .then((res) => setCommandes(res.data))
      .catch((err) => console.error("Erreur lors du chargement :", err));
  }, []);

  const changerStatut = (commandeId, nouveauStatut) => {
    setCommandes((prevCommandes) =>
      prevCommandes.map((commande) =>
        commande.id === commandeId
          ? { ...commande, statut: nouveauStatut }
          : commande
      )
    );
  };

  const formatHeure = (timeStr) => timeStr?.substring(0, 5);

  return (
    <div className="container">
      <h1 className="title">Commandes à Préparer</h1>

      <div className="commandes-list">
        {commandes.map((commande) => (
          <div key={commande.id} className="commande-card">
            <h2>Commande #{commande.id}</h2>
            <p><strong>Client :</strong> {commande.client?.nom}</p>
            <p><strong>Date :</strong> {new Date(commande.dateCommande).toLocaleString()}</p>
            <p><strong>Créneau :</strong> {formatHeure(commande.creneau?.heureDebut)} - {formatHeure(commande.creneau?.heureFin)}</p>
            <p><strong>Statut :</strong> {commande.statut}</p>

            <div className="actions">
              {commande.statut === "Commandé" && (
                <button onClick={() => changerStatut(commande.id, "En préparation")} className="btn yellow">Traiter</button>
              )}
              {commande.statut === "En préparation" && (
                <button onClick={() => changerStatut(commande.id, "Terminé")} className="btn green">Terminer</button>
              )}
              <button onClick={() => setCommandeActive(commande)} className="btn blue">Détails</button>
            </div>
          </div>
        ))}
      </div>

      {/* Détails commande */}
      {commandeActive && (
        <div className="popup-overlay" onClick={() => setCommandeActive(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>Détails de la commande #{commandeActive.id}</h3>
            <ul>
              {commandeActive.lignesCommande.map((ligne) => (
                <li key={ligne.id}>
                  {ligne.produit?.libelle} – <strong>{ligne.quantite}</strong>
                </li>
              ))}
            </ul>
            <button onClick={() => setCommandeActive(null)} className="btn red">Fermer</button>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .container {
          padding: 2rem;
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }

        .commandes-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .commande-card {
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bold;
        }

        .btn.yellow {
          background-color: #facc15;
        }

        .btn.green {
          background-color: #22c55e;
        }

        .btn.blue {
          background-color: #3b82f6;
        }

        .btn.red {
          background-color: #ef4444;
        }

        .popup-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 400px;
          width: 100%;
        }

        .popup ul {
          margin-top: 1rem;
          list-style: none;
          padding: 0;
        }

        .popup li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
