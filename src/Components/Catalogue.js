import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const produits = [
  { id: 1, nom: 'Produit 1', image: 'https://via.placeholder.com/150', prix: 19.99 },
  { id: 2, nom: 'Produit 2', image: 'https://via.placeholder.com/150', prix: 29.99 },
  { id: 3, nom: 'Produit 3', image: 'https://via.placeholder.com/150', prix: 39.99 },
];

const Catalogue = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Catalogue de Produits</h1>
      <div className="row">
        {produits.map((produit) => (
          <div key={produit.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={produit.image} className="card-img-top" alt={produit.nom} />
              <div className="card-body">
                <h5 className="card-title">{produit.nom}</h5>
                <p className="card-text">Prix : {produit.prix} €</p>
                <button className="btn btn-primary">Voir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
