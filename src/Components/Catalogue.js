import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 🔹 Données des catégories
const categoryData = [
  { title: 'Fruits & Légumes',   img: '/images/category-thumb-1.jpg' },
  { title: 'Pains & Desserts',  img: '/images/category-thumb-2.jpg' },
  { title: 'Boissons',   img: '/images/category-thumb-3.webp' },
  { title: 'Produits ménagers',        img: '/images/houseCleaning.webp' },
  { title: 'Viandes & Volailles',    img: '/images/category-thumb-5.jpg' },
  { title: 'Bébé & Puériculture',           img: '/images/bebe.jpeg' },
  { title: 'Produits laitiers & Œufs',   img: '/images/category-thumb-7.jpg' },
  { title: 'Surgelés',  img: '/images/surgele.jpeg' },
  { title: 'Snacks & Chips',  img: '/images/snacks.jpeg' },
  { title: 'Céréales & Petits-déjeuners',  img: '/images/cereals.jpeg' },
  { title: 'Hygiène & soins personnels',  img: '/images/hygiene.jpeg' },
  { title: 'Bio & Santé',  img: '/images/bio.jpeg' },
];

// 🔹 Produits simulés par catégorie
const produitsParCategorie = {
  'Fruits & Légumes': [
    { id: 1, nom: 'Pomme', image: 'https://via.placeholder.com/150', prix: 2.99 },
    { id: 2, nom: 'Carotte', image: 'https://via.placeholder.com/150', prix: 1.49 },
  ],
  'Boissons': [
    { id: 3, nom: 'Jus d\'orange', image: 'https://via.placeholder.com/150', prix: 3.99 },
    { id: 4, nom: 'Coca-Cola', image: 'https://via.placeholder.com/150', prix: 2.49 },
  ],
  // Ajoute d'autres catégories ici...
};

const Catalogue = () => {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState(null);

  const handleVoirProduits = (categorie) => {
    setCategorieSelectionnee(categorie);
  };

  const handleRetour = () => {
    setCategorieSelectionnee(null);
  };

  const produits = produitsParCategorie[categorieSelectionnee] || [];

  return (
    <div className="container mt-5">
      {!categorieSelectionnee ? (
        <>
          <h1 className="mb-4">Nos Catégories</h1>
          <div className="row">
            {categoryData.map((categorie) => (
              <div key={categorie.title} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={categorie.img}
                    className="card-img-top"
                    alt={categorie.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{categorie.title}</h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleVoirProduits(categorie.title)}
                    >
                      Voir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-4">Produits : {categorieSelectionnee}</h2>
          <button className="btn btn-secondary mb-3" onClick={handleRetour}>
            ← Retour aux catégories
          </button>
          <div className="row">
            {produits.length === 0 ? (
              <div className="col-12">
                <p>Aucun produit disponible pour cette catégorie.</p>
              </div>
            ) : (
              produits.map((produit) => (
                <div key={produit.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src={produit.image} className="card-img-top" alt={produit.nom} />
                    <div className="card-body">
                      <h5 className="card-title">{produit.nom}</h5>
                      <p className="card-text">Prix : {produit.prix} €</p>
                      <button className="btn btn-success">Ajouter au panier</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Catalogue;
