import React from 'react';

function BestSellers() {
  return (
    <div className="container my-5" id="best-sellers">
      <div className="row g-4">
        {/* bloc principal à gauche */}
        <div className="col-md-8">
          <div
            className="d-flex align-items-center rounded-4 shadow overflow-hidden"
            style={{
              background: 'url("/images/banner-ad-1.jpg") center/cover no-repeat',
              minHeight: '350px',
              padding: '2rem',
              color: 'white'
            }}
          >
            <div>
              <h3 className="fw-bold">Articles en promotions</h3>
              <p className="mb-3">Réductions jusqu'à 30%</p>
              <a href="#" className="btn btn-outline-light btn-sm">Acheter maintenant</a>
            </div>
          </div>
        </div>

        {/* Deux petits blocs à droite */}
        <div className="col-md-4 d-flex flex-column gap-4">
          {/* Bloc 1 */}
          <div
            className="d-flex align-items-center rounded-4 shadow overflow-hidden"
            style={{
              background: 'url("/images/banner-ad-2.jpg") center/cover no-repeat',
              minHeight: '160px',
              padding: '1.5rem',
              color: 'white'
            }}
          >
            <div>
              <h5 className="fw-bold">Offres combinées</h5>
              <p className="mb-2">Réductions jusqu'à 50%</p>
              <a href="#" className="btn btn-outline-light btn-sm">Acheter maintenant</a>
            </div>
          </div>

          {/* Bloc 2 */}
          <div
            className="d-flex align-items-center rounded-4 shadow overflow-hidden"
            style={{
              background: 'url("/images/banner-ad-3.jpg") center/cover no-repeat',
              minHeight: '160px',
              padding: '1.5rem',
              color: 'white'
            }}
          >
            <div>
              <h5 className="fw-bold">Bons de réduction</h5>
              <p className="mb-2">Réductions jusqu'à 40%</p>
              <a href="#" className="btn btn-outline-light btn-sm">Acheter maintenant</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
