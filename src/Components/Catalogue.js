import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Catalogue.css';

const categoryData = [
  { title: 'Fruits & Légumes', img: '/images/sample-image.jpg' },
  { title: 'Pains & Desserts', img: '/images/category-thumb-2.jpg' },
  { title: 'Boissons', img: '/images/category-thumb-3.webp' },
  { title: 'Produits ménagers', img: '/images/houseCleaning.webp' },
  { title: 'Viandes & Volailles', img: '/images/category-thumb-5.jpg' },
  { title: 'Bébé & Puériculture', img: '/images/bebe.jpeg' },
  { title: 'Produits laitiers & Œufs', img: '/images/lait.jpg' },
  { title: 'Surgelés', img: '/images/surgele.jpeg' },
  { title: 'Snacks & Chips', img: '/images/snacks.jpeg' },
  { title: 'Céréales & Petits-déjeuners', img: '/images/cereals.jpeg' },
  { title: 'Hygiène & soins personnels', img: '/images/hygiene.jpeg' },
  { title: 'Bio & Santé', img: '/images/bio.jpeg' },
];

const Catalogue = () => {
  const navigate = useNavigate();

  const handleVoirProduits = (categorie) => {
   const client = JSON.parse(localStorage.getItem("client"));
const magasinStorage = JSON.parse(localStorage.getItem("magasin")); // au cas où seul l'id est stocké
const magasinId = client?.magasin?.id || magasinStorage?.id || magasinStorage;

    if (magasinId) {
      navigate(`/produits?categorie=${encodeURIComponent(categorie)}&magasinId=${magasinId}`);
    } else {
      alert("Aucun magasin sélectionné.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">🛍️ Nos Catégories</h1>
      <div className="row">
        {categoryData.map((categorie) => (
          <div key={categorie.title} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="category-card card h-100 shadow-sm">
              <img
                src={categorie.img}
                className="card-img-top category-img"
                alt={categorie.title}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{categorie.title}</h5>
                <button
                  className="btn btn-voir"
                  onClick={() => handleVoirProduits(categorie.title)}
                >
                  Voir les produits
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
