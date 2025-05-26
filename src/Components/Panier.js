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
              idProduit: ligne.produit.id,
              nom: ligne.produit.libelle,
              prix: ligne.produit.prixUnitaire,
              quantite: ligne.quantite,
              image: ligne.produit.image,
              enStock: true,
            }));
            console.log("Articles dans le panier :", articles);
            setArticles(articles);
          }
        })
        .catch((err) => console.error("Erreur chargement panier :", err));
    }
  }, [clientId]);

  const modifierQuantite = (idLigne, idProduit, delta) => {
    fetch("http://localhost:8080/panier/ajouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        produitId: idProduit,
        quantite: delta,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur modification quantité");
        setArticles((prev) =>
          prev.map((a) =>
            a.idLigne === idLigne
              ? { ...a, quantite: a.quantite + delta }
              : a
          ).filter((a) => a.quantite > 0)
        );
      })
      .catch((err) => console.error("Erreur quantite :", err));
  };

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
    if (!clientId) return;

    const confirmation = window.confirm("Êtes-vous sûr de vouloir vider le panier ?");
    if (!confirmation) return;

    fetch(`http://localhost:8080/panier/${clientId}/vider`, {
      method: "DELETE",
    })
      .then(() => {
        setArticles([]);
        console.log("Panier vidé avec succès.");
      })
      .catch((err) => {
        console.error("Erreur vidage panier :", err);
        alert("Erreur lors de la suppression du panier.");
      });
  };

  const validerCommande = () => {
    const magasinId = localStorage.getItem("magasinId");
    const creneauId = localStorage.getItem("creneauId");

    console.log("Magasin ID :", magasinId, "Créneau ID :", creneauId);

    if (!magasinId || !creneauId) {
      alert("Veuillez choisir un magasin et un créneau avant de valider la commande.");
      return;
    }

    fetch("http://localhost:8080/panier/valider", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: client.id,
        magasinId: parseInt(magasinId),
        creneauId: parseInt(creneauId),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Échec de la validation");
        return res.blob();
      })
      .then((blob) => {
        const pdfUrl = window.URL.createObjectURL(blob);
        window.open(pdfUrl);
        alert("Commande validée avec succès !");
        setArticles([]);
      })
      .catch((err) => {
        console.error("Erreur validation panier :", err);
        alert("Erreur lors de la validation de la commande.");
      });
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
                <div className="article-stock">
                  {article.enStock ? "En stock" : "Rupture de stock"}
                </div>
                <div className="article-prix">{article.prix.toFixed(2)} €</div>

                <div className="quantite-et-soustotal">
                  <div className="quantite-controle">
                    <button onClick={() => modifierQuantite(article.idLigne, article.idProduit, -1)} className="btn-quantite">−</button>
                    <span className="quantite">{article.quantite}</span>
                    <button onClick={() => modifierQuantite(article.idLigne, article.idProduit, 1)} className="btn-quantite">+</button>
                    <button onClick={() => retirerArticle(article.idLigne)} className="btn-supprimer">🗑</button>
                  </div>

                  {article.quantite > 0 && (
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