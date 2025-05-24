import React from 'react';
import { Link } from 'react-router-dom'; // ✅ importer Link

function HeroSection() {
  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h1 className="display-4 fw-bold">Bienvenue chez FastMarket</h1>
        <p className="lead text-muted">
          Découvrez nos meilleures offres sur vos produits préférés !
        </p>

        {/* ✅ redirection vers la bonne route React */}
        <Link to="/choix-magasin" className="btn btn-warning btn-lg mt-3">
          Modifier magasin
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
