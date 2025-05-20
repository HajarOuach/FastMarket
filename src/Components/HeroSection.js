import React from 'react';

function HeroSection() {
  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h1 className="display-4 fw-bold">Bienvenue chez FastMarket</h1>
        <p className="lead text-muted">Découvrez nos meilleures offres sur vos produits préférés !</p>
        <a href="#best-sellers" className="btn btn-warning btn-lg mt-3">Voir les Promotions</a>
      </div>
    </section>
  );
}

export default HeroSection;
