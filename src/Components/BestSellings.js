import React from 'react';

function BestSellings() {
  return (
    <section className="pb-5">
      <div className="container-lg">
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-between align-items-center flex-wrap">
            <h2 className="fw-bold fs-3 mb-2 mb-md-0">Produits les plus vendus</h2>
            <a href="#" className="btn btn-warning text-dark fw-semibold rounded-2 px-3 py-2">
              Voir tout
            </a>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
          {[1, 2, 3, 4, 5, 6, 7].map((id) => (
            <div className="col" key={id}>
              <div className="card h-100 border-0 shadow-sm rounded-3">
                <a href="#" className="d-block p-3 pb-0">
                  <img
                    src={`images/product-thumb-${id}.png`}
                    alt={`Product ${id}`}
                    className="img-fluid rounded-3"
                    style={{ height: '160px', objectFit: 'contain' }}
                  />
                </a>
                <div className="card-body text-center pt-2">
                  <h5 className="fs-6 fw-bold mb-1">Nom du produit {id}</h5>
                  <div className="mb-2">
                    <span className="rating me-1">
                      {[...Array(4)].map((_, i) => (
                        <svg key={i} width="16" height="16" className="text-warning">
                          <use xlinkHref="#star-full" />
                        </svg>
                      ))}
                      <svg width="16" height="16" className="text-warning">
                        <use xlinkHref="#star-half" />
                      </svg>
                    </span>
                    <small className="text-muted">(222)</small>
                  </div>
                  <div className="mb-2">
                    <del className="text-muted me-1">$24.00</del>
                    <span className="fw-bold text-dark">$18.00</span>
                    <span className="badge bg-light text-dark border ms-2">10% OFF</span>
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
                    <input
                      type="number"
                      name="quantity"
                      className="form-control form-control-sm w-25 text-center"
                      defaultValue={1}
                      min={1}
                    />
                    <button className="btn btn-sm btn-warning text-dark fw-bold">
                      <svg width="16" height="16" className="me-1">
                        <use xlinkHref="#cart" />
                      </svg>
                      Ajouter
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <svg width="16" height="16">
                        <use xlinkHref="#heart" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellings;
