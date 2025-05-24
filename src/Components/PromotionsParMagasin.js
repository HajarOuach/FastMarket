import React from 'react';


const PromotionsParMagasin = ({ magasinId }) => {
  const promosParMagasin = {
    1: [
      {
        title: "Articles en promotions",
        description: "Réductions jusqu'à 30%",
        image: "/images/images/banner-1.jpg",
      },
      {
        title: "Offres combinées",
        description: "Réductions jusqu'à 50%",
        image: "/images/images/banner-1.jpg",
      },
    ],
    2: [
      {
        title: "Spécial Ramadan",
        description: "20% sur les dattes et fruits secs",
        image: "/images//images/banner-1.jpg",
      },
    ],
    3: [
      {
        title: "Bonnes affaires",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/promos/mag3_promo1.jpg",
      },
    ],
    4: [],
    5: [],
  };

  const promos = promosParMagasin[magasinId] || [];

  return (
    <div className="container my-5">
      <div className="row g-4">
        {promos.map((promo, idx) => (
          <div className={`col-md-${idx === 0 ? "8" : "4"}`} key={idx}>
            <div
              className="promo-banner rounded shadow-sm text-white d-flex flex-column justify-content-between p-4"
              style={{
                backgroundImage: `url(${promo.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: idx === 0 ? '320px' : '150px',
                borderRadius: '20px',
              }}
            >
              <div>
                <h3 className="fw-bold">{promo.title}</h3>
                <p>{promo.description}</p>
              </div>
              <button className="btn btn-outline-light rounded-pill mt-3 align-self-start">
                Acheter maintenant
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsParMagasin;
