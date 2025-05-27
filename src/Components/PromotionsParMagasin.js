import React from 'react';
 
const PromotionsParMagasin = ({ magasinId }) => {
  const promosParMagasin = {
    1: [
      {
        title: "Articles en promotions",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/bois.jpg",
      },
      {
        title: "Offres combinées",
        description: "1 acheté = 2 offerts",
        image: "/images/cereales.jpg",
      },
      {
        title: "Bonnes affaires",
        description: "Réductions jusqu'à 30%",
        image: "/images/dessert.jpg",
      },
    ],
    2: [
      {
        title: "Articles en promotions",
        description: "10% sur les viandes",
        image: "/images/viande.jpg",
      },
      {
        title: "Offres combinées",
        description: "2 acheté = 1 offert",
        image: "/images/snacks.jpg",
      },
      {
        title: "Bons de réduction",
        description: "Jusqu'à -40% ",
        image: "/images/cady.jpg",
      },
    ],
    3: [
       {
        title: "Articles en promotions",
        description: "Réductions jusqu'à 30%",
        image: "/images/barbec.jpeg",
      },
      {
        title: "Offres combinées",
        description: "2 acheté = 1 offert",
        image: "/images/banner-1.jpg",
      },
     
      {
        title: "Bons de réduction",
        description: "Jusqu'à -50% sur les produits d'hygiène",
        image: "/images/hyg.jpeg",
      }
    ],
    4: [
      {
        title: "Articles en promotions",
        description: "Réductions jusqu'à 30%",
        image: "/images/lait.jpg",
      },
      {
        title: "Offres combinées",
        description:  "2 acheté = 1 offert",
        image: "/images/promo_glace.jpg",
      },
      
      {
        title: "Bons de réduction",
        description: "Jusqu'à -40% sur les produits ménagers",
        image: "/images/menage.jpg",
      },
    ],
    5: [
      {
        title: "Offres combinées",
        description: "Jusqu'à -40% sur les boissons",
        image: "/images/fr1.jpg",
      },
      {
        title: "Articles en promotions",
        description: "Réductions jusqu'à 30%",
        image: "/images/Cereals.jpeg",
      },
      {
        title: "Bons de réduction",
        description: "Jusqu'à -40% sur les fruits et légumes",
        image: "/images/LG.jpg",
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
