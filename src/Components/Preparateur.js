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
    setCommandes((prev) =>
      prev.map((commande) =>
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
      <table className="commandes-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Client</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Créneau</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => {
            const dateObj = new Date(commande.dateCommande);
            return (
              <tr key={commande.id}>
                <td>{commande.id}</td>
                <td>{commande.client?.nom || "Client inconnu"}</td>
                <td>{dateObj.toLocaleDateString()}</td>
                <td>{dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                <td>
                  {formatHeure(commande.creneau?.heureDebut)} -{" "}
                  {formatHeure(commande.creneau?.heureFin)}
                </td>
                <td>{commande.statut}</td>
                <td>
                  <div className="actions">
                    {commande.statut === "Commandé" && (
                      <button onClick={() => changerStatut(commande.id, "En préparation")} className="btn yellow">
                        Traiter
                      </button>
                    )}
                    {commande.statut === "En préparation" && (
                      <>
                        <button onClick={() => changerStatut(commande.id, "Terminé")} className="btn green">
                          Terminer
                        </button>
                        <button onClick={() => changerStatut(commande.id, "Commandé")} className="btn red">
                          Annuler
                        </button>
                      </>
                    )}
                    {commande.statut === "Terminé" && (
                      <button onClick={() => changerStatut(commande.id, "Commandé")} className="btn red">
                        Annuler
                      </button>
                    )}
                    <button onClick={() => setCommandeActive(commande)} className="btn blue">
                      Détails
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {commandeActive && (
        <div className="popup-overlay" onClick={() => setCommandeActive(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h4>Détails de la commande {commandeActive.id}</h4>
            <ul>
              {commandeActive.lignesCommande.map((ligne) => (
                <li key={ligne.id}>
                  <strong>Produit:</strong> {ligne.produit?.libelle}<br></br> 
                  <strong>Quantité:</strong> {ligne.quantite}
                </li>
              ))}
            </ul>
            <button onClick={() => setCommandeActive(null)} className="btn red">
              Fermer
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          padding: 2rem;
        }
        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 2rem;
        }
        .commandes-table {
          width: 100%;
          border-collapse: collapse;
        }
        .commandes-table th,
        .commandes-table td {
          border: 1px solid #ccc;
          padding: 0.75rem;
          text-align: left;
        }
        .commandes-table th {
          background-color: #f3f4f6;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .btn {
          padding: 0.4rem 0.75rem;
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
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
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
