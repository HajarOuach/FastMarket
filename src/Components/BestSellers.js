
import React from 'react';


function BestSellers() {
  return (
    <div className="container my-5" id="best-sellers">
      <div className="row gx-3 gy-3">
        {/* Grand bloc à gauche (8 cols) */}
        <div className="col-md-8">
          <div
            className="banner-ad d-flex align-items-center p-5 text-white"
            style={{
              background: 'url("/images/banner-ad-1.jpg") no-repeat center center',
              backgroundSize: 'cover',
              minHeight: '350px'
            }}
          >
            <div>
  <h3 className="banner-title">Articles en PROMOTION</h3>
  <p>Réductions jusqu'à 30%</p>
  <a href="#" className="btn btn-outline-light">Acheter maintenant</a>
</div>
</div>
</div>

{/* Colonne de droite (4 cols) */}
<div className="col-md-4 d-flex flex-column gap-3">
  <div
    className="banner-ad d-flex align-items-center p-4 text-white"
    style={{
      background: 'url("/images/banner-ad-2.jpg") no-repeat center center',
      backgroundSize: 'cover',
      flex: 1,
      minHeight: '165px'
    }}
  >
    <div>
      <h4 className="banner-title">Offres combinées</h4>
      <p>Réductions jusqu'à 50%</p>
      <a href="#" className="btn btn-outline-light btn-sm">Acheter maintenant</a>
    </div>
  </div>
  <div
    className="banner-ad d-flex align-items-center p-4 text-white"
    style={{
      background: 'url("/images/banner-ad-3.jpg") no-repeat center center',
      backgroundSize: 'cover',
      flex: 1,
      minHeight: '165px'
    }}
  >
    <div>
      <h4 className="banner-title">Bons de réduction</h4>
      <p>Réductions jusqu'à 40%</p>
      <a href="#" className="btn btn-outline-light btn-sm">Acheter maintenant</a>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default BestSellers;
