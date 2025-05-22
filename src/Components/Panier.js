import React, { useState } from 'react';
import './Panier.css';

function Panier() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      nom: 'Lait Bio',
      prix: 1.5,
      image: '/images/Bio.jpeg',
      quantite: 1,
      enStock: true,
    },
    {
      id: 2,
      nom: 'Pomme',
      prix: 0.8,
      image: '/images/Fruits.jpeg',
      quantite: 2,
      enStock: true,
    },
  ]);

  const incrementer = (id) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id
          ? { ...article, quantite: article.quantite + 1 }
          : article
      )
    );
  };

  const decrementer = (id) => {
    setArticles(prev =>
      prev
        .map(article =>
          article.id === id
            ? { ...article, quantite: article.quantite - 1 }
            : article
        )
        .filter(article => article.quantite > 0)
    );
  };

  const retirerArticle = (id) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const total = articles
    .filter(article => article.enStock)
    .reduce((sum, article) => sum + article.prix * article.quantite, 0);

  return (
    <div className="panier-page">
      <h2 className="panier-titre">🛒 Mon Panier</h2>

      {articles.length === 0 ? (
        <p className="panier-vide-message">Votre panier est vide.</p>
      ) : (
        <>
          {articles.map((article) => (
            <div className={`panier-article ${!article.enStock ? 'article-rupture' : ''}`} key={article.id}>
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
                    <button onClick={() => decrementer(article.id)} className="quantite-btn" disabled={!article.enStock}>−</button>
                    <span className="quantite">{article.quantite}</span>
                    <button onClick={() => incrementer(article.id)} className="quantite-btn" disabled={!article.enStock}>+</button>
                    <button onClick={() => retirerArticle(article.id)} className="btn-supprimer">🗑</button>
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
        </>
      )}
    </div>
  );
}

export default Panier;
