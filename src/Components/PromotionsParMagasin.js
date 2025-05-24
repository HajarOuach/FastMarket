import React from 'react';

const PromotionsParMagasin = ({ magasinId }) => {
  const promosParMagasin = {
    1: [
      {
        title: "Articles en promotions",
        description: "Réductions jusqu'à 30%",
        image: "/images/banner-1.jpg",
      },
      {
        title: "Offres combinées",
        description: "1 acheté = 2 offerts",
        image: "/images/barbec.jpeg",
      },
      {
        title: "Bonnes affaires",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/promos/mag3_promo1.jpg",
      },
    ],
    2: [
      {
        title: "Articles en promotions",
        description: "20% sur les dattes et fruits secs",
        image: "/images/banner-1.jpg",
      },
      {
        title: "Offres combinées",
        description: "Réductions jusqu'à 50%",
        image: "/images/barbec.jpeg",
      },
      {
        title: "Bons de réduction",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/promos/mag3_promo1.jpg",
      },
    ],
    3: [
      {
        title: "Offres combinées",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/drink.jpeg",
      },
      {
        title: "Articles en promotions",
        description: "Réductions jusqu'à 30%",
        image: "/images/banner-1.jpg",
      },
      {
        title: "Bons de réduction",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/banner-1.jpg",
      },
    ],
    4: [
      {
        title: "Offres combinées",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/promos/mag3_promo1.jpg",
      },
      {
        title: "Articles en promotions",
        description: "Réductions jusqu'à 30%",
        image: "/images/banner-1.jpg",
      },
      {
        title: "Bons de réduction",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/promos/mag3_promo1.jpg",
      },
    ],
    5: [
      {
        title: "Offres combinées",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/promos/mag3_promo1.jpg",
      },
      {
        title: "Articles en promotions",
        description: "Réductions jusqu'à 30%",
        image: "/images/banner-1.jpg",
      },
      {
        title: "Bons de réduction",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/promos/mag3_promo1.jpg",
      },
    ],
  };

  const promos = promosParMagasin[magasinId] || [];

  if (promos.length < 3) return null;

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Grand bloc à gauche */}
        <div className="col-md-8">
          <div
            className="promo-banner rounded shadow-sm text-white d-flex flex-column justify-content-between p-4"
            style={{
              backgroundImage: `url(${promos[0].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '320px',
              borderRadius: '20px',
            }}
          >
            <div>
              <h3 className="fw-bold">{promos[0].title}</h3>
              <p>{promos[0].description}</p>
            </div>
            <button className="btn btn-outline-light rounded-pill mt-3 align-self-start">
              Acheter maintenant
            </button>
          </div>
        </div>

        {/* Deux petits blocs empilés à droite */}
        <div className="col-md-4 d-flex flex-column gap-4">
          {[promos[1], promos[2]].map((promo, idx) => (
            <div
              key={idx}
              className="promo-banner rounded shadow-sm text-white d-flex flex-column justify-content-between p-3"
              style={{
                backgroundImage: `url(${promo.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '150px',
                borderRadius: '20px',
              }}
            >
              <div>
                <h5 className="fw-bold">{promo.title}</h5>
                <p className="mb-2">{promo.description}</p>
              </div>
              <button className="btn btn-outline-light btn-sm rounded-pill align-self-start">
                Acheter maintenant
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionsParMagasin;
