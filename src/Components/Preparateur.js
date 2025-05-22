import React, { useState, useEffect } from 'react';
import './Preparateur.css';

const Preparateur = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    // ✅ Données simulées corrigées avec prix pour tous les produits
    const commandesSimulees = [
      {
        id: 102,
        user: { nom: 'Dupont', prenom: 'Alice' },
        produits: [
          { nom: 'Produit A', quantite: 2, prix: 10 },
          { nom: 'Produit B', quantite: 1, prix: 15 }
        ],
        date: '2025-05-22T13:04:00',
        etat: 'En attente'
      },
      {
        id: 35,
        user: { nom: 'Martin', prenom: 'Jean' },
        produits: [
          { nom: 'Produit C', quantite: 5, prix: 7 }
        ],
        date: '2025-05-22T12:45:00',
        etat: 'En attente'
      }
    ];
    setCommandes(commandesSimulees);
  }, []);

  const toggleEtatCommande = (id) => {
    setCommandes((prev) =>
      prev.map((commande) =>
        commande.id === id
          ? {
              ...commande,
              etat: commande.etat === 'Traitée' ? 'En attente' : 'Traitée'
            }
          : commande
      )
    );
  };

  const calculerTotal = (produits) =>
    produits
      .reduce((somme, p) => {
        const prix = parseFloat(p.prix) || 5;
        const quantite = parseInt(p.quantite) || 10;
        return somme + prix * quantite;
      }, 0)
      .toFixed(2);

  return (
    <div className="p-4 bg-dark text-white min-vh-100">
      <h1 className="mb-4">Gestion des commandes</h1>

      <table className="table table-dark table-hover align-middle">
        <thead>
          <tr>
            <th>N°</th>
            <th>Utilisateur</th>
            <th>Détails</th>
            <th>Total (€)</th>
            <th>Date</th>
            <th>Heure</th>
            <th>État</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => {
            const dateObj = new Date(commande.date);
            const dateStr = dateObj.toLocaleDateString();
            const heureStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const total = calculerTotal(commande.produits);

            return (
              <tr key={commande.id}>
                <td>#{commande.id}</td>
                <td>{commande.user.prenom} {commande.user.nom}</td>
                <td>
                  <ul className="mb-0">
                    {commande.produits.map((p, i) => (
                      <li key={i}>{p.nom} × {p.quantite}</li>
                    ))}
                  </ul>
                </td>
                <td>{total} €</td>
                <td>{dateStr}</td>
                <td>{heureStr}</td>
                <td>
                  <span className={`badge ${commande.etat === 'Traitée' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {commande.etat}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${commande.etat === 'Traitée' ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => toggleEtatCommande(commande.id)}
                  >
                    {commande.etat === 'Traitée' ? 'Annuler' : 'Traiter'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Preparateur;
