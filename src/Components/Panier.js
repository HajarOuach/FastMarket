import React, { useEffect, useState } from 'react';
import './Panier.css';

function Panier() {
  const [articles, setArticles] = useState([]);
  const client = JSON.parse(localStorage.getItem("client"));
  const clientId = client?.id;

  useEffect(() => {
    if (clientId) {
      fetch(`http://localhost:8080/panier/${clientId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.lignesCommande) {
            const articles = data.lignesCommande.map((ligne) => ({
              idLigne: ligne.id,
              nom: ligne.produit.libelle,
              prix: ligne.produit.prixUnitaire,
              quantite: ligne.quantite,
              image: ligne.produit.image,
              enStock: true,
            }));
            setArticles(articles);
          }
        })
        .catch((err) => console.error("Erreur chargement panier :", err));
    }
  }, [clientId]);

  const retirerArticle = (ligneId) => {
    fetch(`http://localhost:8080/panier/ligne/${ligneId}`, {
      method: "DELETE",
    })
      .then(() => {
        setArticles((prev) => prev.filter((a) => a.idLigne !== ligneId));
      })
      .catch((err) => console.error("Erreur suppression article :", err));
  };

  const viderPanier = () => {
    if (clientId) {
      fetch(`http://localhost:8080/panier/${clientId}/vider`, {
        method: "DELETE",
      })
        .then(() => setArticles([]))
        .catch((err) => console.error("Erreur vidage panier :", err));
    }
  };

  const validerCommande = () => {
    if (clientId) {
      fetch(`http://localhost:8080/panier/valider/${clientId}`, {
        method: "PUT",
      })
        .then((res) => {
          if (res.ok) {
            alert("Commande validée avec succès !");
            setArticles([]);
          } else {
            alert("Erreur lors de la validation.");
          }
        })
        .catch(() => alert("Erreur serveur lors de la validation."));
    }
  };

  const total = articles
    .filter((article) => article.enStock)
    .reduce((sum, article) => sum + article.prix * article.quantite, 0);

  return (
    <div className="panier-page">
      <h2 className="panier-titre">🛒 Mon Panier</h2>

      {articles.length === 0 ? (
        <p className="panier-vide-message">Votre panier est vide.</p>
      ) : (
        <>
          {articles.map((article) => (
            <div
              className={`panier-article ${!article.enStock ? 'article-rupture' : ''}`}
              key={article.idLigne}
            >
              <img src={article.image} alt={article.nom} className="article-image" />

              <div className="article-infos">
                <div className="article-nom">{article.nom}</div>

                {article.enStock ? (
                  <div className="article-stock">En stock</div>
                ) : (
                  <div className="article-stock rupture">Rupture de stock</div>
                )}

                <div className="article-prix">{article.prix.toFixed(2)} €</div>

                <div className="quantite-et-soustotal">
                  <div className="quantite-controle">
                    <span className="quantite">{article.quantite}</span>
                    <button onClick={() => retirerArticle(article.idLigne)} className="btn-supprimer">🗑</button>
                  </div>

                  {article.enStock && article.quantite > 0 && (
                    <div className="sous-total-inline-final">
                      <span className="sous-total-label">sous-total :</span>&nbsp;
                      <span className="sous-total-montant">
                        {(article.prix * article.quantite).toFixed(2)} €
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="panier-total">Total : {total.toFixed(2)} €</div>

          <div className="panier-actions">
            <button onClick={viderPanier} className="btn btn-danger me-2">Vider le panier</button>
            <button onClick={validerCommande} className="btn btn-success">Valider la commande</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Panier;
