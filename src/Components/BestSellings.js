import React from 'react';

function BestSellings() {
  return (
    <section className="pb-5">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between my-4">
              <h2 className="section-title">Produits les plus vendus</h2>
              <div className="d-flex align-items-center">
                <a href="#" className="btn btn-primary rounded-1">Voir tout</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">

              {[1,2,3,4,5,6,7].map((id) => (
                <div className="col" key={id}>
                  <div className="product-item">
                    <figure>
                      <a href="#" title="Product Title">
                        <img src={`images/product-thumb-${id}.png`} alt="Product Thumbnail" className="tab-image" />
                      </a>
                    </figure>
                    <div className="d-flex flex-column text-center">
                      <h3 className="fs-6 fw-normal">Nom du produit {id}</h3>
                      <div>
                        <span className="rating">
                          {[...Array(4)].map((_, i) => (
                            <svg key={i} width="18" height="18" className="text-warning">
                              <use xlinkHref="#star-full"></use>
                            </svg>
                          ))}
                          <svg width="18" height="18" className="text-warning">
                            <use xlinkHref="#star-half"></use>
                          </svg>
                        </span>
                        <span>(222)</span>
                      </div>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <del>$24.00</del>
                        <span className="text-dark fw-semibold">$18.00</span>
                        <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                          10% OFF
                        </span>
                      </div>
                      <div className="button-area p-3 pt-0">
                        <div className="row g-1 mt-2">
                          <div className="col-3">
                            <input
                              type="number"
                              name="quantity"
                              className="form-control border-dark-subtle input-number quantity"
                              defaultValue={1}
                            />
                          </div>
                          <div className="col-7">
                            <a href="#" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                              <svg width="18" height="18">
                                <use xlinkHref="#cart"></use>
                              </svg>{' '}
                              Ajouter au panier
                            </a>
                          </div>
                          <div className="col-2">
                            <a href="#" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                              <svg width="18" height="18">
                                <use xlinkHref="#heart"></use>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestSellings;