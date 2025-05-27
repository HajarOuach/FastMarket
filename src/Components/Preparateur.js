import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GestionCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [commandeActive, setCommandeActive] = useState(null);

  useEffect(() => {
    const magasinId = localStorage.getItem("magasinId");

    if (!magasinId) {
      console.error("Magasin ID introuvable dans le localStorage.");
      return;
    }

    axios
      .get(`http://localhost:8080/commandes/magasin/${magasinId}/commandes/commandees`)
      .then((res) => {
        console.log("Commandes récupérées :", res.data);
        setCommandes(res.data);
      })
      .catch((err) => console.error("Erreur lors de la récupération :", err));
  }, []);

  const changerStatut = (commandeId, nouveauStatut) => {
    const preparateurId = localStorage.getItem("preparateurId");

    if (nouveauStatut === "En cours de traitement") {
      axios
        .put("http://localhost:8080/commandes/traiter", {
          commandeId,
          preparateurId,
        })
        .then(() => majCommandeLocalement(commandeId, nouveauStatut))
        .catch((err) => console.error(err));
    } else if (nouveauStatut === "Traité") {
      axios
        .put("http://localhost:8080/commandes/marquerTraitee", {
          commandeId,
        })
        .then(() => majCommandeLocalement(commandeId, nouveauStatut))
        .catch((err) => console.error(err));
    } else if (nouveauStatut === "Annulée") {
      majCommandeLocalement(commandeId, nouveauStatut);
    }
  };

  const majCommandeLocalement = (commandeId, nouveauStatut) => {
    setCommandes((prev) =>
      prev.map((commande) =>
        commande.id === commandeId ? { ...commande, statut: nouveauStatut } : commande
      )
    );
  };

  const formatHeure = (timeStr) => timeStr?.substring(0, 5);

  return (
    <div className="container">
      <h1 className="title">Commandes à Préparer</h1>

      <table className="commande-table">
        <thead>
          <tr>
            <th>Numéro</th>
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
            const date = new Date(commande.dateCommande);
            const dateStr = date.toLocaleDateString();
            const heureStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <tr key={commande.id}>
                <td>{commande.id}</td>
                <td>{commande.client?.nom || "Client inconnu"}</td>
                <td>{dateStr}</td>
                <td>{heureStr}</td>
                <td>
                  {formatHeure(commande.creneau?.heureDebut)} - {formatHeure(commande.creneau?.heureFin)}
                </td>
                <td>{commande.statut}</td>
                <td className="actions">
                  {commande.statut === "Commandé" && (
                    <button onClick={() => changerStatut(commande.id, "En cours de traitement")} className="btn yellow">Traiter</button>
                  )}
                  {commande.statut === "En cours de traitement" && (
                    <>
                      <button onClick={() => changerStatut(commande.id, "Traité")} className="btn green">Terminer</button>
                      <button onClick={() => changerStatut(commande.id, "Annulée")} className="btn red">Annuler</button>
                    </>
                  )}
                  <button onClick={() => setCommandeActive(commande)} className="btn blue">Détails</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {commandeActive && (
        <div className="popup-overlay" onClick={() => setCommandeActive(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>Détails de la commande {commandeActive.id}</h3>
            <ul>
              {commandeActive.lignesCommande.map((ligne) => (
                <li key={ligne.id}>
                  Produit : <strong>{ligne.produit?.libelle}</strong> <br />
                  Quantité : <strong>{ligne.quantite}</strong>
                </li>
              ))}
            </ul>
            <button onClick={() => setCommandeActive(null)} className="btn red">Fermer</button>
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
        .commande-table {
          width: 100%;
          border-collapse: collapse;
        }
        .commande-table th,
        .commande-table td {
          border: 1px solid #ccc;
          padding: 0.5rem;
          text-align: center;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
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


