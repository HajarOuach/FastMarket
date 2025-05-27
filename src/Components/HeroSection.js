import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection({ nomMagasin, role, nomGerant }) {
  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h1 className="display-4 fw-bold">
          Bienvenue chez {nomMagasin ? nomMagasin : "FastMarket"}
        </h1>

        <p className="lead text-muted">
          {role === "gerant"
            ? `Gérez votre magasin, ${nomGerant}`
            : "Découvrez nos meilleures offres sur vos produits préférés !"}
        </p>

        {role !== "gerant" && (
          <Link to="/choix-magasin" className="btn btn-warning btn-lg mt-3">
            Modifier magasin
          </Link>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
